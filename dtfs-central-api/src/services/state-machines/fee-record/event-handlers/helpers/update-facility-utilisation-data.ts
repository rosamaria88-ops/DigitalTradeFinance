import { EntityManager } from 'typeorm';
import { DbRequestSource, FacilityUtilisationDataEntity, ReportPeriod } from '@ukef/dtfs2-common';

type UpdateFacilityUtilisationDataUpdate = {
  entityManager: EntityManager;
  reportPeriod: ReportPeriod;
  ukefShareOfUtilisation: number;
  requestSource: DbRequestSource;
  fixedFee: number;
};

/**
 * Updates a facility utilisation data entity with the supplied update values and
 * calculates the new fixed fee using the updated values
 * @param facilityUtilisationDataEntity - The facility utilisation data entity to update
 * @param update - The values to update the entity with
 * @param update.reportPeriod - The report period to update with
 * @param update.utilisation - The utilisation as reported by the bank
 * @param update.ukefShareOfUtilisation - UKEF's share of the utilisation as reported by the bank
 * @param update.requestSource - The request source supplying the update
 * @param update.entityManager - The entity manager
 * @param update.fixedFee - value for the calculated fixed fee
 * @returns The updated entity
 */
export const updateFacilityUtilisationData = async (
  facilityUtilisationDataEntity: FacilityUtilisationDataEntity,
  { reportPeriod, requestSource, entityManager, ukefShareOfUtilisation, fixedFee }: UpdateFacilityUtilisationDataUpdate,
): Promise<FacilityUtilisationDataEntity> => {
  facilityUtilisationDataEntity.updateWithCurrentReportPeriodDetails({
    fixedFee,
    utilisation: ukefShareOfUtilisation,
    reportPeriod,
    requestSource,
  });
  return await entityManager.save(FacilityUtilisationDataEntity, facilityUtilisationDataEntity);
};
