const { produce } = require('immer');
const sendReportSubmissionPeriodStartEmailsJob = require('.');
const api = require('../../../v1/api');
const externalApi = require('../../../external-api/api');
const sendEmail = require('../../../external-api/send-email');
const MOCK_BANKS = require('../../../../test-helpers/mock-banks');
const { EMAIL_TEMPLATE_IDS } = require('../../../constants');

jest.mock('../../../v1/api');
jest.mock('../../../external-api/bank-holidays');
jest.mock('../../../external-api/send-email', () => jest.fn());

console.error = jest.fn();
console.warn = jest.fn();
console.info = jest.fn();

const sendReportSubmissionPeriodStartEmailsTask = sendReportSubmissionPeriodStartEmailsJob.init().task;

describe('sendReportSubmissionPeriodStartEmailsJob', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  it('sends emails to all banks when valid payment officer team emails are set', async () => {
    // Arrange
    jest.useFakeTimers().setSystemTime(new Date('2023-11-01'));

    const validBarclaysEmail = 'valid-barclays-email@example.com';
    const validBarclaysBank = produce(MOCK_BANKS.BARCLAYS, (draftBank) => {
      draftBank.paymentOfficerTeam.email = validBarclaysEmail;
    });

    const validHsbcEmail = 'valid-hsbc-email@example.com';
    const validHsbcBank = produce(MOCK_BANKS.HSBC, (draftBank) => {
      draftBank.paymentOfficerTeam.email = validHsbcEmail;
    });

    api.getAllBanks.mockResolvedValue([validBarclaysBank, validHsbcBank]);
    api.getUtilisationReports.mockResolvedValue([]);
    externalApi.bankHolidays.getBankHolidayDatesForRegion.mockResolvedValue([]);

    // Act
    await sendReportSubmissionPeriodStartEmailsTask();

    // Assert
    const expectedEmailTemplate = EMAIL_TEMPLATE_IDS.UTILISATION_REPORT_SUBMISSION_PERIOD_START;
    const expectedReportPeriod = 'October 2023';
    const expectedReportDueDate = '15 November 2023';

    expect(sendEmail).toHaveBeenCalledTimes(2);
    expect(sendEmail).toHaveBeenCalledWith(expectedEmailTemplate, validBarclaysEmail, {
      recipient: validBarclaysBank.paymentOfficerTeam.teamName,
      reportPeriod: expectedReportPeriod,
      reportDueDate: expectedReportDueDate,
    });
    expect(sendEmail).toHaveBeenCalledWith(expectedEmailTemplate, validHsbcEmail, {
      recipient: validHsbcBank.paymentOfficerTeam.teamName,
      reportPeriod: expectedReportPeriod,
      reportDueDate: expectedReportDueDate,
    });
  });
});
