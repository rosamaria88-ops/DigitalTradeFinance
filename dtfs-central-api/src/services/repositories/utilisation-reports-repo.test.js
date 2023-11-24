const { saveUtilisationReportDetails, getUtilisationReportDetails } = require('./utilisation-reports-repo');
const db = require('../../drivers/db-client');
const { DB_COLLECTIONS } = require('../../constants/dbCollections');

describe('utilisation-reports-repo', () => {
  describe('saveUtilisationReportDetails', () => {
    it('maps the data and correctly saves to the database', async () => {
      const insertOneSpy = jest.fn().mockResolvedValue();
      const getCollectionMock = jest.fn(() => ({
        insertOne: insertOneSpy,
      }));
      jest.spyOn(db, 'getCollection').mockImplementation(getCollectionMock);
      const mockMonth = '1';
      const mockYear = '2021';
      const mockAzureFileInfo = {
        folder: 'test_bank',
        filename: '2021_January_test_bank_utilisation_report.csv',
        fullPath: 'test_bank/2021_January_test_bank_utilisation_report.csv',
        url: 'test.url.csv',
        mimetype: 'text/csv',
      };
      const mockUploadedUser = {
        _id: '123',
        firstname: 'test',
        surname: 'user',
        bank: {
          id: '123',
          name: 'test bank',
        },
      };

      await saveUtilisationReportDetails(mockMonth, mockYear, mockAzureFileInfo, mockUploadedUser);
      expect(getCollectionMock).toHaveBeenCalledWith(DB_COLLECTIONS.UTILISATION_REPORTS);
      expect(insertOneSpy).toHaveBeenCalledWith({
        bank: {
          id: '123',
          name: 'test bank',
        },
        month: 1,
        year: 2021,
        dateUploaded: expect.any(Date),
        azureFileInfo: {
          folder: 'test_bank',
          filename: '2021_January_test_bank_utilisation_report.csv',
          fullPath: 'test_bank/2021_January_test_bank_utilisation_report.csv',
          url: 'test.url.csv',
          mimetype: 'text/csv',
        },
        uploadedBy: {
          id: '123',
          firstname: 'test',
          surname: 'user',
        },
      });
    });
  });

  describe('getUtilisationReportDetails', () => {
    const testUtilisationReport = {
      bank: {
        id: '124',
        name: 'test bank',
      },
      month: 4,
      year: 2021,
      dateUploaded: expect.any(Date),
      azureFileInfo: {
        folder: 'test_bank',
        filename: '2021_April_test_bank_utilisation_report.csv',
        fullPath: 'test_bank/2021_April_test_bank_utilisation_report.csv',
        url: 'test.url.csv',
        mimetype: 'tet/csv',
      },
      uploadedBy: {
        id: '123',
        firstname: 'test',
        surname: 'user',
      },
    };

    it('sorts the data by year then month', async () => {
      const bankId = testUtilisationReport.bank.id;
      const report1 = { ...testUtilisationReport, month: 2, year: 2022 };
      const report2 = { ...testUtilisationReport, month: 3, year: 2021 };
      const report3 = { ...testUtilisationReport, month: 1, year: 2022 };
      const report4 = { ...testUtilisationReport, month: 2, year: 2021 };

      const mockUtilisationReports = [report1, report2, report3, report4];

      jest.spyOn(db, 'getCollection').mockImplementation(() => ({
        find: jest.fn(() => ({
          toArray: jest.fn(() => mockUtilisationReports),
        })),
      }));

      const response = await getUtilisationReportDetails(bankId);

      const expectedResponse = [report4, report2, report3, report1];
      expect(response).toEqual(expectedResponse);
    });
  });
});
