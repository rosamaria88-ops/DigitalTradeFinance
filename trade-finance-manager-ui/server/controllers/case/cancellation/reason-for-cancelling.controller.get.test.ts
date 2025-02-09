import { createMocks } from 'node-mocks-http';
import { DEAL_SUBMISSION_TYPE } from '@ukef/dtfs2-common';
import { aRequestSession } from '../../../../test-helpers';
import { getReasonForCancelling, GetReasonForCancellingRequest } from './reason-for-cancelling.controller';
import { PRIMARY_NAVIGATION_KEYS } from '../../../constants';
import { ReasonForCancellingViewModel } from '../../../types/view-models';
import api from '../../../api';

jest.mock('../../../api', () => ({
  getDeal: jest.fn(),
  getDealCancellation: jest.fn(),
}));

const dealId = 'dealId';
const ukefDealId = 'ukefDealId';

describe('getReasonForCancelling', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('redirects to not found if the deal does not exist', async () => {
    // Arrange
    jest.mocked(api.getDeal).mockResolvedValue(undefined);

    const { req, res } = createMocks<GetReasonForCancellingRequest>({
      params: { _id: dealId },
      session: aRequestSession(),
    });

    // Act
    await getReasonForCancelling(req, res);

    // Assert
    expect(res._getRedirectUrl()).toEqual(`/not-found`);
  });

  it('redirects to not found if the dealId is invalid', async () => {
    // Arrange
    jest.mocked(api.getDeal).mockResolvedValue({ status: 400, data: 'Invalid deal id' });

    const { req, res } = createMocks<GetReasonForCancellingRequest>({
      params: { _id: dealId },
      session: aRequestSession(),
    });

    // Act
    await getReasonForCancelling(req, res);

    // Assert
    expect(res._getRedirectUrl()).toEqual(`/not-found`);
  });

  it('redirects to deal summary page if the submission type is invalid (MIA)', async () => {
    // Arrange
    jest.mocked(api.getDeal).mockResolvedValue({ dealSnapshot: { details: { ukefDealId }, submissionType: DEAL_SUBMISSION_TYPE.MIA } });

    const { req, res } = createMocks<GetReasonForCancellingRequest>({
      params: { _id: dealId },
      session: aRequestSession(),
    });

    // Act
    await getReasonForCancelling(req, res);

    // Assert
    expect(res._getRedirectUrl()).toEqual(`/case/${dealId}/deal`);
  });

  describe.each([DEAL_SUBMISSION_TYPE.AIN, DEAL_SUBMISSION_TYPE.MIN])('when the deal type is %s', (validDealType) => {
    it('renders the reason for cancelling page', async () => {
      // Arrange
      const reason = 'Existing reason';
      jest.mocked(api.getDealCancellation).mockResolvedValue({ reason });
      jest.mocked(api.getDeal).mockResolvedValue({ dealSnapshot: { details: { ukefDealId }, submissionType: validDealType } });

      const session = aRequestSession();

      const { req, res } = createMocks<GetReasonForCancellingRequest>({
        params: { _id: dealId },
        session,
      });

      // Act
      await getReasonForCancelling(req, res);

      // Assert
      expect(res._getRenderView()).toEqual('case/cancellation/reason-for-cancelling.njk');
      expect(res._getRenderData() as ReasonForCancellingViewModel).toEqual({
        activePrimaryNavigation: PRIMARY_NAVIGATION_KEYS.ALL_DEALS,
        user: session.user,
        ukefDealId,
        dealId,
        reasonForCancelling: reason,
        previousPage: `/case/${dealId}/deal`,
      });
    });

    it('renders the page with the back URL as the check details page when "change" is passed in as a query parameter', async () => {
      // Arrange
      const reason = 'Existing reason';
      jest.mocked(api.getDealCancellation).mockResolvedValue({ reason });
      jest.mocked(api.getDeal).mockResolvedValue({ dealSnapshot: { details: { ukefDealId }, submissionType: validDealType } });

      const session = aRequestSession();

      const { req, res } = createMocks<GetReasonForCancellingRequest>({
        params: { _id: dealId },
        query: { status: 'change' },
        session,
      });

      // Act
      await getReasonForCancelling(req, res);

      // Assert
      expect(res._getRenderView()).toEqual('case/cancellation/reason-for-cancelling.njk');
      expect(res._getRenderData() as ReasonForCancellingViewModel).toEqual({
        activePrimaryNavigation: PRIMARY_NAVIGATION_KEYS.ALL_DEALS,
        user: session.user,
        ukefDealId,
        dealId,
        reasonForCancelling: reason,
        previousPage: `/case/${dealId}/cancellation/check-details`,
      });
    });
  });
});
