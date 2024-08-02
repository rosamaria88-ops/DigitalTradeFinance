import { isTfmFacilityEndDateFeatureFlagEnabled, TEAM_IDS } from '@ukef/dtfs2-common';
import { add } from 'date-fns';
import api from '../../../api';
import { mockRes } from '../../../test-mocks';
import { MOCK_AMENDMENT_COVERENDDATE_CHANGE, MOCK_AMENDMENT_COVERENDDATE_CHANGE_USING_FACILITY_ENDDATE } from '../../../test-mocks/amendment-test-mocks';
import { postAmendmentFacilityEndDate } from './amendmentFacilityEndDate.controller';

const res = mockRes();

api.getAmendmentById = jest.fn();
api.updateAmendment = jest.fn();
api.getFacility = jest.fn();

const user = {
  _id: '12345678',
  username: 'testUser',
  firstName: 'Joe',
  lastName: 'Bloggs',
  teams: [TEAM_IDS.PIM],
  email: 'test@localhost',
};

const session = { user, userToken: 'mockToken' };

const { dealId, facilityId, amendmentId } = MOCK_AMENDMENT_COVERENDDATE_CHANGE;

jest.mock('@ukef/dtfs2-common', () => ({
  ...jest.requireActual('@ukef/dtfs2-common'),
  isTfmFacilityEndDateFeatureFlagEnabled: jest.fn(),
}));

