import httpMocks from 'node-mocks-http';
import { HttpStatusCode, AxiosError, AxiosResponse } from 'axios';
import api from '../../api';
import { postKeyingData } from './post-keying-data.controller';

jest.mock('../../api');

console.error = jest.fn();

describe('postKeyingData', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.mocked(api.generateKeyingData).mockResolvedValue({});
  });

  const getHttpMocks = () =>
    httpMocks.createMocks({
      params: { reportId: '1' },
    });

  it('generates keying data', async () => {
    // Arrange
    const reportId = '12';
    const { req, res } = httpMocks.createMocks({
      params: { reportId },
    });

    // Act
    await postKeyingData(req, res);

    // Assert
    expect(api.generateKeyingData).toHaveBeenCalledWith(reportId);
  });

  it('responds with a 200', async () => {
    // Arrange
    const { req, res } = getHttpMocks();

    // Act
    await postKeyingData(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok);
    expect(res._isEndCalled()).toBe(true);
  });

  it('responds with a 500 if an unknown error occurs', async () => {
    // Arrange
    const { req, res } = getHttpMocks();

    jest.mocked(api.generateKeyingData).mockRejectedValue(new Error('Some error'));

    // Act
    await postKeyingData(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(HttpStatusCode.InternalServerError);
    expect(res._isEndCalled()).toBe(true);
  });

  it('responds with a specific error code if an axios error is thrown', async () => {
    // Arrange
    const { req, res } = getHttpMocks();

    const errorStatus = HttpStatusCode.BadRequest;
    const axiosError = new AxiosError(undefined, undefined, undefined, undefined, { status: errorStatus } as AxiosResponse);

    jest.mocked(api.generateKeyingData).mockRejectedValue(axiosError);

    // Act
    await postKeyingData(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(errorStatus);
    expect(res._isEndCalled()).toBe(true);
  });

  it('responds with an error message', async () => {
    // Arrange
    const { req, res } = getHttpMocks();

    jest.mocked(api.generateKeyingData).mockRejectedValue(new Error('Some error'));

    // Act
    await postKeyingData(req, res);

    // Assert
    expect(res._getData()).toBe('Failed to generate keying data');
    expect(res._isEndCalled()).toBe(true);
  });
});
