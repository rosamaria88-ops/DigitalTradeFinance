import { ObjectId } from 'mongodb';

/**
 * The `auditRecord` property on all documents stored in mongodb
 */
export type AuditDatabaseRecord = {
  lastUpdatedAt: Date;
  lastUpdatedByPortalUserId: ObjectId | null;
  lastUpdatedByTfmUserId: ObjectId | null;
  lastUpdatedByIsSystem: boolean | null;
  noUserLoggedIn: boolean | null;
};