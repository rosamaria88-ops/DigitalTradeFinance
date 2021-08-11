import { add, sub, format } from 'date-fns';
import { aboutFacility, validateAboutFacility } from './index';
import * as api from '../../services/api';

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

const MockAboutFacilityResponse = () => {
  const res = {};
  res.details = {
    type: 'CASH',
    name: 'Foundry4',
    hasBeenIssued: true,
    monthsOfCover: null,
    coverStartDate: '2030-01-02T00:00:00.000+00:00',
    shouldCoverStartOnSubmission: true,
    coverEndDate: null,
  };
  return res;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('GET About Facility', () => {
  it('renders the `About Facility` template', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    const mockAboutFacilityResponse = new MockAboutFacilityResponse();

    mockRequest.query.status = 'change';

    api.getFacility = () => Promise.resolve(mockAboutFacilityResponse);
    await aboutFacility(mockRequest, mockResponse);
    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      facilityType: 'CASH',
      facilityName: 'Foundry4',
      hasBeenIssued: true,
      monthsOfCover: null,
      shouldCoverStartOnSubmission: 'true',
      coverStartDateDay: '2',
      coverStartDateMonth: '1',
      coverStartDateYear: '2030',
      coverEndDateMonth: null,
      coverEndDateYear: null,
      facilityTypeString: 'cash',
      applicationId: '123',
      facilityId: 'xyz',
      status: 'change',
    }));
  });

  it('redirects user to `problem with service` page if there is an issue with the API', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();

    api.getFacility = () => Promise.reject();
    await aboutFacility(mockRequest, mockResponse);
    expect(mockResponse.render).toHaveBeenCalledWith('partials/problem-with-service.njk');
  });
});

