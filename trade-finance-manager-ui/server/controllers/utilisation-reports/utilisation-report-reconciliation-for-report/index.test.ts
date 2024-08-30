import httpMocks from 'node-mocks-http';
import { SessionData } from 'express-session';
import { FEE_RECORD_STATUS } from '@ukef/dtfs2-common';
import api from '../../../api';
import { getUtilisationReportReconciliationByReportId } from '.';
import { MOCK_TFM_SESSION_USER } from '../../../test-mocks/mock-tfm-session-user';
import { PRIMARY_NAVIGATION_KEYS } from '../../../constants';
import { aFeeRecordPaymentGroup, aUtilisationReportReconciliationDetailsResponse, aPayment } from '../../../../test-helpers';
import { UtilisationReportReconciliationDetailsResponseBody } from '../../../api-response-types';
import { FeeRecordPaymentGroupViewModelItem, PaymentDetailsViewModel, UtilisationReportReconciliationForReportViewModel } from '../../../types/view-models';

jest.mock('../../../api');
jest.mock('../../../helpers/date');

console.error = jest.fn();

describe('controllers/utilisation-reports/utilisation-report-reconciliation-for-report', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getUtilisationReportReconciliationByReportId', () => {
    const userToken = 'user-token';
    const user = MOCK_TFM_SESSION_USER;
    const session = { userToken, user };

    const reportId = '1';
    const facilityIdQuery = '1234';
    const originalUrl = '?facilityIdQuery';

    const getHttpMocksWithSessionData = (sessionData: Partial<SessionData>) =>
      httpMocks.createMocks({
        session: { ...session, ...sessionData },
        params: {
          reportId,
        },
        query: {
          facilityIdQuery,
        },
        originalUrl,
      });

    const getHttpMocks = () => getHttpMocksWithSessionData({});

    it("renders the '/problem-with-service' if the api responds with an error", async () => {
      // Arrange
      const { req, res } = getHttpMocks();

      jest.mocked(api.getUtilisationReportReconciliationDetailsById).mockRejectedValue(new Error('Some error'));

      // Act
      await getUtilisationReportReconciliationByReportId(req, res);

      // Assert
      expect(api.getUtilisationReportReconciliationDetailsById).toHaveBeenCalledWith(reportId, facilityIdQuery, userToken);
      expect(res._getRenderView()).toBe('_partials/problem-with-service.njk');
      expect(res._getRenderData()).toEqual({ user });
    });

    it("renders the 'utilisation-report-reconciliation-for-report' page with the correct data", async () => {
      // Arrange
      const { req, res } = getHttpMocks();

      const bank = {
        id: '123',
        name: 'Test bank',
      };
      const utilisationReportReconciliationDetails: UtilisationReportReconciliationDetailsResponseBody = {
        ...aUtilisationReportReconciliationDetailsResponse(),
        bank,
        reportPeriod: {
          start: { month: 1, year: 2024 },
          end: { month: 1, year: 2024 },
        },
        feeRecordPaymentGroups: [
          {
            feeRecords: [
              {
                id: 1,
                facilityId: '12345678',
                exporter: 'Test exporter',
                reportedFees: { currency: 'GBP', amount: 100 },
                reportedPayments: { currency: 'GBP', amount: 100 },
              },
            ],
            totalReportedPayments: { currency: 'GBP', amount: 100 },
            paymentsReceived: [{ id: 1, currency: 'GBP', amount: 100, dateReceived: new Date('2024-01-01').toISOString() }],
            totalPaymentsReceived: { currency: 'GBP', amount: 100 },
            status: FEE_RECORD_STATUS.MATCH,
          },
        ],
      };
      const formattedReportPeriod = 'January 2024';

      const feeRecordPaymentGroupViewModel: FeeRecordPaymentGroupViewModelItem[] = [
        {
          feeRecords: [
            {
              id: 1,
              facilityId: '12345678',
              exporter: 'Test exporter',
              reportedFees: 'GBP 100.00',
              reportedPayments: 'GBP 100.00',
            },
          ],
          totalReportedPayments: {
            formattedCurrencyAndAmount: 'GBP 100.00',
            dataSortValue: 0,
          },
          paymentsReceived: [{ id: 1, formattedCurrencyAndAmount: 'GBP 100.00' }],
          totalPaymentsReceived: {
            formattedCurrencyAndAmount: 'GBP 100.00',
            dataSortValue: 0,
          },
          status: FEE_RECORD_STATUS.MATCH,
          displayStatus: 'MATCH',
          checkboxId: 'feeRecordIds-1-reportedPaymentsCurrency-GBP-status-MATCH',
          isChecked: false,
          checkboxAriaLabel: 'Select 12345678',
        },
      ];

      const paymentDetailsViewModel: PaymentDetailsViewModel = [
        {
          payment: {
            id: 1,
            amount: { formattedCurrencyAndAmount: 'GBP 100.00', dataSortValue: 0 },
            dateReceived: { formattedDateReceived: '1 Jan 2024', dataSortValue: 0 },
            reference: undefined,
          },
          feeRecords: [{ facilityId: '12345678', exporter: 'Test exporter' }],
          feeRecordPaymentGroupStatus: FEE_RECORD_STATUS.MATCH,
        },
      ];

      jest.mocked(api.getUtilisationReportReconciliationDetailsById).mockResolvedValue(utilisationReportReconciliationDetails);

      // Act
      await getUtilisationReportReconciliationByReportId(req, res);

      // Assert
      expect(api.getUtilisationReportReconciliationDetailsById).toHaveBeenCalledWith(reportId, facilityIdQuery, userToken);
      expect(res._getRenderView()).toEqual('utilisation-reports/utilisation-report-reconciliation-for-report.njk');
      expect(res._getRenderData()).toEqual<UtilisationReportReconciliationForReportViewModel>({
        user: MOCK_TFM_SESSION_USER,
        activePrimaryNavigation: PRIMARY_NAVIGATION_KEYS.UTILISATION_REPORTS,
        bank,
        formattedReportPeriod,
        enablePaymentsReceivedSorting: true,
        reportId: '1',
        feeRecordPaymentGroups: feeRecordPaymentGroupViewModel,
        premiumPaymentFormError: undefined,
        facilityIdQueryError: undefined,
        facilityIdQuery,
        keyingSheet: [],
        paymentDetails: paymentDetailsViewModel,
      });
    });

    it('sets add payment error to contain passed in session data and checks selected checkboxes', async () => {
      // Arrange
      const sessionData: Partial<SessionData> = {
        addPaymentErrorKey: 'different-fee-record-statuses',
        checkedCheckboxIds: {
          'feeRecordIds-1-reportedPaymentsCurrency-GBP-status-TO_DO': true,
        },
      };
      const { req, res } = getHttpMocksWithSessionData(sessionData);

      const utilisationReportReconciliationDetails: UtilisationReportReconciliationDetailsResponseBody = {
        ...aUtilisationReportReconciliationDetailsResponse(),
        feeRecordPaymentGroups: [aFeeRecordPaymentGroup()],
      };

      jest.mocked(api.getUtilisationReportReconciliationDetailsById).mockResolvedValue(utilisationReportReconciliationDetails);

      // Act
      await getUtilisationReportReconciliationByReportId(req, res);

      // Assert
      expect(res._getRenderView()).toEqual('utilisation-reports/utilisation-report-reconciliation-for-report.njk');
      const viewModel = res._getRenderData() as UtilisationReportReconciliationForReportViewModel;
      expect(viewModel.premiumPaymentFormError).toBeDefined();
      expect(viewModel.premiumPaymentFormError?.href).toBe('#premium-payments-table');
      expect(viewModel.premiumPaymentFormError?.text).toBe('Select a fee or fees with the same status');
      expect(viewModel.feeRecordPaymentGroups[0].isChecked).toBe(true);
    });

    it("renders the page with 'enablePaymentsReceivedSorting' set to true if at least one fee record has a non-null 'paymentsReceived'", async () => {
      // Arrange
      const { req, res } = getHttpMocks();

      const utilisationReportReconciliationDetails: UtilisationReportReconciliationDetailsResponseBody = {
        ...aUtilisationReportReconciliationDetailsResponse(),
        feeRecordPaymentGroups: [
          {
            ...aFeeRecordPaymentGroup(),
            paymentsReceived: null,
            totalPaymentsReceived: null,
          },
          {
            ...aFeeRecordPaymentGroup(),
            paymentsReceived: [{ ...aPayment(), id: 1, currency: 'GBP', amount: 100 }],
            totalPaymentsReceived: { currency: 'GBP', amount: 100 },
          },
        ],
      };

      jest.mocked(api.getUtilisationReportReconciliationDetailsById).mockResolvedValue(utilisationReportReconciliationDetails);

      // Act
      await getUtilisationReportReconciliationByReportId(req, res);

      // Assert
      expect(res._getRenderView()).toEqual('utilisation-reports/utilisation-report-reconciliation-for-report.njk');
      const viewModel = res._getRenderData() as UtilisationReportReconciliationForReportViewModel;
      expect(viewModel.enablePaymentsReceivedSorting).toBe(true);
    });

    it("renders the page with 'enablePaymentsReceivedSorting' set to false if all fee records have null 'paymentsReceived'", async () => {
      // Arrange
      const { req, res } = getHttpMocks();

      const utilisationReportReconciliationDetails: UtilisationReportReconciliationDetailsResponseBody = {
        ...aUtilisationReportReconciliationDetailsResponse(),
        feeRecordPaymentGroups: [
          {
            ...aFeeRecordPaymentGroup(),
            paymentsReceived: null,
            totalPaymentsReceived: null,
          },
          {
            ...aFeeRecordPaymentGroup(),
            paymentsReceived: null,
            totalPaymentsReceived: null,
          },
        ],
      };

      jest.mocked(api.getUtilisationReportReconciliationDetailsById).mockResolvedValue(utilisationReportReconciliationDetails);

      // Act
      await getUtilisationReportReconciliationByReportId(req, res);

      // Assert
      expect(res._getRenderView()).toEqual('utilisation-reports/utilisation-report-reconciliation-for-report.njk');
      const viewModel = res._getRenderData() as UtilisationReportReconciliationForReportViewModel;
      expect(viewModel.enablePaymentsReceivedSorting).toBe(false);
    });

    it('sets facility ID query error when invalid facility ID query value used', async () => {
      // Arrange
      const facilityIdQueryParam = 'abc';
      const { req, res } = httpMocks.createMocks({
        session,
        params: {
          reportId,
        },
        query: {
          facilityIdQuery: facilityIdQueryParam,
        },
        originalUrl,
      });

      const utilisationReportReconciliationDetails: UtilisationReportReconciliationDetailsResponseBody = {
        ...aUtilisationReportReconciliationDetailsResponse(),
        feeRecordPaymentGroups: [
          {
            ...aFeeRecordPaymentGroup(),
            paymentsReceived: null,
            totalPaymentsReceived: null,
          },
          {
            ...aFeeRecordPaymentGroup(),
            paymentsReceived: null,
            totalPaymentsReceived: null,
          },
        ],
      };

      jest.mocked(api.getUtilisationReportReconciliationDetailsById).mockResolvedValue(utilisationReportReconciliationDetails);

      // Act
      await getUtilisationReportReconciliationByReportId(req, res);

      // Assert
      expect(res._getRenderView()).toEqual('utilisation-reports/utilisation-report-reconciliation-for-report.njk');
      const viewModel = res._getRenderData() as UtilisationReportReconciliationForReportViewModel;
      expect(viewModel.facilityIdQueryError).toBeDefined();
      expect(viewModel.facilityIdQueryError?.href).toBe('#facility-id-filter');
      expect(viewModel.facilityIdQueryError?.text).toBe('Facility ID must be a number');
    });
  });
});
