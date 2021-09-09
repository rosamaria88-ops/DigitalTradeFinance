import { providedFacility, validateProvidedFacility } from './index';
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
  req.body = {};
  req.params.applicationId = '123';
  req.params.facilityId = 'xyz';
  return req;
};

const MockProvidedFacilityResponse = () => {
  const res = {};
  res.details = {};
  return res;
};

describe('controllers/provided-facility', () => {
  let mockResponse;
  let mockRequest;
  let mockProvidedFacilityResponse;

  beforeEach(() => {
    mockResponse = MockResponse();
    mockRequest = MockRequest();
    mockProvidedFacilityResponse = MockProvidedFacilityResponse();

    // api.getApplication.mockResolvedValue();
    api.getFacility.mockResolvedValue(mockProvidedFacilityResponse);
    api.updateFacility.mockResolvedValue(mockProvidedFacilityResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET Provided Facility', () => {
    it('renders the `Provided Facility` template', async () => {
      mockRequest.query.status = 'change';
      mockProvidedFacilityResponse.details.details = ['TERMS', 'RESOLVING'];
      mockProvidedFacilityResponse.details.type = 'CASH';

      api.getFacility.mockResolvedValueOnce(mockProvidedFacilityResponse);

      await providedFacility(mockRequest, mockResponse);

      expect(mockResponse.render).toHaveBeenCalledWith('partials/provided-facility.njk', expect.objectContaining({
        details: ['TERMS', 'RESOLVING'],
        facilityTypeString: 'cash',
        applicationId: '123',
        facilityId: 'xyz',
        status: 'change',
      }));
    });

    it('redirects user to `problem with service` page if there is an issue with the API', async () => {
      api.getFacility.mockRejectedValueOnce();
      await providedFacility(mockRequest, mockResponse);
      expect(mockResponse.render).toHaveBeenCalledWith('partials/problem-with-service.njk');
    });
  });

  describe('Validate Provided Facility', () => {
    it('shows error message if nothing is set', async () => {
      await validateProvidedFacility(mockRequest, mockResponse);

      expect(mockResponse.render).toHaveBeenCalledWith('partials/provided-facility.njk', expect.objectContaining({
        errors: expect.objectContaining({
          errorSummary: expect.arrayContaining([{ href: '#', text: expect.any(String) }]),
        }),
      }));
    });

    it('redirects user to application page if application page if save and return is set to true', async () => {
      mockRequest.query.saveAndReturn = 'true';

      await validateProvidedFacility(mockRequest, mockResponse);

      expect(mockResponse.redirect).toHaveBeenCalledWith('/gef/application-details/123');
    });

    it('redirects user to application page if application page if query status is equal to `change`', async () => {
      mockRequest.query.status = 'change';
      mockRequest.body.details = ['TERMS'];

      await validateProvidedFacility(mockRequest, mockResponse);

      expect(mockResponse.redirect).toHaveBeenCalledWith('/gef/application-details/123');
    });

    it('shows error message if Other textarea is left empty', async () => {
      mockRequest.body.details = 'OTHER';

      await validateProvidedFacility(mockRequest, mockResponse);

      expect(mockResponse.render).toHaveBeenCalledWith('partials/provided-facility.njk', expect.objectContaining({
        errors: expect.objectContaining({
          errorSummary: expect.arrayContaining([{ href: '#detailsOther', text: expect.any(String) }]),
        }),
      }));

      mockRequest.body.details = ['OTHER', 'TERMS'];

      await validateProvidedFacility(mockRequest, mockResponse);

      expect(mockResponse.render).toHaveBeenCalledWith('partials/provided-facility.njk', expect.objectContaining({
        errors: expect.objectContaining({
          errorSummary: expect.arrayContaining([{ href: '#detailsOther', text: expect.any(String) }]),
        }),
      }));
    });

    it('calls the updateFacility api with the correct data', async () => {
      mockRequest.body.details = ['TERMS', 'RESOLVING'];
      mockRequest.body.type = 'CASH';

      await validateProvidedFacility(mockRequest, mockResponse);

      expect(api.updateFacility).toHaveBeenCalledWith('xyz', {
        details: ['TERMS', 'RESOLVING'],
        detailsOther: undefined,
      });
    });

    it('redirects user to `problem with service` page if there is an issue with the API', async () => {
      mockRequest.body.details = ['TERMS'];
      api.updateFacility.mockRejectedValueOnce();
      await validateProvidedFacility(mockRequest, mockResponse);
      expect(mockResponse.render).toHaveBeenCalledWith('partials/problem-with-service.njk');
    });
  });
});
