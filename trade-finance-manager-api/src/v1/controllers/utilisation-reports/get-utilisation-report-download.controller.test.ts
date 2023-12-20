import httpMocks from 'node-mocks-http';
import events from 'events';
import api from '../../api';
import { getUtilisationReportDownload } from './get-utilisation-report-download.controller';
import fileshare from '../../../drivers/fileshare';
import { FILESHARES } from '../../../constants';

jest.mock('../../api');
jest.mock('../../../drivers/fileshare');

console.error = jest.fn();

describe('get-utilisation-report-download controller', () => {
  describe('getUtilisationReportDownload', () => {
    const mockReportMongoId = '5099803df3f4948bd2f98391';

    const getHttpMocks = () =>
      httpMocks.createMocks(
        {
          params: { _id: mockReportMongoId },
        },
        { eventEmitter: events.EventEmitter },
      );

    it('returns an error response when the report details do not contain the folder', async () => {
      // Arrange
      const { req, res } = getHttpMocks();
      (api.getUtilisationReportById as jest.Mock).mockResolvedValue({});

      // Act
      await getUtilisationReportDownload(req, res);

      // Assert
      expect(console.error).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          message: expect.stringContaining('Failed to get folder') as string,
        }),
      );

      // eslint-disable-next-line no-underscore-dangle
      expect(res._getStatusCode()).toEqual(500);
    });

    it('returns an error response when the reports details do not contain the filename', async () => {
      // Arrange
      const { req, res } = getHttpMocks();
      (api.getUtilisationReportById as jest.Mock).mockResolvedValue({
        azureFileInfo: { folder: '987' },
      });

      // Act
      await getUtilisationReportDownload(req, res);

      // Assert
      expect(console.error).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          message: expect.stringContaining('Failed to get filename') as string,
        }),
      );

      // eslint-disable-next-line no-underscore-dangle
      expect(res._getStatusCode()).toEqual(500);
    });

    it('returns an error response when the reports details do not contain the mimetype', async () => {
      // Arrange
      const { req, res } = getHttpMocks();
      (api.getUtilisationReportById as jest.Mock).mockResolvedValue({
        azureFileInfo: { folder: '987', filename: 'report.csv' },
      });

      // Act
      await getUtilisationReportDownload(req, res);

      // Assert
      expect(console.error).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          message: expect.stringContaining('Failed to get mimetype') as string,
        }),
      );

      // eslint-disable-next-line no-underscore-dangle
      expect(res._getStatusCode()).toEqual(500);
    });

    it('returns an error response when Azure fileshare throws and error', async () => {
      // Arrange
      const { req, res } = getHttpMocks();
      (api.getUtilisationReportById as jest.Mock).mockResolvedValue({
        azureFileInfo: { folder: '987', filename: 'report.csv', mimetype: 'text/csv' },
      });

      const azureError = new Error('Failed to authenticate');
      (fileshare.readFile as jest.Mock).mockRejectedValue(new Error('Failed to authenticate'));

      // Act
      await getUtilisationReportDownload(req, res);

      // Assert
      expect(console.error).toHaveBeenCalledWith(expect.any(String), azureError);

      // eslint-disable-next-line no-underscore-dangle
      expect(res._getStatusCode()).toEqual(500);
    });

    it('returns the expected headers and file content', (done) => {
      // Arrange
      const { req, res } = getHttpMocks();

      const mockFolder = '987';
      const mockFilename = 'report.csv';
      const mockMimetype = 'text/csv';

      (api.getUtilisationReportById as jest.Mock).mockResolvedValue({
        azureFileInfo: { folder: mockFolder, filename: mockFilename, mimetype: mockMimetype },
      });

      const mockFileContent = 'mock file content';
      (fileshare.readFile as jest.Mock).mockResolvedValue(Buffer.from(mockFileContent));

      // Act
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUtilisationReportDownload(req, res);

      // Assert
      res.on('end', () => {
        expect(fileshare.readFile).toHaveBeenCalledWith({
          fileshare: FILESHARES.UTILISATION_REPORTS,
          folder: mockFolder,
          filename: mockFilename,
        });

        /* eslint-disable no-underscore-dangle */
        expect(res._getHeaders()).toEqual({
          'content-disposition': `attachment; filename=${mockFilename}`,
          'content-type': mockMimetype,
        });

        expect(res._getBuffer().toString()).toEqual(mockFileContent);
        /* eslint-enable no-underscore-dangle */

        done();
      });
    });
  });
});
