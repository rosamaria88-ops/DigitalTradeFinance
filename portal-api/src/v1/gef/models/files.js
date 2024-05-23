const { ObjectId } = require('mongodb');
const filesize = require('filesize');

class File {
  constructor(file, parentId, auditRecord) {
    this.parentId = ObjectId(String(parentId));
    this.filename = file.originalname;
    this.mimetype = file.mimetype;
    this.encoding = file.encoding;
    this.size = filesize(file.size, { round: 0 });
    this.documentPath = file.documentPath;
    this.auditRecord = auditRecord;
  }
}

module.exports = File;
