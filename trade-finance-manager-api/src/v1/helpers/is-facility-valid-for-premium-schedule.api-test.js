const isFacilityValidForPremiumSchedule = require('./is-facility-valid-for-premium-schedule');
const CONSTANTS = require('../../constants');

const facility = {
  facilityType: CONSTANTS.FACILITIES.FACILITY_TYPE.LOAN,
  feeType: 'At maturity',
  ukefFacilityID: '0001',
  guaranteeFeePayableByBank: '10',
  coverPercentage: '80',
  dayCountBasis: '2',
  ukefExposure: '60',
};

const exposurePeriod = 2;
const facilityGuaranteeDates = {
  guaranteeCommencementDate: '2021-01-01',
  guaranteeExpiryDate: '2023-02-03',
};

describe('is valid for premium schedule?', () => {
  describe('facility is valid for premium schedule', () => {
    it('should return true for valid facility', () => {
      const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
        facility, exposurePeriod, facilityGuaranteeDates,
      );
      expect(isValidForPremiumSchedule).toEqual(true);
    });
  });

  describe('invalid facility', () => {
    describe('facility exposure period', () => {
      it('should be invalid if no exposure period', () => {
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule({}, '', '');
        expect(isValidForPremiumSchedule).toEqual(false);
      });

      it('should be invalid if exposure period < 1', () => {
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule({}, 0.5, '');
        expect(isValidForPremiumSchedule).toEqual(false);
      });
    });

    describe('feeType', () => {
      it('should be invalid if no feeType', () => {
        const invalidFacility = {
          ...facility,
          feeType: '',
        };
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
          invalidFacility, exposurePeriod, facilityGuaranteeDates,
        );
        expect(isValidForPremiumSchedule).toEqual(false);
      });
    });

    describe('ukefFacilityID', () => {
      it('should be invalid if no ukefFacilityID', () => {
        const invalidFacility = {
          ...facility,
          ukefFacilityID: '',
        };
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
          invalidFacility, exposurePeriod, facilityGuaranteeDates,
        );
        expect(isValidForPremiumSchedule).toEqual(false);
      });
    });

    describe('facility guarantee dates', () => {
      it('should be invalid if no guarantee commencement date', () => {
        const invalidFacilityGuaranteeDates = {
          ...facilityGuaranteeDates,
          guaranteeCommencementDate: '',
        };
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
          facility, exposurePeriod, invalidFacilityGuaranteeDates,
        );
        expect(isValidForPremiumSchedule).toEqual(false);
      });

      it('should be invalid if no guarantee expiry date', () => {
        const invalidFacilityGuaranteeDates = {
          ...facilityGuaranteeDates,
          guaranteeExpiryDate: '',
        };
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
          facility, exposurePeriod, invalidFacilityGuaranteeDates,
        );
        expect(isValidForPremiumSchedule).toEqual(false);
      });
    });

    describe('guaranteeFee', () => {
      it('should be invalid if no guaranteeFee', () => {
        const invalidFacility = {
          ...facility,
          guaranteeFee: '',
        };
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
          invalidFacility, exposurePeriod, facilityGuaranteeDates,
        );
        expect(isValidForPremiumSchedule).toEqual(false);
      });
    });

    describe('coverPercentage', () => {
      it('should be invalid if no coverPercentage', () => {
        const invalidFacility = {
          ...facility,
          coverPercentage: '',
        };
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
          invalidFacility, exposurePeriod, facilityGuaranteeDates,
        );
        expect(isValidForPremiumSchedule).toEqual(false);
      });
    });

    describe('dayCountBasis', () => {
      it('should be invalid if no dayCountBasis', () => {
        const invalidFacility = {
          ...facility,
          dayCountBasis: '',
        };
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
          invalidFacility, exposurePeriod, facilityGuaranteeDates,
        );
        expect(isValidForPremiumSchedule).toEqual(false);
      });
    });

    describe('ukefExposure', () => {
      it('should be invalid if no ukefExposure', () => {
        const invalidFacility = {
          ...facility,
          ukefExposure: '',
        };
        const isValidForPremiumSchedule = isFacilityValidForPremiumSchedule(
          invalidFacility, exposurePeriod, facilityGuaranteeDates,
        );
        expect(isValidForPremiumSchedule).toEqual(false);
      });
    });
  });
});
