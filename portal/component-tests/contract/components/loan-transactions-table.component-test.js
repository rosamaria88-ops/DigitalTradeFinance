import moment from 'moment';

const componentRenderer = require('../../componentRenderer');

const component = 'contract/components/loan-transactions-table.njk';
const render = componentRenderer(component);

describe(component, () => {
  const user = { roles: ['maker'], timezone: 'Europe/London' };

  const deal = {
    details: {
      submissionType: 'Manual Inclusion Application',
    },
    loanTransactions: {
      items: [
        {
          _id: '1',
          ukefFacilityID: '5678',
          status: 'Incomplete',
          facilityValue: '100',
          currency: { id: 'GBP' },
          facilityStage: 'Conditional',
          requestedCoverStartDate: moment().utc().valueOf(),
        },
        {
          _id: '2',
          ukefFacilityID: '5678',
          status: 'Incomplete',
          facilityValue: '100',
          currency: { id: 'GBP' },
          facilityStage: 'Conditional',
          requestedCoverStartDate: moment().utc().valueOf(),
        },
      ],
    },
  };

  describe('table headings', () => {
    it('should be rendered', () => {
      const wrapper = render({ user, deal, confirmedRequestedCoverStartDates: [] });

      wrapper.expectText('[data-cy="loans-table-header-bank-reference-number"]').toRead('Bank reference number');
      wrapper.expectText('[data-cy="loans-table-header-ukef-facility-id"]').toRead('UKEF facility ID');
      wrapper.expectText('[data-cy="loans-table-header-status"]').toRead('Status');
      wrapper.expectText('[data-cy="loans-table-header-value"]').toRead('Value');
      wrapper.expectText('[data-cy="loans-table-header-stage"]').toRead('Stage');
      wrapper.expectText('[data-cy="loans-table-header-start-date"]').toRead('Start date');
      wrapper.expectText('[data-cy="loans-table-header-end-date"]').toRead('End date');
      wrapper.expectText('[data-cy="loans-table-header-action"]').toRead('Action');
    });
  });

  describe('table rows', () => {
    it('should render columns/elements/text for each loan', () => {
      const wrapper = render({ user, deal, confirmedRequestedCoverStartDates: [] });

      deal.loanTransactions.items.forEach((facility) => {
        const facilityIdSelector = `[data-cy="loan-${facility._id}"]`;

        wrapper.expectElement(`${facilityIdSelector} [data-cy="loan-bank-reference-number-link-${facility._id}"]`).toExist();

        wrapper.expectText(`${facilityIdSelector} [data-cy="loan-ukef-facility-id-${facility._id}"]`).toRead(facility.ukefFacilityID);

        wrapper.expectText(`${facilityIdSelector} [data-cy="loan-status-${facility._id}"] [data-cy="status-tag"]`).toRead(facility.status);

        wrapper.expectText(`${facilityIdSelector} [data-cy="loan-facility-value"]`).toRead(`${facility.currency.id} ${facility.facilityValue}`);

        wrapper.expectText(`${facilityIdSelector} [data-cy="loan-facility-stage-${facility._id}"]`).toRead(facility.facilityStage);

        // todo assert date values
        // split into new component?
        wrapper.expectElement(`${facilityIdSelector} [data-cy="loan-requested-cover-start-date"]`).toExist();

        wrapper.expectElement(`${facilityIdSelector} [data-cy="loan-cover-end-date"]`).toExist();

        wrapper.expectElement(`${facilityIdSelector} [data-cy="loan-issue-facility-${facility._id}"]`).toExist();
      });
    });

    describe('when a loan Cover Date can be modified', () => {
      it('should render `change start date` link and NOT `issue facility link', () => {
        const dealWithloansThatCanChangeCoverDate = deal;
        dealWithloansThatCanChangeCoverDate.details.status = 'Acknowledged by UKEF';
        dealWithloansThatCanChangeCoverDate.loanTransactions.items[0].facilityStage = 'Unconditional';
        dealWithloansThatCanChangeCoverDate.loanTransactions.items[1].facilityStage = 'Unconditional';

        const wrapper = render({
          user,
          deal: dealWithloansThatCanChangeCoverDate,
          confirmedRequestedCoverStartDates: [],
        });

        deal.loanTransactions.items.forEach((facility) => {
          const facilityIdSelector = `[data-cy="loan-${facility._id}"]`;

          wrapper.expectElement(`${facilityIdSelector} [data-cy="loan-change-or-confirm-cover-start-date-${facility._id}"]`).toExist();

          wrapper.expectElement(`${facilityIdSelector} [data-cy="loan-issue-facility-${facility._id}"]`).notToExist();
        });
      });
    });
  });
});