describe('amendmentFacilityEndDate routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('POST postAmendmentFacilityEndDate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.mocked(isTfmFacilityEndDateFeatureFlagEnabled).mockReturnValue(true);
    });

    it('should render the template with errors if the entered facility end date is before the cover start date', async () => {
      const mockFacility = { facilitySnapshot: { dates: { coverStartDate: new Date(2024, 11, 11).valueOf().toString() } } };

      api.getAmendmentById.mockResolvedValueOnce({ status: 200, data: MOCK_AMENDMENT_COVERENDDATE_CHANGE_USING_FACILITY_ENDDATE });
      api.updateAmendment.mockResolvedValueOnce({ status: 200 });
      api.getFacility.mockResolvedValueOnce(mockFacility);

      const req = {
        params: {
          _id: dealId,
          amendmentId,
          facilityId,
        },
        body: {
          'facility-end-date-day': '12',
          'facility-end-date-month': '11',
          'facility-end-date-year': '2024',
        },
        session,
      };

      await postAmendmentFacilityEndDate(req, res);
      expect(res.render).toHaveBeenCalledWith('case/amendments/amendment-facility-end-date.njk', {
        dealId,
        isEditable: true,
        facilityId,
        facilityEndDateDay: '12',
        facilityEndDateMonth: '11',
        facilityEndDateYear: '2024',
        error: {
          summary: [
            {
              text: 'The facility end date cannot be before the cover start date',
            },
          ],
          fields: ['facility-end-date-day', 'facility-end-date-month', 'facility-end-date-year'],
        },
        user: req.session.user,
      });
    });

    it('should render the template with errors if the entered facility end date is greater than 6 years in the future', async () => {
      const mockFacility = { facilitySnapshot: { dates: { coverStartDate: new Date(2021, 11, 11).valueOf().toString() } } };

      api.getAmendmentById.mockResolvedValueOnce({ status: 200, data: MOCK_AMENDMENT_COVERENDDATE_CHANGE_USING_FACILITY_ENDDATE });
      api.updateAmendment.mockResolvedValueOnce({ status: 200 });
      api.getFacility.mockResolvedValueOnce(mockFacility);

      const now = new Date();
      const sixYearsFromNowPlusDay = add(now, { years: 6, days: 1 });

      const req = {
        params: {
          _id: dealId,
          amendmentId,
          facilityId,
        },
        body: {
          'facility-end-date-day': sixYearsFromNowPlusDay.getDate().toString(),
          'facility-end-date-month': (sixYearsFromNowPlusDay.getMonth() + 1).toString(),
          'facility-end-date-year': sixYearsFromNowPlusDay.getFullYear().toString(),
        },
        session,
      };

      await postAmendmentFacilityEndDate(req, res);
      expect(res.render).toHaveBeenCalledWith('case/amendments/amendment-facility-end-date.njk', {
        dealId,
        isEditable: true,
        facilityId,
        facilityEndDateDay: sixYearsFromNowPlusDay.getDate().toString(),
        facilityEndDateMonth: (sixYearsFromNowPlusDay.getMonth() + 1).toString(),
        facilityEndDateYear: sixYearsFromNowPlusDay.getFullYear().toString(),
        error: {
          summary: [
            {
              text: 'Facility end date cannot be greater than 6 years in the future',
            },
          ],
          fields: ['facility-end-date-day', 'facility-end-date-month', 'facility-end-date-year'],
        },
        user: req.session.user,
      });
    });

    it('should redirect to the check answers page when only the cover end date is being amended and there are no errors', async () => {
      const mockFacility = { facilitySnapshot: { dates: { coverStartDate: new Date(2024, 1, 1).valueOf().toString() } } };

      api.getAmendmentById.mockResolvedValueOnce({ status: 200, data: MOCK_AMENDMENT_COVERENDDATE_CHANGE_USING_FACILITY_ENDDATE });
      api.updateAmendment.mockResolvedValueOnce({ status: 200 });
      api.getFacility.mockResolvedValueOnce(mockFacility);

      const req = {
        params: {
          _id: dealId,
          amendmentId,
          facilityId,
        },
        body: {
          'facility-end-date-day': '12',
          'facility-end-date-month': '11',
          'facility-end-date-year': '2025',
        },
        session,
      };

      await postAmendmentFacilityEndDate(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`/case/${dealId}/facility/${facilityId}/amendment/${amendmentId}/check-answers`);
    });

    it('should redirect to the update facility value page when the facility value also needs amending and there are no errors', async () => {
      const mockFacility = { facilitySnapshot: { dates: { coverStartDate: new Date(2024, 1, 1).valueOf().toString() } } };

      api.getAmendmentById.mockResolvedValueOnce({
        status: 200,
        data: { ...MOCK_AMENDMENT_COVERENDDATE_CHANGE_USING_FACILITY_ENDDATE, changeFacilityValue: true },
      });
      api.updateAmendment.mockResolvedValueOnce({ status: 200 });
      api.getFacility.mockResolvedValueOnce(mockFacility);

      const req = {
        params: {
          _id: dealId,
          amendmentId,
          facilityId,
        },
        body: {
          'facility-end-date-day': '12',
          'facility-end-date-month': '11',
          'facility-end-date-year': '2025',
        },
        session,
      };

      await postAmendmentFacilityEndDate(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`/case/${dealId}/facility/${facilityId}/amendment/${amendmentId}/facility-value`);
    });

    it("should redirect to the amendments summary page if there's an error updating the amendment", async () => {
      const mockFacility = { facilitySnapshot: { dates: { coverStartDate: new Date(2024, 1, 1).valueOf().toString() } } };

      api.getAmendmentById.mockResolvedValueOnce({
        status: 200,
        data: { ...MOCK_AMENDMENT_COVERENDDATE_CHANGE_USING_FACILITY_ENDDATE, changeFacilityValue: true },
      });
      api.updateAmendment.mockResolvedValueOnce({ status: 400 });
      api.getFacility.mockResolvedValueOnce(mockFacility);

      const req = {
        params: {
          _id: dealId,
          amendmentId,
          facilityId,
        },
        body: {
          'facility-end-date-day': '12',
          'facility-end-date-month': '11',
          'facility-end-date-year': '2025',
        },
        session,
      };

      await postAmendmentFacilityEndDate(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`/case/${dealId}/facility/${facilityId}#amendments`);
    });
  });
});
