import dotenv from 'dotenv';
import { asString, FileshareConfig } from '@ukef/dtfs2-common';

dotenv.config();

const { AZURE_UTILISATION_REPORTS_FILESHARE_NAME, AZURE_PORTAL_STORAGE_ACCOUNT, AZURE_PORTAL_STORAGE_ACCESS_KEY } = process.env;

export const AZURE_UTILISATION_REPORTS_FILESHARE_CONFIG: FileshareConfig = {
  FILESHARE_NAME: asString(AZURE_UTILISATION_REPORTS_FILESHARE_NAME, 'AZURE_UTILISATION_REPORTS_FILESHARE_NAME'),
  STORAGE_ACCOUNT: asString(AZURE_PORTAL_STORAGE_ACCOUNT, 'AZURE_PORTAL_STORAGE_ACCOUNT'),
  STORAGE_ACCESS_KEY: asString(AZURE_PORTAL_STORAGE_ACCESS_KEY, 'AZURE_PORTAL_STORAGE_ACCESS_KEY'),
};
