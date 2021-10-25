const mapGefDealSnapshot = require('./mapGefDealSnapshot');
const mapGefDealDetails = require('./mapGefDealDetails');
const mapGefFacilities = require('../gef-facilities/mapGefFacilities');
const mapTotals = require('../deal/mapTotals');
const mapGefSubmissionDetails = require('./mapGefSubmissionDetails');
const MOCK_GEF_DEAL = require('../../../../v1/__mocks__/mock-gef-deal');
const MOCK_CASH_CONTINGENT_FACILIIES = require('../../../../v1/__mocks__/mock-cash-contingent-facilities');

describe('mapGefDealSnapshot', () => {
  const mockFacilities = [
    {
      facilitySnapshot: MOCK_CASH_CONTINGENT_FACILIIES[0],
      tfm: {
        facilityValueInGBP: '123,45.00',
      },
    },
  ];

  const mockDeal = {
    _id: MOCK_GEF_DEAL._id,
    dealSnapshot: {
      ...MOCK_GEF_DEAL,
      facilities: mockFacilities,
    },
    tfm: {},
  };

  it('should return mapped deal', () => {
    const result = mapGefDealSnapshot(mockDeal.dealSnapshot, mockDeal.tfm);

    const expected = {
      _id: MOCK_GEF_DEAL._id,
      dealType: MOCK_GEF_DEAL.dealType,
      isFinanceIncreasing: MOCK_GEF_DEAL.exporter.isFinanceIncreasing,
      details: mapGefDealDetails(mockDeal.dealSnapshot),
      submissionDetails: mapGefSubmissionDetails(mockDeal.dealSnapshot),
      eligibility: MOCK_GEF_DEAL.eligibility,
      dealFiles: {},
      facilities: mapGefFacilities(mockDeal.dealSnapshot, mockDeal.tfm),
      totals: mapTotals(mockDeal.dealSnapshot.facilities),
    };

    expect(result).toEqual(expected);
  });
});
