import {
  applicationDetails,
  postApplicationDetails,
} from './index';
import api from '../../services/api';

jest.mock('../../services/api');

const MockResponse = () => {
  const res = {};
  res.redirect = jest.fn();
  res.render = jest.fn();
  return res;
};

const MockRequest = () => {
  const req = {};
  req.params = {};
  req.query = {};
  req.params.applicationId = '123';
  req.session = {
    user: {
      bank: { id: 'BANKID' },
      roles: ['MAKER'],
    },
  };
  return req;
};

const MockApplicationResponse = () => {
  const res = {};
  res._id = '1234';
  res.exporterId = '123';
  res.coverTermsId = '123';
  res.bankId = 'BANKID';
  res.bankInternalRefName = 'My test';
  res.status = 'DRAFT';
  return res;
};

const MockExporterResponse = () => {
  const res = {};
  res.details = {};
  res.status = 'IN_PROGRESS';
  res.validation = {};
  res.details.companiesHouseRegistrationNumber = 'tedsi';
  res.validation.required = [];
  return res;
};

const MockCoverTermsResponse = () => {
  const res = {};
  res.status = 'NOT_STARTED';
  res.details = {};
  res.validation = {};
  res.validation.required = [];
  res.data = [];
  return res;
};

const MockEligibilityCriteriaResponse = () => ({
  terms: [
    {
      id: 'coverStart',
      htmlText: '<p>Some eligibility criteria</p>',
      errMsg: '12. Select some eligibilty',
    },
  ],
});


const MockFacilityResponse = () => {
  const res = {};
  res.status = 'IN_PROGRESS';
  res.data = [];
  return res;
};

describe('controllers/about-exporter', () => {
  let mockResponse;
  let mockRequest;

  beforeEach(() => {
    mockResponse = MockResponse();
    mockRequest = MockRequest();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET Application Details', () => {
    it('renders the `Application Details` template', async () => {
      const mockApplicationResponse = new MockApplicationResponse();
      const mockExporterResponse = new MockExporterResponse();
      const mockCoverTermsResponse = new MockCoverTermsResponse();
      const mockFacilityResponse = new MockFacilityResponse();
      const mockEligibiltyCriteriaResponse = new MockEligibilityCriteriaResponse();

      mockFacilityResponse.items = [{
        details: { type: 'CASH' },
        validation: { required: [] },
      }];

      api.getApplication.mockResolvedValue(mockApplicationResponse);
      api.getExporter.mockResolvedValue(mockExporterResponse);
      api.getCoverTerms.mockResolvedValue(mockCoverTermsResponse);
      api.getFacilities.mockResolvedValue(mockFacilityResponse);
      api.getEligibilityCriteria.mockResolvedValue(mockEligibiltyCriteriaResponse);

      await applicationDetails(mockRequest, mockResponse);
      expect(mockResponse.render)
        .toHaveBeenCalledWith('partials/application-details.njk', expect.objectContaining({
          bankInternalRefName: 'My test',
          exporter: {
            status: expect.any(Object),
            rows: expect.any(Array),
          },
          coverTerms: {
            status: expect.any(Object),
            rows: expect.any(Array),
          },
          facilities: {
            status: expect.any(Object),
            data: expect.any(Array),
          },
          submit: expect.any(Boolean),
        }));
    });

    it('redirects user to `problem with service` page if there is an issue with the API', async () => {
      const mockNext = jest.fn();
      const error = new Error('error');

      api.getApplication.mockRejectedValue(error);
      await applicationDetails(mockRequest, mockResponse, mockNext);
      expect(mockNext)
        .toHaveBeenCalledWith(error);
    });
  });

  describe('POST Application Details', () => {
    it('redirects to submission url', async () => {
      postApplicationDetails(mockRequest, mockResponse);

      expect(mockResponse.redirect)
        .toHaveBeenCalledWith('/gef/application-details/123/submit');
    });
  });
});
