import { createUtilisationReportForBanksJob } from '.';
import { getAllBanks } from '../../../services/repositories/banks-repo';
import * as utilisationReportsRepo from '../../../services/repositories/utilisation-reports-repo';
import { getCurrentReportPeriodForBankSchedule } from '../../../utils/report-period';
import { Bank } from '../../../types/db-models/banks';
import { UtilisationReport } from '../../../types/db-models/utilisation-reports';
import { ReportPeriod } from '../../../types/utilisation-reports';

console.info = jest.fn();

jest.mock('../../../services/repositories/banks-repo');
jest.mock('../../../services/repositories/utilisation-reports-repo');
jest.mock('../../../utils/report-period');

const originalProcessEnv = process.env;

describe('scheduler/jobs/create-utilisation-reports', () => {
  const scheduleEnvVariableName = 'UTILISATION_REPORT_CREATION_FOR_BANKS_SCHEDULE';
  const testSchedule = '* * * * *';

  beforeEach(() => {
    process.env[scheduleEnvVariableName] = testSchedule;
  });

  afterEach(() => {
    process.env = { ...originalProcessEnv };
  });

  it(`throws an error when the '${scheduleEnvVariableName}' environment variable is undefined`, () => {
    // Arrange
    process.env = {};

    // Act/Assert
    expect(() => createUtilisationReportForBanksJob.init()).toThrow();
  });

  it('has the correct job schedule', () => {
    // Act
    const job = createUtilisationReportForBanksJob.init();

    // Assert
    expect(job.schedule).toEqual(testSchedule);
  });

  it('has the correct job message', () => {
    // Act
    const job = createUtilisationReportForBanksJob.init();

    // Assert
    expect(job.message).toEqual('Create utilisation reports in the database for banks which have a report due');
  });

  describe('the task', () => {
    const getJob = () => createUtilisationReportForBanksJob.init();
    
    const mockReportPeriod = {} as ReportPeriod;

    beforeEach(() => {
      jest.mocked(getCurrentReportPeriodForBankSchedule).mockReturnValue(mockReportPeriod);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('does not try to create any utilisation reports when there are no banks', async () => {
      // Arrange
      const job = getJob();
      jest.mocked(getAllBanks).mockResolvedValue([]);
      const saveUtilisationReportDetailsSpy = jest.spyOn(utilisationReportsRepo, 'saveUtilisationReportDetails');

      // Act
      await job.task(new Date());

      // Assert
      expect(saveUtilisationReportDetailsSpy).not.toHaveBeenCalled();
    });

    it('does not try to create any utilisation reports when reports for all banks in the current period already exist', async () => {
      // Arrange
      const job = getJob();
      const bank = { id: '123', name: 'Test bank' } as Bank;
      jest.mocked(getAllBanks).mockResolvedValue([bank]);
      const getCurrentUtilisationReportByBankIdAndReportPeriodSpy = jest
        .mocked(utilisationReportsRepo.getCurrentUtilisationReportByBankIdAndReportPeriod)
        .mockResolvedValue({} as UtilisationReport);
      const saveNotReceivedUtilisationReportSpy = jest.spyOn(utilisationReportsRepo, 'saveNotReceivedUtilisationReport');

      // Act
      await job.task(new Date());

      // Assert
      expect(getCurrentUtilisationReportByBankIdAndReportPeriodSpy).toHaveBeenCalledWith(bank.id, mockReportPeriod);
      expect(saveNotReceivedUtilisationReportSpy).not.toHaveBeenCalled();
    });

    const banks = [
      { id: '1', name: 'Bank 1' },
      { id: '2', name: 'Bank 2' },
      { id: '3', name: 'Bank 3' },
    ] as Bank[];

    it('tries to create utilisation reports for all banks when reports for all banks in the current period do not exist', async () => {
      // Arrange
      const job = getJob();
      jest.mocked(getAllBanks).mockResolvedValue(banks);
      const getCurrentUtilisationReportByBankIdAndReportPeriodSpy = jest
        .mocked(utilisationReportsRepo.getCurrentUtilisationReportByBankIdAndReportPeriod)
        .mockResolvedValue(null);
      const saveNotReceivedUtilisationReportSpy = jest.spyOn(utilisationReportsRepo, 'saveNotReceivedUtilisationReport');

      // Act
      await job.task(new Date());

      // Assert
      expect(getCurrentUtilisationReportByBankIdAndReportPeriodSpy).toHaveBeenCalledTimes(banks.length);
      banks.forEach(({ id }) => expect(getCurrentUtilisationReportByBankIdAndReportPeriodSpy).toHaveBeenCalledWith(id, mockReportPeriod));
      expect(saveNotReceivedUtilisationReportSpy).toHaveBeenCalledTimes(banks.length);
      banks.forEach((bank) => expect(saveNotReceivedUtilisationReportSpy).toHaveBeenCalledWith(mockReportPeriod, bank));
    });

    it('only tries to create reports for banks which do not have a report for the current report period', async () => {
      // Arrange
      const job = getJob();
      jest.mocked(getAllBanks).mockResolvedValue(banks);
      const getCurrentUtilisationReportByBankIdAndReportPeriodSpy = jest
        .mocked(utilisationReportsRepo.getCurrentUtilisationReportByBankIdAndReportPeriod)
        .mockImplementation((bankId: string) => {
          switch (bankId) {
            case '1':
              return Promise.resolve(null);
            default:
              return Promise.resolve({} as UtilisationReport);
          }
        });
      const saveNotReceivedUtilisationReportSpy = jest.spyOn(utilisationReportsRepo, 'saveNotReceivedUtilisationReport');

      // Act
      await job.task(new Date());

      // Assert
      expect(getCurrentUtilisationReportByBankIdAndReportPeriodSpy).toHaveBeenCalledTimes(banks.length);
      banks.forEach(({ id }) => expect(getCurrentUtilisationReportByBankIdAndReportPeriodSpy).toHaveBeenCalledWith(id, mockReportPeriod));
      expect(saveNotReceivedUtilisationReportSpy).toHaveBeenCalledTimes(1);
      expect(saveNotReceivedUtilisationReportSpy).toHaveBeenCalledWith(mockReportPeriod, banks.find((bank) => bank.id === '1'));
    });
  });
});
