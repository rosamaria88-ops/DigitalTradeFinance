const mapFacility = require('./mapFacility');
const { formattedNumber } = require('../../../../utils/number');
const mapFacilityStage = require('./mapFacilityStage');
const mapCoverEndDate = require('./mapCoverEndDate');

describe('mapFacility', () => {
  const mockCoverEndDate = {
    'coverEndDate-day': '01',
    'coverEndDate-month': '02',
    'coverEndDate-year': '2021',
  };

  const mockUkefExposure = '1,234.00';
  const mockCoveredPercentage = '10';

  const mockCurrency = {
    text: 'GBP - UK Sterling',
    id: 'GBP',
  };

  const mockFacilityValue = '12345.00';

  const mockFacility = {
    _id: '12345678',
    ukefFacilityID: '0040004833',
    facilityType: 'bond',
    ...mockCoverEndDate,
    ukefExposure: mockUkefExposure,
    coveredPercentage: mockCoveredPercentage,
    bondType: 'Performance Bond',
    currency: mockCurrency,
    facilityValue: mockFacilityValue,
    facilityStage: 'Unissued',

    // fields we do not consume
    bondIssuer: 'Issuer',
    ukefGuaranteeInMonths: '10',
    bondBeneficiary: 'test',
    guaranteeFeePayableByBank: '9.0000',
    currencySameAsSupplyContractCurrency: 'true',
    riskMarginFee: '10',
    minimumRiskMarginFee: '30',
    feeType: 'At maturity',
    dayCountBasis: '365',
  };

  it('should map and format correct fields/values', async () => {
    const result = mapFacility(mockFacility);

    const expectedUkefExposure = `${mockCurrency.id} ${mockUkefExposure}`;
    const expectedCoveredPercentage = `${mockCoveredPercentage}%`;

    const formattedFacilityValue = formattedNumber(mockFacilityValue);

    const expectedFacilityValue = `${mockCurrency.id} ${formattedFacilityValue}`;

    const expectedFacilityValueExportCurrency = `${mockCurrency.id} ${formattedFacilityValue}`;

    const expected = {
      _id: mockFacility._id, // eslint-disable-line no-underscore-dangle
      ukefFacilityID: mockFacility.ukefFacilityID,
      facilityProduct: 'BSS',
      facilityType: mockFacility.bondType,
      facilityStage: mapFacilityStage(mockFacility.facilityStage),
      coverEndDate: mapCoverEndDate({ ...mockCoverEndDate }),
      ukefExposure: expectedUkefExposure,
      coveredPercentage: expectedCoveredPercentage,
      facilityValue: expectedFacilityValue,
      facilityValueExportCurrency: expectedFacilityValueExportCurrency,
    };

    expect(result).toEqual(expected);
  });

  describe('when facility.currency is NOT GBP', () => {
    it('should return facilityValue as empty string', () => {
      const result = mapFacility({
        ...mockFacility,
        currency: {
          text: 'USD - US Dollars',
          id: 'USD',
        },
      });

      expect(result.facilityValue).toEqual('');
    });
  });
});