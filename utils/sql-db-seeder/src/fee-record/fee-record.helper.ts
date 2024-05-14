import { Currency, FeeRecordEntity } from '@ukef/dtfs2-common';

type CreateFeeRecordOptions = {
  facilityId: string;
  exporter: string;
  baseCurrency: Currency;
  facilityUtilisation: number;
  totalFeesAccruedForThePeriod: number;
  feesPaidToUkefForThePeriod: number;
  feesPaidToUkefForThePeriodCurrency?: Currency;
} & (
  | {
      totalFeesAccruedForThePeriodCurrency: Currency;
      totalFeesAccruedForThePeriodExchangeRate: number;
    }
  | {
      totalFeesAccruedForThePeriodCurrency?: undefined;
      totalFeesAccruedForThePeriodExchangeRate?: undefined;
    }
) &
  (
    | {
        paymentCurrency: Currency;
        paymentExchangeRate: number;
      }
    | {
        paymentCurrency?: undefined;
        paymentExchangeRate?: undefined;
      }
  );

export const createFeeRecord = ({
  facilityId,
  exporter,
  baseCurrency,
  facilityUtilisation,
  totalFeesAccruedForThePeriod,
  totalFeesAccruedForThePeriodCurrency,
  totalFeesAccruedForThePeriodExchangeRate,
  feesPaidToUkefForThePeriod,
  feesPaidToUkefForThePeriodCurrency,
  paymentCurrency,
  paymentExchangeRate,
}: CreateFeeRecordOptions): FeeRecordEntity => {
  const feeRecord = new FeeRecordEntity();

  feeRecord.facilityId = facilityId;
  feeRecord.exporter = exporter;
  feeRecord.baseCurrency = baseCurrency;
  feeRecord.facilityUtilisation = facilityUtilisation;

  feeRecord.totalFeesAccruedForThePeriod = totalFeesAccruedForThePeriod;
  feeRecord.totalFeesAccruedForThePeriodCurrency = totalFeesAccruedForThePeriodCurrency ?? baseCurrency;
  feeRecord.totalFeesAccruedForThePeriodExchangeRate = totalFeesAccruedForThePeriodCurrency ? totalFeesAccruedForThePeriodExchangeRate : 1;

  feeRecord.feesPaidToUkefForThePeriod = feesPaidToUkefForThePeriod;
  feeRecord.feesPaidToUkefForThePeriodCurrency = feesPaidToUkefForThePeriodCurrency ?? baseCurrency;

  feeRecord.paymentCurrency = paymentCurrency ?? feeRecord.feesPaidToUkefForThePeriodCurrency;
  feeRecord.paymentExchangeRate = paymentCurrency ? paymentExchangeRate : 1;

  feeRecord.status = 'TO_DO';

  feeRecord.updateLastUpdatedBy({ platform: 'SYSTEM' });

  return feeRecord;
};
