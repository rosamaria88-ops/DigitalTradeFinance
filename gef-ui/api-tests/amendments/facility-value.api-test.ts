import { Headers } from 'node-mocks-http';
import { NextFunction, Request, Response } from 'express';
import { CURRENCY, DEAL_STATUS, DEAL_SUBMISSION_TYPE, ROLES } from '@ukef/dtfs2-common';
import { HttpStatusCode } from 'axios';
import { withRoleValidationApiTests } from '../common-tests/role-validation-api-tests';
import app from '../../server/createApp';
import { createApi } from '../create-api';
import api from '../../server/services/api';
import * as storage from '../test-helpers/storage/storage';
import { Deal } from '../../server/types/deal';
import { Facility } from '../../server/types/facility';

const originalEnv = { ...process.env };

const { get } = createApi(app);

jest.mock('csurf', () => () => (_req: Request, _res: Response, next: NextFunction) => next());
jest.mock('../../server/middleware/csrf', () => ({
  csrfToken: () => (_req: Request, _res: Response, next: NextFunction) => next(),
}));

const mockGetFacility = jest.fn();
const mockGetApplication = jest.fn();

const dealId = '123';
const facilityId = '111';
const amendmentId = '111';

const mockDeal = { exporter: { companyName: 'test exporter' }, submissionType: DEAL_SUBMISSION_TYPE.AIN, status: DEAL_STATUS.UKEF_ACKNOWLEDGED } as Deal;
const mockFacility = { currency: { id: CURRENCY.GBP }, hasBeenIssued: true } as Facility;

const url = `/application-details/${dealId}/facilities/${facilityId}/amendments/${amendmentId}/facility-value`;

describe(`GET ${url}`, () => {
  let sessionCookie: string;

  beforeEach(async () => {
    await storage.flush();
    jest.resetAllMocks();

    ({ sessionCookie } = await storage.saveUserSession([ROLES.MAKER]));
    jest.spyOn(api, 'getFacility').mockImplementation(mockGetFacility);
    jest.spyOn(api, 'getApplication').mockImplementation(mockGetApplication);

    mockGetFacility.mockResolvedValue({ details: mockFacility });
    mockGetApplication.mockResolvedValue(mockDeal);
  });

  afterAll(async () => {
    jest.resetAllMocks();
    await storage.flush();
    process.env = originalEnv;
  });

  describe('when portal facility amendments feature flag is disabled', () => {
    beforeEach(() => {
      process.env.FF_PORTAL_FACILITY_AMENDMENTS_ENABLED = 'false';
    });

    it('should redirect to /not-found', async () => {
      // Act
      const response = await getWithSessionCookie(sessionCookie);

      // Assert
      expect(response.status).toEqual(HttpStatusCode.Found);
      expect(response.headers.location).toEqual('/not-found');
    });
  });

  describe('when portal facility amendments feature flag is enabled', () => {
    beforeEach(() => {
      process.env.FF_PORTAL_FACILITY_AMENDMENTS_ENABLED = 'true';
    });

    withRoleValidationApiTests({
      makeRequestWithHeaders: (headers: Headers) => get(url, {}, headers),
      whitelistedRoles: [ROLES.MAKER],
      successCode: HttpStatusCode.Ok,
    });

    it('should render `New facility value` page', async () => {
      // Act
      const response = await getWithSessionCookie(sessionCookie);

      // Assert
      expect(response.status).toEqual(HttpStatusCode.Ok);
      expect(response.text).toContain('New facility value');
    });

    it('should redirect to /not-found when facility not found', async () => {
      // Arrange
      mockGetFacility.mockResolvedValue({ details: undefined });

      // Act
      const response = await getWithSessionCookie(sessionCookie);

      // Assert
      expect(response.status).toEqual(HttpStatusCode.Found);
      expect(response.headers.location).toEqual('/not-found');
    });

    it('should redirect to /not-found when deal not found', async () => {
      // Arrange
      mockGetApplication.mockResolvedValue(undefined);

      // Act
      const response = await getWithSessionCookie(sessionCookie);

      // Assert
      expect(response.status).toEqual(HttpStatusCode.Found);
      expect(response.headers.location).toEqual('/not-found');
    });

    it('should redirect to deal summary page when facility cannot be amended', async () => {
      // Arrange
      mockGetApplication.mockResolvedValue({ details: { ...mockFacility, hasBeenIssued: false } });

      // Act
      const response = await getWithSessionCookie(sessionCookie);

      // Assert
      expect(response.status).toEqual(HttpStatusCode.Found);
      expect(response.headers.location).toEqual(`/gef/application-details/${dealId}`);
    });

    it('should render `problem with service` if getApplication throws an error', async () => {
      // Arrange
      mockGetApplication.mockRejectedValue(new Error('test error'));

      // Act
      const response = await getWithSessionCookie(sessionCookie);

      // Assert
      expect(response.status).toEqual(HttpStatusCode.Ok);
      expect(response.text).toContain('Problem with the service');
    });

    it('should render `problem with service` if getFacility throws an error', async () => {
      // Arrange
      mockGetFacility.mockRejectedValue(new Error('test error'));

      // Act
      const response = await getWithSessionCookie(sessionCookie);

      // Assert
      expect(response.status).toEqual(HttpStatusCode.Ok);
      expect(response.text).toContain('Problem with the service');
    });
  });
});

function getWithSessionCookie(sessionCookie: string) {
  return get(
    url,
    {},
    {
      Cookie: [`dtfs-session=${encodeURIComponent(sessionCookie)}`],
    },
  );
}
