import httpMocks from 'node-mocks-http';
import { GetUtilisationReportsRequest, getUtilisationReports } from './index';
import { getManyUtilisationReportDetailsByBankId } from '../../../../services/repositories/utilisation-reports-repo';
import { UtilisationReport } from '../../../../types/db-models/utilisation-reports';
import { ReportPeriod } from '../../../../types/utilisation-reports';

jest.mock('../../../../services/repositories/utilisation-reports-repo');

console.error = jest.fn();

describe('getUtilisationReports', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const bankId = '123';
  const getHttpMocks = (queryOpts?: Partial<GetUtilisationReportsRequest['query']>) =>
    httpMocks.createMocks<GetUtilisationReportsRequest>({
      params: { bankId },
      query: {
        reportPeriod: queryOpts?.reportPeriod ?? undefined,
        excludeNotUploaded: queryOpts?.excludeNotUploaded ?? false,
      },
    });

  const getReportPeriodJsonObject = (reportPeriod: ReportPeriod) => ({
    start: {
      month: reportPeriod.start.month.toString(),
      year: reportPeriod.start.year.toString(),
    },
    end: {
      month: reportPeriod.end.month.toString(),
      year: reportPeriod.end.year.toString(),
    },
  });

  it('returns a 500 response if any errors are thrown', async () => {
    // Arrange
    const { req, res } = getHttpMocks();

    jest.mocked(getManyUtilisationReportDetailsByBankId).mockRejectedValue(new Error());

    // Act
    await getUtilisationReports(req, res);

    // Assert
    expect(res.statusCode).toEqual(500);
  });

  it('calls the repo method with the correct filter when no queries are defined', async () => {
    // Arrange
    const { req, res } = getHttpMocks();

    const mockUtilisationReports: UtilisationReport[] = [];
    jest.mocked(getManyUtilisationReportDetailsByBankId).mockResolvedValue(mockUtilisationReports);

    // Act
    await getUtilisationReports(req, res);

    // Assert
    expect(getManyUtilisationReportDetailsByBankId).toHaveBeenCalledWith(bankId, {
      reportPeriod: undefined,
      excludeNotUploaded: false,
    });

    expect(res.statusCode).toEqual(200);
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toEqual(mockUtilisationReports);
  });

  it('calls the repo method with the correct values and sends a 200 when a report period query is defined', async () => {
    // Arrange
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

    const mockUtilisationReports: UtilisationReport[] = [];
    jest.mocked(getManyUtilisationReportDetailsByBankId).mockResolvedValue(mockUtilisationReports);

    const { req, res } = getHttpMocks({ reportPeriod: getReportPeriodJsonObject(validReportPeriod) });

    // Act
    await getUtilisationReports(req, res);

    // Assert
    expect(getManyUtilisationReportDetailsByBankId).toHaveBeenCalledWith(bankId, {
      reportPeriod: validReportPeriod,
      excludeNotUploaded: false,
    });

    expect(res.statusCode).toEqual(200);
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toEqual(mockUtilisationReports);
  });

  it("calls the repo method with the correct values and sends a 200 when the 'excludeNotUploaded' query is defined", async () => {
    // Arrange
    const excludeNotUploaded = 'true';

    const mockUtilisationReports: UtilisationReport[] = [];
    jest.mocked(getManyUtilisationReportDetailsByBankId).mockResolvedValue(mockUtilisationReports);

    const { req, res } = getHttpMocks({ excludeNotUploaded });

    // Act
    await getUtilisationReports(req, res);

    // Assert
    expect(getManyUtilisationReportDetailsByBankId).toHaveBeenCalledWith(bankId, {
      excludeNotUploaded: true,
      reportPeriod: undefined,
    });

    expect(res.statusCode).toEqual(200);
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toEqual(mockUtilisationReports);
  });

  it('calls the repo method with the correct values and sends a 200 when all possible queries are defined', async () => {
    // Arrange
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

    const excludeNotUploaded = 'true';

    const mockUtilisationReports: UtilisationReport[] = [];
    jest.mocked(getManyUtilisationReportDetailsByBankId).mockResolvedValue(mockUtilisationReports);

    const { req, res } = getHttpMocks({ reportPeriod: getReportPeriodJsonObject(validReportPeriod), excludeNotUploaded });

    // Act
    await getUtilisationReports(req, res);

    // Assert
    expect(getManyUtilisationReportDetailsByBankId).toHaveBeenCalledWith(bankId, {
      reportPeriod: validReportPeriod,
      excludeNotUploaded: true,
    });

    expect(res.statusCode).toEqual(200);
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toEqual(mockUtilisationReports);
  });
});