describe('Validate About Facility', () => {
  const now = new Date();
  const tomorrow = add(now, { days: 1 });
  const yesterday = sub(now, { days: 1 });
  const threeMonthsAndOneDayFromNow = add(now, { months: 3, days: 1 });
  const oneDayoneDayLessThanThreeMonthsFromNow = sub(add(now, { months: 3 }), { days: 1 });
  it('redirects user to application page if save and return is set to true', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    const mockAboutFacilityResponse = new MockAboutFacilityResponse();
    mockRequest.query.saveAndReturn = 'true';
    mockRequest.body.facilityType = 'CASH';

    api.updateFacility = () => Promise.resolve(mockAboutFacilityResponse);
    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.redirect).toHaveBeenCalledWith('/gef/application-details/123');
  });

  it('sets the correct date format using single day, month and year values', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    const updateFacilitySpy = jest.spyOn(api, 'updateFacility').mockImplementationOnce(() => Promise.resolve());
    mockRequest.body.facilityType = 'CASH';
    mockRequest.query.saveAndReturn = 'true';
    mockRequest.body['cover-start-date-day'] = format(tomorrow, 'd');
    mockRequest.body['cover-start-date-month'] = format(tomorrow, 'M');
    mockRequest.body['cover-start-date-year'] = format(tomorrow, 'yyyy');

    mockRequest.body['cover-end-date-day'] = format(tomorrow, 'd');
    mockRequest.body['cover-end-date-month'] = format(tomorrow, 'M');
    mockRequest.body['cover-end-date-year'] = format(tomorrow, 'yyyy');

    await validateAboutFacility(mockRequest, mockResponse);

    expect(updateFacilitySpy).toHaveBeenCalledWith('xyz', {
      coverEndDate: format(tomorrow, 'MMMM d, yyyy'),
      coverStartDate: format(tomorrow, 'MMMM d, yyyy'),
      shouldCoverStartOnSubmission: null,
      monthsOfCover: null,
      name: undefined,
    });
  });

  it('shows error message if month of cover is not a number', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.monthsOfCover = 'ab';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.arrayContaining([{ href: '#monthsOfCover', text: expect.any(String) }]),
      }),
    }));
  });

  it('shows error message if no facility name has been provided', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.facilityName = 'name';
    mockRequest.body.hasBeenIssued = 'true';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.not.arrayContaining([{ href: '#facilityName', text: expect.any(String) }]),
      }),
    }));

    mockRequest.body.facilityName = '';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.arrayContaining([{ href: '#facilityName', text: expect.any(String) }]),
      }),
    }));
  });

  it('shows error message if no shouldCoverStartOnSubmission radio button has been selected', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.hasBeenIssued = 'true';
    mockRequest.body.shouldCoverStartOnSubmission = 'true';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.not.arrayContaining([{ href: '#shouldCoverStartOnSubmission', text: expect.any(String) }]),
      }),
    }));

    mockRequest.body.shouldCoverStartOnSubmission = '';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.arrayContaining([{ href: '#shouldCoverStartOnSubmission', text: expect.any(String) }]),
      }),
    }));
  });

  it('shows error message if no coverStartDateDay or coverStartDateMonth or coverStartDateYear has been provided', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.hasBeenIssued = 'true';
    mockRequest.body.shouldCoverStartOnSubmission = 'false';
    mockRequest.body['cover-start-date-day'] = format(tomorrow, 'd');
    mockRequest.body['cover-start-date-month'] = format(tomorrow, 'M');
    mockRequest.body['cover-start-date-year'] = format(tomorrow, 'yyyy');

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.not.arrayContaining([{ href: '#coverStartDate', text: expect.any(String) }]),
      }),
    }));

    mockRequest.body['cover-start-date-day'] = '';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.arrayContaining([{ href: '#coverStartDate', text: expect.any(String) }]),
      }),
    }));

    mockRequest.body['cover-start-date-day'] = format(tomorrow, 'd');
    mockRequest.body['cover-start-date-month'] = '';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.arrayContaining([{ href: '#coverStartDate', text: expect.any(String) }]),
      }),
    }));
  });

  it('shows error message if coverStartDate is more than 3 months away', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();

    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.hasBeenIssued = 'true';
    mockRequest.body.shouldCoverStartOnSubmission = 'false';
    mockRequest.body['cover-start-date-day'] = format(threeMonthsAndOneDayFromNow, 'd');
    mockRequest.body['cover-start-date-month'] = format(threeMonthsAndOneDayFromNow, 'M');
    mockRequest.body['cover-start-date-year'] = format(threeMonthsAndOneDayFromNow, 'yyyy');

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.arrayContaining([{ href: '#coverStartDate', text: expect.any(String) }]),
      }),
    }));
  });

  it('doesnt show error message if coverStartDate is less than 3 months away', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();

    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.hasBeenIssued = 'true';
    mockRequest.body.shouldCoverStartOnSubmission = 'false';
    mockRequest.body['cover-start-date-day'] = format(oneDayoneDayLessThanThreeMonthsFromNow, 'd');
    mockRequest.body['cover-start-date-month'] = format(oneDayoneDayLessThanThreeMonthsFromNow, 'M');
    mockRequest.body['cover-start-date-year'] = format(oneDayoneDayLessThanThreeMonthsFromNow, 'yyyy');

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.not.arrayContaining([{ href: '#coverStartDate', text: expect.any(String) }]),
      }),
    }));
  });

  it('shows error message if coverStartDate is in the past', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();

    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.hasBeenIssued = 'true';
    mockRequest.body.shouldCoverStartOnSubmission = 'false';
    mockRequest.body['cover-start-date-day'] = format(yesterday, 'd');
    mockRequest.body['cover-start-date-month'] = format(yesterday, 'M');
    mockRequest.body['cover-start-date-year'] = format(yesterday, 'yyyy');

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.arrayContaining([{ href: '#coverStartDate', text: expect.any(String) }]),
      }),
    }));
  });

  it('shows error message if no monthsOfcover has been provided', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.hasBeenIssued = 'false';
    mockRequest.body.monthsOfCover = '';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.render).toHaveBeenCalledWith('partials/about-facility.njk', expect.objectContaining({
      errors: expect.objectContaining({
        errorSummary: expect.arrayContaining([{ href: '#monthsOfCover', text: expect.any(String) }]),
      }),
    }));
  });

  it('redirects user to provided facility page if all of method passes', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    mockRequest.body.facilityType = 'CASH';
    mockRequest.body.hasBeenIssued = 'true';
    mockRequest.body.facilityName = 'Name';
    mockRequest.body.shouldCoverStartOnSubmission = 'true';
    mockRequest.body.hasBeenIssued = 'true';
    mockRequest.body.monthsOfCover = '10';
    mockRequest.body['cover-start-date-day'] = '01';
    mockRequest.body['cover-start-date-month'] = '05';
    mockRequest.body['cover-start-date-year'] = '2022';
    mockRequest.body['cover-end-date-day'] = '05';
    mockRequest.body['cover-end-date-month'] = '12';
    mockRequest.body['cover-end-date-year'] = '2023';

    await validateAboutFacility(mockRequest, mockResponse);

    expect(mockResponse.redirect).toHaveBeenCalledWith('/gef/application-details/123/facilities/xyz/provided-facility');
  });

  it('redirects user to `problem with service` page if there is an issue with the API', async () => {
    const mockResponse = new MockResponse();
    const mockRequest = new MockRequest();
    mockRequest.query.saveAndReturn = 'true';
    mockRequest.body.facilityType = 'CASH';

    api.updateFacility = () => Promise.reject();
    await validateAboutFacility(mockRequest, mockResponse);
    expect(mockResponse.render).toHaveBeenCalledWith('partials/problem-with-service.njk');
  });
});
