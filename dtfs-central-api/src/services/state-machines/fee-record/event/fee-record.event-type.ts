import { ValuesOf } from '@ukef/dtfs2-common';

export const FEE_RECORD_EVENT_TYPE = {
  PAYMENT_ADDED: 'PAYMENT_ADDED',
  PAYMENT_DELETED: 'PAYMENT_DELETED',
  PAYMENT_EDITED: 'PAYMENT_EDITED',
  GENERATE_KEYING_DATA: 'GENERATE_KEYING_DATA',
  MARK_AS_RECONCILED: 'MARK_AS_RECONCILED',
  MARK_AS_READY_TO_KEY: 'MARK_AS_READY_TO_KEY',
  REMOVE_FROM_PAYMENT_GROUP: 'REMOVE_FROM_PAYMENT_GROUP',
  OTHER_FEE_REMOVED_FROM_PAYMENT_GROUP: 'OTHER_FEE_REMOVED_FROM_PAYMENT_GROUP',
  OTHER_FEE_ADDED_TO_PAYMENT_GROUP: 'OTHER_FEE_ADDED_TO_PAYMENT_GROUP',
} as const;

export const FEE_RECORD_EVENT_TYPES = Object.values(FEE_RECORD_EVENT_TYPE);

export type FeeRecordEventType = ValuesOf<typeof FEE_RECORD_EVENT_TYPE>;
