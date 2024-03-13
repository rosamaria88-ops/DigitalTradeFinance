import { Filter } from 'mongodb';
import { MONGO_DB_COLLECTIONS, UTILISATION_REPORT_RECONCILIATION_STATUS, ReportPeriod, UtilisationReport } from '@ukef/dtfs2-common';
import {
  getManyUtilisationReportDetailsByBankId,
  getOneUtilisationReportDetailsByBankId,
  saveNotReceivedUtilisationReport,
  GetUtilisationReportDetailsOptions,
} from './utilisation-reports-repo';
import db from '../../drivers/db-client';
import { MOCK_UTILISATION_REPORT } from '../../../api-tests/mocks/utilisation-reports/utilisation-reports';

describe('utilisation-reports-repo', () => {
  describe('saveNewUtilisationReportAsSystemUser', () => {
    it('maps the data and correctly saves to the database', async () => {
      // Arrange
      const insertOneSpy = jest.fn();
      const getCollectionMock = jest.fn().mockResolvedValue({
        insertOne: insertOneSpy,
      });
      jest.spyOn(db, 'getCollection').mockImplementation(getCollectionMock);

      const mockReportPeriod: ReportPeriod = {
        start: {
          month: 1,
          year: 2021,
        },
        end: {
          month: 1,
          year: 2021,
        },
      };
      const mockSessionBank = {
        id: '123',
        name: 'Test bank',
      };

      // Act
      await saveNotReceivedUtilisationReport(mockReportPeriod, mockSessionBank);

      // Assert
      expect(getCollectionMock).toHaveBeenCalledWith(MONGO_DB_COLLECTIONS.UTILISATION_REPORTS);
      expect(insertOneSpy).toHaveBeenCalledWith({
        bank: mockSessionBank,
        reportPeriod: {
          start: {
            month: 1,
            year: 2021,
          },
          end: {
            month: 1,
            year: 2021,
          },
        },
        azureFileInfo: null,
        status: UTILISATION_REPORT_RECONCILIATION_STATUS.REPORT_NOT_RECEIVED,
      });
    });
  });

  describe('getOneUtilisationReportDetailsByBankId', () => {
    describe('when options are passed in', () => {
      const bankId = '123';
      const bankIdFilter = {
        'bank.id': { $eq: bankId },
      };

      const validReportPeriod: ReportPeriod = {
        start: {
          month: 1,
          year: 2024,
        },
        end: {
          month: 2,
          year: 2025,
        },
      };

      const findOneSpy = jest.fn();
      const getCollectionMock = jest.fn().mockResolvedValue({
        findOne: findOneSpy,
      });

      beforeEach(() => {
        jest.spyOn(db, 'getCollection').mockImplementation(getCollectionMock);
      });

      const optsWithExpectedFilters: {
        condition: string;
        opts: GetUtilisationReportDetailsOptions | undefined;
        expectedFilter: Filter<UtilisationReport>;
      }[] = [
        {
          condition: 'opts is undefined',
          opts: undefined,
          expectedFilter: { ...bankIdFilter },
        },
        {
          condition: 'a report period is passed in',
          opts: { reportPeriod: validReportPeriod },
          expectedFilter: { ...bankIdFilter, reportPeriod: { $eq: validReportPeriod } },
        },
        {
          condition: "an 'excludeNotUploaded' query is passed in",
          opts: { excludeNotUploaded: true },
          expectedFilter: { ...bankIdFilter, status: { $not: { $in: ['REPORT_NOT_RECEIVED'] } }, azureFileInfo: { $not: { $eq: null } } },
        },
        {
          condition: 'all options are defined',
          opts: { reportPeriod: validReportPeriod, excludeNotUploaded: true },
          expectedFilter: {
            ...bankIdFilter,
            reportPeriod: { $eq: validReportPeriod },
            status: { $not: { $in: ['REPORT_NOT_RECEIVED'] } },
            azureFileInfo: { $not: { $eq: null } },
          },
        },
      ];

      it.each(optsWithExpectedFilters)("calls the 'findOne' function with the correct filter when $condition", async ({ opts, expectedFilter }) => {
        // Act
        await getOneUtilisationReportDetailsByBankId(bankId, opts);

        // Assert
        expect(findOneSpy).toHaveBeenCalledWith(expectedFilter);
      });
    });
  });

  describe('getManyUtilisationReportDetailsByBankId', () => {
    const getMockReport = ({ bankId, year, month }: { bankId: string; month: number; year: number }): UtilisationReport => ({
      ...MOCK_UTILISATION_REPORT,
      bank: {
        ...MOCK_UTILISATION_REPORT.bank,
        id: bankId,
      },
      reportPeriod: {
        start: { month, year },
        end: { month, year },
      },
    });

    it('sorts the data by year then month', async () => {
      // Arrange
      const bankId = MOCK_UTILISATION_REPORT.bank.id;
      const report1 = getMockReport({ bankId, month: 2, year: 2022 });
      const report2 = getMockReport({ bankId, month: 3, year: 2021 });
      const report3 = getMockReport({ bankId, month: 1, year: 2022 });
      const report4 = getMockReport({ bankId, month: 2, year: 2021 });

      const mockUtilisationReports = [report1, report2, report3, report4];

      const findSpy = jest.fn().mockReturnValue({
        toArray: async () => Promise.resolve(mockUtilisationReports),
      });
      const getCollectionMock = jest.fn().mockResolvedValue({
        find: findSpy,
      });
      jest.spyOn(db, 'getCollection').mockImplementation(getCollectionMock);

      // Act
      const response = await getManyUtilisationReportDetailsByBankId(bankId);

      // Assert
      const expectedResponse = [report4, report2, report3, report1];
      expect(response).toEqual(expectedResponse);
    });

    describe('when options are passed in', () => {
      const bankId = '123';
      const bankIdFilter = {
        'bank.id': { $eq: bankId },
      };

      const validReportPeriod: ReportPeriod = {
        start: {
          month: 1,
          year: 2024,
        },
        end: {
          month: 2,
          year: 2025,
        },
      };

      const findSpy = jest.fn().mockReturnValue({
        toArray: jest.fn(),
      });
      const getCollectionMock = jest.fn().mockResolvedValue({
        find: findSpy,
      });

      beforeEach(() => {
        jest.spyOn(db, 'getCollection').mockImplementation(getCollectionMock);
      });

      const optsWithExpectedFilters: {
        condition: string;
        opts: GetUtilisationReportDetailsOptions | undefined;
        expectedFilter: Filter<UtilisationReport>;
      }[] = [
        {
          condition: 'opts is undefined',
          opts: undefined,
          expectedFilter: { ...bankIdFilter },
        },
        {
          condition: 'a report period is passed in',
          opts: { reportPeriod: validReportPeriod },
          expectedFilter: { ...bankIdFilter, reportPeriod: { $eq: validReportPeriod } },
        },
        {
          condition: "an 'excludeNotUploaded' query is passed in",
          opts: { excludeNotUploaded: true },
          expectedFilter: { ...bankIdFilter, status: { $not: { $in: ['REPORT_NOT_RECEIVED'] } }, azureFileInfo: { $not: { $eq: null } } },
        },
        {
          condition: 'all options are defined',
          opts: { reportPeriod: validReportPeriod, excludeNotUploaded: true },
          expectedFilter: {
            ...bankIdFilter,
            reportPeriod: { $eq: validReportPeriod },
            status: { $not: { $in: ['REPORT_NOT_RECEIVED'] } },
            azureFileInfo: { $not: { $eq: null } },
          },
        },
      ];

      it.each(optsWithExpectedFilters)("calls the 'find' function with the correct filter when $condition", async ({ opts, expectedFilter }) => {
        // Act
        await getManyUtilisationReportDetailsByBankId(bankId, opts);

        // Assert
        expect(findSpy).toHaveBeenCalledWith(expectedFilter);
      });
    });
  });
});
