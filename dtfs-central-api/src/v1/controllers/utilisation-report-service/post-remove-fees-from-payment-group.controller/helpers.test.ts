import { ObjectId } from 'mongodb';
import { EntityManager } from 'typeorm';
import { FeeRecordEntityMockBuilder, UtilisationReportEntityMockBuilder } from '@ukef/dtfs2-common';
import { removeFeesFromPaymentGroup } from './helpers';
import { UtilisationReportStateMachine } from '../../../../services/state-machines/utilisation-report/utilisation-report.state-machine';
import { TfmSessionUser } from '../../../../types/tfm/tfm-session-user';
import { aTfmSessionUser } from '../../../../../test-helpers/test-data/tfm-session-user';
import { executeWithSqlTransaction } from '../../../../helpers';

jest.mock('../../../../helpers');

describe('post-remove-fees-from-payment.controller helpers', () => {
  describe('removeFeesFromPaymentGroup', () => {
    const reportId = 1;

    const tfmUser: TfmSessionUser = {
      ...aTfmSessionUser(),
      _id: new ObjectId().toString(),
    };
    const tfmUserId = tfmUser._id;

    const utilisationReport = UtilisationReportEntityMockBuilder.forStatus('RECONCILIATION_IN_PROGRESS').withId(reportId).build();
    const utilisationReportStateMachine = UtilisationReportStateMachine.forReport(utilisationReport);

    const feeRecordIds = [1, 2];
    const feeRecords = feeRecordIds.map((id) => FeeRecordEntityMockBuilder.forReport(utilisationReport).withId(id).build());

    const utilisationReportStateMachineConstructorSpy = jest.spyOn(UtilisationReportStateMachine, 'forReport');
    const handleEventSpy = jest.spyOn(utilisationReportStateMachine, 'handleEvent');

    const mockEntityManager = {
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as EntityManager;

    beforeEach(() => {
      utilisationReportStateMachineConstructorSpy.mockReturnValue(utilisationReportStateMachine);
      handleEventSpy.mockResolvedValue(utilisationReport);

      jest.mocked(executeWithSqlTransaction).mockImplementation(async (functionToExecute) => {
        await functionToExecute(mockEntityManager);
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('initialises a utilisation report state machine with the supplied report', async () => {
      // Act
      const feeRecordsToRemove = [feeRecords[0]];
      const otherFeeRecordsInGroup = [feeRecords[1]];
      await removeFeesFromPaymentGroup(utilisationReport, feeRecordsToRemove, otherFeeRecordsInGroup, tfmUser);

      // Assert
      expect(utilisationReportStateMachineConstructorSpy).toHaveBeenCalledWith(utilisationReport);
    });

    it('removes the payment fees using the utilisation report state machine', async () => {
      // Act
      const feeRecordsToRemove = feeRecords.slice(0, 1);
      const otherFeeRecordsInGroup = feeRecords.slice(1);
      await removeFeesFromPaymentGroup(utilisationReport, feeRecordsToRemove, otherFeeRecordsInGroup, tfmUser);

      // Assert
      expect(handleEventSpy).toHaveBeenCalledWith({
        type: 'REMOVE_FEES_FROM_PAYMENT_GROUP',
        payload: {
          transactionEntityManager: mockEntityManager,
          feeRecordsToRemove,
          otherFeeRecordsInGroup,
          requestSource: {
            platform: 'TFM',
            userId: tfmUserId,
          },
        },
      });
    });
  });
});
