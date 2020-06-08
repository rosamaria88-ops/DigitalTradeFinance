const { ShareServiceClient, StorageSharedKeyCredential } = require('@azure/storage-file-share');
const stream = require('stream');

const { AZURE_WORKFLOW_FILESHARE_CONFIG } = require('../config/fileshare.config');

const fileshareName = AZURE_WORKFLOW_FILESHARE_CONFIG.FILESHARE_NAME;
const AZURE_STORAGE_ACCOUNT = AZURE_WORKFLOW_FILESHARE_CONFIG.STORAGE_ACCOUNT;
const AZURE_STORAGE_ACCESS_KEY = AZURE_WORKFLOW_FILESHARE_CONFIG.STORAGE_ACCESS_KEY;

const credential = new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY);
const serviceClient = new ShareServiceClient(
  `https://${AZURE_STORAGE_ACCOUNT}.file.core.windows.net`,
  credential,
);

const shareClient = serviceClient.getShareClient(fileshareName);
shareClient.create().catch(({ details }) => {
  if (!details) return;
  if (details.errorCode === 'ShareAlreadyExists') return;
  throw new Error(details.message);
});

const FILESHARE_URL = `${shareClient.url}/`;

const uploadStream = async ({
  folder, subfolder, filename, buffer, createMissingFolder = true,
}) => {
  const fileStream = new stream.Readable();
  fileStream.push(buffer);
  fileStream.push(null);

  const directoryClient = await shareClient.getDirectoryClient(folder);
  if (createMissingFolder) {
    await directoryClient.create().catch(({ details }) => {
      if (!details) return false;
      if (details.errorCode === 'ResourceAlreadyExists') return false;
      console.error('Fileshare create resource error', details);
      return {
        errorCount: 1,
        error: {
          errorCode: details.errorCode,
          message: details.message,
        },
      };
    });
  }


  const subDirectoryClient = await directoryClient.getDirectoryClient(subfolder);
  await subDirectoryClient.create().catch(({ details }) => {
    if (!details) return false;
    if (details.errorCode === 'ResourceAlreadyExists') return false;
    console.error('Fileshare create resource error', details);
    return {
      error: {
        errorCount: 1,
        errorCode: details.errorCode,
        message: details.message,
      },
    };
  });

  const fileClient = await subDirectoryClient.getFileClient(`${filename}`);
  await fileClient.uploadStream(fileStream, buffer.length, 4 * 1024 * 1024, 20);

  return {
    folder,
    subfolder,
    filename: fileClient.name,
    fullPath: fileClient.path,
    url: fileClient.url,
  };
};

const readFile = async ({
  folder, subfolder, filename, stringEncoding = 'utf-8',
}) => {
  const directoryClient = await shareClient.getDirectoryClient(folder);
  const subDirectoryClient = await directoryClient.getDirectoryClient(subfolder);
  const fileClient = await subDirectoryClient.getFileClient(`${filename}`);
  const bufferedFile = await fileClient.downloadToBuffer();
  return bufferedFile.toString(stringEncoding);
};

const deleteFile = async (filePath) => shareClient.deleteFile(filePath).catch(({ details }) => {
  if (!details) return;
  if (details.errorCode === 'ResourceNotFound') return;
  console.error('Fileshare delete file not found', details);
});

const deleteMultipleFiles = (fileList) => {
  if (!Array.isArray(fileList)) return false;

  return fileList.map(async (filePath) => {
    await deleteFile(filePath);
  });
};

module.exports = {
  uploadStream,
  deleteFile,
  deleteMultipleFiles,
  readFile,
  FILESHARE_URL,
};
