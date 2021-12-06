import { fromUnixTime } from 'date-fns';
import { mapPortalActivities, getPortalActivities } from './index';

import api from '../../services/api';

import mocks from '../mocks';

jest.mock('../../services/api');

/*
   ensures that the mapPortalActivities returns an array
   in the correct format for mojTimeline
*/

describe('mapPortalActivities', () => {
  const gefActivity = [{
    type: 'NOTICE',
    timestamp: 1638458265,
    author: {
      firstName: 'Bob',
      lastName: 'Smith',
      _id: 12345,
    },
    text: '',
    label: 'Automatic inclusion notice submitted to UKEF',
  }];

  it('should return formatted array for mojTimeline', () => {
    const response = mapPortalActivities(gefActivity);

    // expected format
    const expected = [{
      label: { text: 'Automatic inclusion notice submitted to UKEF' },
      text: '',
      datetime: { timestamp: fromUnixTime(1638458265), type: 'datetime' },
      byline: { text: 'Bob Smith' },
    }];

    expect(response).toEqual(expected);
  });
});

/*
   tests that getPortalActivities makes the required API calls
   and that the correct template is rendered with the required fields
*/
describe('getPortalActivities()', () => {
  let mockResponse;
  let mockRequest;
  let mockApplicationResponse;
  let mockExporterResponse;
  let mockFacilityResponse;
  let mockUserResponse;
  let mockEligibilityCriteriaResponse;

  beforeEach(() => {
    mockResponse = mocks.MockResponse();
    mockRequest = mocks.MockRequestChecker();
    mockApplicationResponse = mocks.MockApplicationResponseSubmitted();
    mockExporterResponse = mocks.MockExporterResponse();
    mockFacilityResponse = mocks.MockFacilityResponse();
    mockUserResponse = mocks.MockUserResponseChecker();
    mockEligibilityCriteriaResponse = mocks.MockEligibilityCriteriaResponse();

    api.getApplication.mockResolvedValue(mockApplicationResponse);
    api.getExporter.mockResolvedValue(mockExporterResponse);
    api.getFacilities.mockResolvedValue(mockFacilityResponse);
    api.getEligibilityCriteria.mockResolvedValue(mockEligibilityCriteriaResponse);
    api.getUserDetails.mockResolvedValue(mockUserResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('it should call getUserDetails for maker and checker details', async () => {
    await getPortalActivities(mockRequest, mockResponse);

    expect(api.getUserDetails).toHaveBeenCalledWith(
      mockApplicationResponse.userId,
      mockRequest.session.userToken,
    );
  });

  it('it should call mapPortalActivities to produce mojTimeline array format', async () => {
    await getPortalActivities(mockRequest, mockResponse);

    expect(api.getExporter).toHaveBeenCalledWith(mockApplicationResponse.exporterId);
  });

  it('it should render application-activity template', async () => {
    await getPortalActivities(mockRequest, mockResponse);

    const maker = await api.getUserDetails(mockApplicationResponse.userId, mockRequest.session.userToken);
    const checker = await api.getUserDetails(mockApplicationResponse.checkerId, mockRequest.session.userToken);
    const exporter = await api.getExporter(mockApplicationResponse.exporterId);

    const mappedPortalActivities = mapPortalActivities(mockApplicationResponse.portalActivities);

    expect(mockResponse.render)
      .toHaveBeenCalledWith('partials/application-activity.njk', {
        activeSubNavigation: 'activities',
        applicationId: '123',
        portalActivities: mappedPortalActivities,
        bankInternalRefName: mockApplicationResponse.bankInternalRefName,
        additionalRefName: mockApplicationResponse.additionalRefName,
        ukefDealId: mockApplicationResponse.ukefDealId,
        applicationStatus: mockApplicationResponse.status,
        applicationType: mockApplicationResponse.submissionType,
        submissionCount: mockApplicationResponse.submissionCount,
        checkedBy: `${checker.firstname} ${checker.surname}`,
        createdBy: `${maker.firstname} ${maker.surname}`,
        companyName: exporter.details.companyName,
        dateCreated: mockApplicationResponse.createdAt,
        timezone: maker.timezone || 'Europe/London',
        submissionDate: mockApplicationResponse.submissionDate,
      });
  });
});
