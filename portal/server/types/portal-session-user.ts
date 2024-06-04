import { Role } from '@ukef/dtfs2-common';
import { Bank } from './bank';

/**
 * This type is based on the return of `sanitizeUser` in
 * `portal-api`
 */
export type PortalSessionUser = {
  _id: string;
  username: string;
  firstname: string;
  surname: string;
  email: string;
  roles: Role[];
  bank: Bank;
  timezone: string;
  'user-status': string;
  isTrusted: boolean;
};
