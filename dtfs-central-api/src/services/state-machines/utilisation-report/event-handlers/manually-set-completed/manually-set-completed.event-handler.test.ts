import { EntityManager } from 'typeorm';
import {
  DbRequestSource,
  RECONCILIATION_COMPLETED,
  REPORT_NOT_RECEIVED,
  REQUEST_PLATFORM_TYPE,
  UtilisationReportEntity,
  UtilisationReportEntityMockBuilder,
} from '@ukef/dtfs2-common';
import { handleUtilisationReportManuallySetCompletedEvent } from './manually-set-completed.event-handler';

describe('handleUtilisationReportManuallySetCompletedEvent', () => {
  const requestSource: DbRequestSource = {
    platform: REQUEST_PLATFORM_TYPE.TFM,
    userId: 'abc123',
  };

  const mockSave = jest.fn();

  it('updates the report to a completed state and saves the report', async () => {
    // Arrange
    const mockEntityManager = {
      save: mockSave,
    } as unknown as EntityManager;

    const report = UtilisationReportEntityMockBuilder.forStatus(REPORT_NOT_RECEIVED).build();

    // Act
    await handleUtilisationReportManuallySetCompletedEvent(report, {
      requestSource,
      transactionEntityManager: mockEntityManager,
    });

    // Assert
    expect(mockSave).toHaveBeenCalledWith(UtilisationReportEntity, report);
    expect(report.status).toEqual(RECONCILIATION_COMPLETED);
    expect(report.lastUpdatedByIsSystemUser).toEqual(false);
    expect(report.lastUpdatedByPortalUserId).toBeNull();
    expect(report.lastUpdatedByTfmUserId).toEqual(requestSource.userId);
  });
});
