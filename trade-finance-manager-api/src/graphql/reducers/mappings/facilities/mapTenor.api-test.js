const api = require('../../../../v1/api');
const mapTenor = require('./mapTenor');
const { FACILITY_TYPE } = require('../../../../constants/facilities');

describe('mapTenor()', () => {
  const coverEndDateUnix = 1658403289;

  const mockCoverEndDate = {
    'coverEndDate-day': '01',
    'coverEndDate-month': '06',
    'coverEndDate-year': '2022',
  };

  const mockCoverStartDate = {
    'requestedCoverStartDate-year': '2022',
    'requestedCoverStartDate-month': '5',
    'requestedCoverStartDate-day': '1',
  };

  const mockFacility = {
    facilitySnapshot: {
      _id: '1',
      facilityStage: '',
      monthsOfCover: 12,
      requestedCoverStartDate: '2021-12-08T00:00:00.000Z',
      ...mockCoverEndDate,
      ...mockCoverStartDate,
      ukefFacilityType: FACILITY_TYPE.BOND,
    },
    tfm: {
      exposurePeriodInMonths: 12,
    },
  };

  const mockAmendmentDateResponse = {
    coverEndDate: coverEndDateUnix,
    amendmentId: '1234',
  };

  it('should return tenor from facility when no amendment exists', async () => {
    api.getLatestCompletedDateAmendment = () => Promise.resolve({});

    const result = await mapTenor(mockFacility.facilitySnapshot, mockFacility.tfm);

    const expected = `${mockFacility.tfm.exposurePeriodInMonths} months`;

    expect(result).toEqual(expected);
  });

  it('should return tenor from facility when no completed amendment exists', async () => {
    api.getLatestCompletedDateAmendment = () => Promise.resolve({});

    const result = await mapTenor(mockFacility.facilitySnapshot, mockFacility.tfm);

    const expected = `${mockFacility.tfm.exposurePeriodInMonths} months`;

    expect(result).toEqual(expected);
  });

  it('should return tenor from amendment when completed amendment exists', async () => {
    api.getLatestCompletedDateAmendment = () => Promise.resolve(mockAmendmentDateResponse);
    api.getFacilityExposurePeriod = () => Promise.resolve({ exposurePeriodInMonths: 2 });

    const result = await mapTenor(mockFacility.facilitySnapshot, mockFacility.tfm);

    const expected = '2 months';

    expect(result).toEqual(expected);
  });
});
