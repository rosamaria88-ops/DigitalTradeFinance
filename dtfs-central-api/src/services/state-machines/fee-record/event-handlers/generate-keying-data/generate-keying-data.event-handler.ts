import { EntityManager } from 'typeorm';
import Big from 'big.js';
import { DbRequestSource, FeeRecordEntity } from '@ukef/dtfs2-common';
import { BaseFeeRecordEvent } from '../../event/base-fee-record.event';

type GenerateKeyingDataEventPayload = {
  transactionEntityManager: EntityManager;
  isFinalFeeRecordForFacility: boolean;
  requestSource: DbRequestSource;
};

export type FeeRecordGenerateKeyingDataEvent = BaseFeeRecordEvent<'GENERATE_KEYING_DATA', GenerateKeyingDataEventPayload>;

export const handleFeeRecordGenerateKeyingDataEvent = async (
  feeRecord: FeeRecordEntity,
  { transactionEntityManager, isFinalFeeRecordForFacility, requestSource }: GenerateKeyingDataEventPayload,
): Promise<FeeRecordEntity> => {
  if (!isFinalFeeRecordForFacility) {
    feeRecord.updateWithStatus({ status: 'READY_TO_KEY', requestSource });
    return await transactionEntityManager.save(FeeRecordEntity, feeRecord);
  }

  const principalBalanceAdjustment = new Big(feeRecord.facilityUtilisation).sub(feeRecord.facilityUtilisationData.utilisation).toNumber();
  feeRecord.updateWithKeyingData({
    fixedFeeAdjustment: 10,
    premiumAccrualBalanceAdjustment: 10,
    principalBalanceAdjustment,
    requestSource,
  });
  return await transactionEntityManager.save(FeeRecordEntity, feeRecord);
};
