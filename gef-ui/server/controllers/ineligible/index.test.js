import { getMandatoryCriteria, validateMandatoryCriteria } from './index';
import * as api from '../../services/api';

const mockResponse = () => {
  const res = {};
  res.redirect = jest.fn();
  res.render = jest.fn();
  return res;
};

const response = mockResponse();
const mockCriteria = {
  mockedText: 'This is a test',
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('GET Mandatory Criteria', () => {
  it('renders the `mandatory-criteria` template', async () => {
    api.getMandatoryCriteria = () => Promise.resolve(mockCriteria);
    await getMandatoryCriteria({}, response);
    expect(response.render).toHaveBeenCalledWith('partials/mandatory-criteria.njk', {
      criteria: mockCriteria,
    });
  });

  it('renders the `mandatory-criteria` template with error message', async () => {
    const mockedRejection = { response: { status: 400, message: 'Whoops' } };
    api.getMandatoryCriteria = () => Promise.reject(mockedRejection);
    await getMandatoryCriteria({}, response);
    expect(response.render).toHaveBeenCalledWith('partials/mandatory-criteria.njk', {
      error: 'Bad Request',
    });
  });
});

describe('Validate Mandatory Criteria', () => {
  it('returns error object if mandatory criteria property is empty', async () => {
    const mockedRequest = {
      body: {
        mandatoryCriteria: '',
      },
    };
    api.getMandatoryCriteria = () => Promise.resolve(mockCriteria);
    await validateMandatoryCriteria(mockedRequest, response);
    expect(response.render).toHaveBeenCalledWith('partials/mandatory-criteria.njk', expect.objectContaining({
      criteria: expect.any(Object),
      errors: expect.any(Object),
    }));
  });

  it('redirects user to `name application` page if they select `true`', async () => {
    const mockedRequest = {
      body: {
        mandatoryCriteria: 'true',
      },
    };
    api.getMandatoryCriteria = () => Promise.resolve(mockCriteria);
    await validateMandatoryCriteria(mockedRequest, response);
    expect(response.redirect).toHaveBeenCalledWith('name-application');
  });

  it('keeps user on same page if they select `false`', async () => {
    const mockedRequest = {
      body: {
        mandatoryCriteria: 'false',
      },
    };
    api.getMandatoryCriteria = () => Promise.resolve(mockCriteria);
    await validateMandatoryCriteria(mockedRequest, response);
    expect(response.render).toHaveBeenCalledWith('partials/mandatory-criteria.njk', {
      criteria: mockCriteria,
    });
  });
});
