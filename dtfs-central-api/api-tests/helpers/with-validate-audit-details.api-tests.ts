import { AuditDetails } from '@ukef/dtfs2-common/src/types/audit-details';
import {
  generateNoUserLoggedInAuditDetails,
  generatePortalAuditDetails,
  generateSystemAuditDetails,
  generateTfmAuditDetails,
} from '@ukef/dtfs2-common/src/helpers/change-stream/generate-audit-details';
import { MOCK_TFM_USER } from '../mocks/test-users/mock-tfm-user';
import { MOCK_PORTAL_USER } from '../mocks/test-users/mock-portal-user';

type MakeRequest = (auditDetails?: AuditDetails) => Promise<{ status: number; body: object }>;

type Params = {
  makeRequest: MakeRequest;
  validUserTypes: ('tfm' | 'portal' | 'system' | 'none')[];
};

export const withValidateAuditDetailsTests = ({ makeRequest, validUserTypes }: Params) => {
  describe('when validating audit details', () => {
    const { validAuditDetails, invalidAuditDetails } = getValidAndInvalidAuditDetails(validUserTypes);

    withValidAuditDetailsTests(validAuditDetails, makeRequest);

    if (invalidAuditDetails.length) {
      withInvalidAuditDetailsTests(invalidAuditDetails, makeRequest);
    }

    it('should return 400 if no auditDetails provided', async () => {
      const { status, body } = await makeRequest();

      expect(body).toEqual({ status: 400, message: 'Invalid auditDetails, Missing property `userType`' });
      expect(status).toBe(400);
    });
  });
};

function withValidAuditDetailsTests(validAuditDetails: AuditDetails[], makeRequest: MakeRequest) {
  it.each(validAuditDetails)('it should return status 200 if the userType is $userType', async (auditDetails) => {
    const { status } = await makeRequest(auditDetails);

    expect(status).toBe(200);
  });
}

function withInvalidAuditDetailsTests(invalidAuditDetails: AuditDetails[], makeRequest: MakeRequest) {
  it.each(invalidAuditDetails)('it should return status 400 if the userType is $userType', async (auditDetails) => {
    const { status, body } = await makeRequest(auditDetails);

    expect(status).toBe(400);
    expect(body).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message: expect.stringContaining('Invalid auditDetails, userType must be'),
      status: 400,
    });
  });
}

function getValidAndInvalidAuditDetails(validUserTypes: ('tfm' | 'portal' | 'system' | 'none')[]) {
  const allAuditDetails = [
    generateSystemAuditDetails(),
    generatePortalAuditDetails(MOCK_PORTAL_USER._id),
    generateTfmAuditDetails(MOCK_TFM_USER._id),
    generateNoUserLoggedInAuditDetails(),
  ];

  const validAuditDetails: AuditDetails[] = [];
  const invalidAuditDetails: AuditDetails[] = [];

  allAuditDetails.forEach((auditDetails) => {
    if (validUserTypes.includes(auditDetails.userType)) {
      validAuditDetails.push(auditDetails);
    } else {
      invalidAuditDetails.push(auditDetails);
    }
  });
  return { validAuditDetails, invalidAuditDetails };
}
