import { ReportPeriod } from '../../types';
import { DbRequestSource } from '../helpers';

export type CreateFacilityUtilisationDataWithoutUtilisationParams = {
  id: string;
  reportPeriod: ReportPeriod;
  requestSource: DbRequestSource;
};

export type UpdateWithCurrentReportPeriodDetailsParams = {
  fixedFee: number;
  utilisation: number;
  reportPeriod: ReportPeriod;
  requestSource: DbRequestSource;
};
