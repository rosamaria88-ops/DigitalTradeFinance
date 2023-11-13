const { produce } = require('immer');
const sendReportingPeriodStartEmailsJob = require('./index');
const api = require('../../../v1/api');
const externalApi = require('../../../external-api/bank-holidays');
const sendEmail = require('../../../external-api/send-email');
const BANKS = require('../../../../test-helpers/mock-banks');
const { EMAIL_TEMPLATE_IDS } = require('../../../constants');

jest.mock('../../../v1/api');
jest.mock('../../../external-api/bank-holidays');
jest.mock('../../../external-api/send-email', () => jest.fn());

console.error = jest.fn();
console.warn = jest.fn();
console.info = jest.fn();

const sendReportingPeriodStartEmailsTask = sendReportingPeriodStartEmailsJob.init().task;

describe('sendReportingPeriodStartEmailsJob', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('does not send an email when the bank has no payment officer team email', async () => {
    // Arrange
    const bankWithoutPaymentOfficerTeam = produce(BANKS.HSBC, (draftBank) => {
      delete draftBank.paymentOfficerTeam.email;
    });

    api.getAllBanks.mockResolvedValue([bankWithoutPaymentOfficerTeam]);
    externalApi.getBankHolidayDatesForRegion.mockResolvedValue([]);

    // Act
    await sendReportingPeriodStartEmailsTask();

    // Assert
    expect(sendEmail).not.toHaveBeenCalled();
    expect(console.warn.mock.calls).toContainEqual([expect.stringContaining('no payment officer team email set')]);
  });

  it('does not send an email when the bank has an invalid payment officer team email', async () => {
    // Arrange
    const invalidEmail = 'invalid-email';
    const bankWithInvalidPaymentOfficerTeamEmail = produce(BANKS.HSBC, (draftBank) => {
      draftBank.paymentOfficerTeam.email = invalidEmail;
    });

    api.getAllBanks.mockResolvedValue([bankWithInvalidPaymentOfficerTeamEmail]);
    externalApi.getBankHolidayDatesForRegion.mockResolvedValue([]);

    // Act
    await sendReportingPeriodStartEmailsTask();

    // Assert
    expect(sendEmail).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining(`invalid payment officer team email '${invalidEmail}'`));
  });

  it('sends emails to all banks when valid payment officer team emails are set', async () => {
    // Arrange
    jest.useFakeTimers().setSystemTime(new Date('2023-11-01'));

    const validBarclaysEmail = 'valid-barclays-email@example.com';
    const validBarclaysBank = produce(BANKS.BARCLAYS, (draftBank) => {
      draftBank.paymentOfficerTeam.email = validBarclaysEmail;
    });

    const validHsbcEmail = 'valid-hsbc-email@example.com';
    const validHsbcBank = produce(BANKS.HSBC, (draftBank) => {
      draftBank.paymentOfficerTeam.email = validHsbcEmail;
    });

    api.getAllBanks.mockResolvedValue([validBarclaysBank, validHsbcBank]);
    externalApi.getBankHolidayDatesForRegion.mockResolvedValue([]);

    // Act
    await sendReportingPeriodStartEmailsTask();

    // Assert
    const expectedEmailTemplate = EMAIL_TEMPLATE_IDS.UTILISATION_REPORT_PERIOD_START;
    const expectedReportPeriod = 'October 2023';
    const expectedReportDueDate = '15th November 2023';

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
