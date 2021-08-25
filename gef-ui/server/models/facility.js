import {
  getFacility,
  getApplication,
} from '../services/api';
import { FACILITY_TYPE } from '../../constants';

export default class Facility {
  static async find(applicationId, facilityId, status, user) {
    try {
      const { details } = await getFacility(facilityId);
      const { bankId } = await getApplication(applicationId);
      if (bankId !== user.bank.id) {
        return null;
      }
      const facilityTypeConst = FACILITY_TYPE[details.type];
      const facilityTypeString = facilityTypeConst ? facilityTypeConst.toLowerCase() : '';

      const value = JSON.stringify(details.value);
      const coverPercentage = JSON.stringify(details.coverPercentage);
      const interestPercentage = JSON.stringify(details.interestPercentage);

      // const { value, coverPercentage, interestPercentage } = details;

      return {
        currency: details.currency,
        value,
        facilityType: facilityTypeConst,
        coverPercentage: coverPercentage !== 'null' ? coverPercentage : null,
        interestPercentage: interestPercentage !== 'null' ? interestPercentage : null,
        facilityTypeString,
        applicationId,
        facilityId,
        status,
        frequency: details.frequency,
        dayCountBasis: details.dayCountBasis,
        feeType: details.feeType,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      throw err;
    }
  }
}
