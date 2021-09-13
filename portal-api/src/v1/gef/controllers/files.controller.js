const { ObjectId } = require('mongodb');
const stream = require('stream');
const fs = require('fs');

const db = require('../../../drivers/db-client');
const utils = require('../utils.service');
const File = require('../models/files');
const { userHasAccess } = require('../utils.service');
const fileshare = require('../../../drivers/fileshare');
const { formatFilenameForSharepoint } = require('../../../utils');

const FILESHARE = 'portal';
const { EXPORT_FOLDER } = fileshare.getConfig(FILESHARE);

const DEFAULT_MAX_SIZE = 1024 * 1024 * 10;

const collectionName = 'files';
const dealCollectionName = 'gef-application';

const fileError = (file, maxFileSize) => {
  let error;

  const allowedFileRegex = /\.(gif|jpg|jpeg|png|bmp|tif|txt|pdf|doc|docx|ppt|pptx|xls|xlsx|msg|zip)$/;
  if (!file.originalname.match(allowedFileRegex)) error = 'The selected file must be a BMP, DOC, DOCX, GIF, JPEG, JPG, MSG, PDF, PNG, PPT, PPTX, TIF, TXT, XLS, XLSX or ZIP';

  if (file.size > maxFileSize) error = `${file.originalname} must be smaller than ${Math.round(maxFileSize / (1024 * 1024))}MB`;

  return error;
};

const errorFormat = (file, parentId, error) => ({
  parentId,
  filename: file.originalname,
  mimetype: file.mimetype,
  encoding: file.encoding,
  size: file.size,
  error,
});

exports.create = async (req, res) => {
  const {
    files,
    body: { parentId, maxSize },
  } = req;

  const maxFileSize = maxSize || DEFAULT_MAX_SIZE;

  // ensure a parentId exists
  if (!parentId || !ObjectId.isValid(parentId)) return res.status(400).send('Missing or invalid parentId');

  // Ensure some files have been passed
  if (!files?.length) return res.status(400).send('missing files');

  // Check deal exists
  const dealCollection = await db.getCollection(dealCollectionName);
  const deal = await dealCollection.findOne({ _id: ObjectId(String(parentId)) });
  if (!deal) return res.status(422).send('Parent deal not found');

  // Check user has rights to access this file
  if (!userHasAccess(req.user, deal, ['maker'])) return res.sendStatus(401);

  try {
    const processedFiles = await Promise.all(files.map(async (file) => {
      const error = fileError(file, maxFileSize);
      if (error) return errorFormat(file, parentId, error);

      const fileResult = await fileshare.uploadFile({
        buffer: fs.readFileSync(file.path),
        fileshare: FILESHARE,
        folder: `${EXPORT_FOLDER}/${parentId}`,
        filename: formatFilenameForSharepoint(file.originalname),
      });

      if (fileResult.error) return errorFormat(fileResult, parentId, `${file.originalname} ${fileResult.error.message}`);

      const collection = await db.getCollection(collectionName);
      const insertedFile = await collection.insertOne(new File(file, parentId));
      const fileData = await collection.findOne({
        _id: ObjectId(String(insertedFile.insertedId)),
      });

      return fileData;
    }));

    const status = processedFiles.every((file) => !!file.error) ? 200 : 201;

    return res.status(status).send(processedFiles);
  } catch (err) {
    console.error(`Error uploading file(s): ${err}`);
    return res.status(500).send(err.message);
  }
};

const getFile = async (id) => {
  const collection = await db.getCollection(collectionName);
  const file = await collection.findOne({ _id: ObjectId(String(id)) });
  let deal;

  if (file) {
    const dealCollection = await db.getCollection(dealCollectionName);
    deal = await dealCollection.findOne({ _id: ObjectId(String(file.parentId)) });
  }

  return [file, deal];
};

exports.getById = async (req, res) => {
  const [file, deal] = await getFile(req.params.id);

  // Check file exists
  if (!file) return res.status(404).send();

  // Check user has rights to access this file
  if (!userHasAccess(req.user, deal)) return res.sendStatus(401);

  return res.status(200).send(file);
};

exports.downloadFile = async (req, res) => {
  const [file, deal] = await getFile(req.params.id);

  // Check file exists
  if (!file) return res.status(404).send();

  // Check user has rights to access this file
  if (!userHasAccess(req.user, deal)) return res.sendStatus(401);

  try {
    const { filename, mimetype } = file;

    const documentLocation = {
      fileshare: FILESHARE,
      folder: `${EXPORT_FOLDER}/${deal._id}`,
      filename,
    };

    const bufferedFile = await fileshare.readFile(documentLocation);

    const readStream = new stream.PassThrough();
    readStream.end(bufferedFile);

    res.set('Content-disposition', `attachment; filename=${filename}`);
    res.set('Content-Type', mimetype);

    return readStream.pipe(res);
  } catch (err) {
    console.error(`Error downloading file: ${err}`);
    return res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const [file, deal] = await getFile(req.params.id);

    // Check file exists
    if (!file) return res.status(404).send();

    // Check user has rights to access this file
    if (!userHasAccess(req.user, deal)) return res.sendStatus(401);

    await fileshare.deleteFile(FILESHARE, `${EXPORT_FOLDER}/${deal._id}/${file.filename}`);

    const collection = await db.getCollection(collectionName);
    const response = await collection.findOneAndDelete({ _id: ObjectId(file._id) });
    return res.status(utils.mongoStatus(response)).send(response.value);
  } catch (err) {
    console.error(`Error deleting file: ${err}`);
    return res.status(500).send(err.message);
  }
};
