const dotenv = require('dotenv');

dotenv.config();
const AZURE_WORKFLOW_FILESHARE_CONFIG = {
  FILESHARE_NAME: process.env.AZURE_WORKFLOW_FILESHARE_NAME,
  EXPORT_FOLDER: process.env.AZURE_WORKFLOW_EXPORT_FOLDER,
  IMPORT_FOLDER: process.env.AZURE_WORKFLOW_IMPORT_FOLDER,
  STORAGE_ACCOUNT: process.env.AZURE_WORKFLOW_STORAGE_ACCOUNT,
  STORAGE_ACCESS_KEY: process.env.AZURE_WORKFLOW_STORAGE_ACCESS_KEY,
};

const AZURE_PORTAL_FILESHARE_CONFIG = {
  FILESHARE_NAME: process.env.AZURE_PORTAL_FILESHARE_NAME,
  EXPORT_FOLDER: process.env.AZURE_PORTAL_EXPORT_FOLDER,
  STORAGE_ACCOUNT: process.env.AZURE_PORTAL_STORAGE_ACCOUNT,
  STORAGE_ACCESS_KEY: process.env.AZURE_PORTAL_STORAGE_ACCESS_KEY,
};

const AZURE_UTILISATION_REPORTS_FILESHARE_CONFIG = {
  FILESHARE_NAME: process.env.AZURE_UTILISATION_REPORTS_FILESHARE_NAME,
  STORAGE_ACCOUNT: process.env.AZURE_PORTAL_STORAGE_ACCOUNT,
  STORAGE_ACCESS_KEY: process.env.AZURE_PORTAL_STORAGE_ACCESS_KEY,
};

module.exports = {
  AZURE_WORKFLOW_FILESHARE_CONFIG,
  AZURE_PORTAL_FILESHARE_CONFIG,
  AZURE_UTILISATION_REPORTS_FILESHARE_CONFIG,
};
