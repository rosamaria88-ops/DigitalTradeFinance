import { ObjectId } from 'mongodb';
import { Facility, TfmFacility } from '@ukef/dtfs2-common';
import { getLatestFacilityEndDateValues } from './getLatestFacilityEndDateValues.ts';
import { MOCK_FACILITY_SNAPSHOT } from '../../../__mocks__/mock-facility-snapshot.ts';
import { MOCK_AMENDMENT } from '../../../__mocks__/mock-amendment.ts';

describe('getLatestFacilityEndDateValues', () => {
  const facility: TfmFacility = {
    _id: new ObjectId('1234567890abcdef12345678'),
    facilitySnapshot: MOCK_FACILITY_SNAPSHOT,
  };

  const mockFacilityEndDate = new Date('2024-04-04');
  const mockBankReviewDate = new Date('2025-05-05');

  const facilitySnapshotWithFacilityEndDate: Facility = {
    ...MOCK_FACILITY_SNAPSHOT,
    isUsingFacilityEndDate: true,
    facilityEndDate: mockFacilityEndDate,
    bankReviewDate: undefined,
  };

  describe('When `FF_TFM_FACILITY_END_DATE_ENABLED` is set to true', () => {
    describe('when there are amendments', () => {
      it('should return the the latest amendment value when the FED has been amended', () => {
        // Arrange
        const facilityWithAmendments: TfmFacility = {
          ...facility,
          facilitySnapshot: facilitySnapshotWithFacilityEndDate,
          amendments: [
            { ...MOCK_AMENDMENT, updatedAt: 1723653111, version: 1, tfm: { bankReviewDate: mockBankReviewDate, isUsingFacilityEndDate: false } },
            { ...MOCK_AMENDMENT, updatedAt: 1723653222, version: 2 },
          ],
        };

        // Act
        const result = getLatestFacilityEndDateValues(facilityWithAmendments);

        // Assert
        expect(result).toEqual({ isUsingFacilityEndDate: false, bankReviewDate: mockBankReviewDate });
      });
    });
  });
});