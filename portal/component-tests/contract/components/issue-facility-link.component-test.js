const componentRenderer = require('../../componentRenderer');

const component = 'contract/components/issue-facility-link.njk';
const render = componentRenderer(component);

describe(component, () => {
  const mockDeals = [
    {
      _id: 1,
      details: {
        status: 'Acknowledged by UKEF',
        submissionType: 'Automatic Inclusion Notice',
      },
    },
    {
      _id: 2,
      details: {
        status: 'Ready for Checker\'s approval',
        submissionType: 'Manual Inclusion Notice',
      },
    },
    {
      _id: 3,
      details: {
        status: 'Accepted by UKEF (with conditions)',
        submissionType: 'Automatic Inclusion Notice',
      },
    },
    {
      _id: 4,
      details: {
        status: 'Accepted by UKEF (without conditions)',
        submissionType: 'Manual Inclusion Notice',
      },
    },
    {
      _id: 5,
      details: {
        status: 'Further Maker\'s input required',
        submissionType: 'Manual Inclusion Notice',
      },
    },
    {
      _id: 6,
      details: {
        status: 'Further Maker\'s input required',
        submissionType: 'Manual Inclusion Application',
      },
    },
    {
      _id: 7,
      details: {
        status: 'Accepted by UKEF (with conditions)',
        submissionType: 'Manual Inclusion Application',
      },
    },
    {
      _id: 8,
      details: {
        status: 'Accepted by UKEF (without conditions)',
        submissionType: 'Manual Inclusion Application',
      },
    },
  ];

  describe('when deal status and submission type allows the issue facility', () => {
    const facilityName = 'loan';
    const deals = mockDeals;

    describe('when viewed by checker and facility.issueFacilityDetailsProvided', () => {
      it('should render a link to the facility on submision-details page', () => {
        const user = { roles: ['checker'] };
        const facility = {
          _id: '1234',
          facilityStage: 'Conditional',
          issueFacilityDetailsProvided: true,
        };

        for (const deal of deals) {
          const wrapper = render({ user, deal, facility, facilityName });
          wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
            .toLinkTo(`/contract/${deal._id}/submission-details#${facilityName}-${facility._id}`, 'Facility issued');
        }
      });
    });

    describe('when viewed by `maker and checker` role and facility.issueFacilityDetailsProvided', () => {
      it('should render link to issue facility page', () => {
        const user = { roles: ['checker', 'maker'] };
        const facility = {
          _id: '1234',
          facilityStage: 'Conditional',
          issueFacilityDetailsProvided: true,
        };

        for (const deal of deals) {
          const wrapper = render({ user, deal, facility, facilityName });
          wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
            .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/issue-facility`, 'Issue facility');
        }
      });
    });

    describe('when viewed by maker', () => {
      const user = { roles: ['maker'] };

      describe('when facility.issueFacilityDetailsSubmitted is false and issueFacilityDetailsProvided, issueFacilityDetailsStarted is true', () => {
        it('should render link to issue facility page', () => {
          const facility = {
            _id: '1234',
            facilityStage: 'Conditional',
            issueFacilityDetailsSubmitted: false,
            issueFacilityDetailsProvided: true,
            issueFacilityDetailsStarted: true,
          };

          for (const deal of deals) {
            const wrapper = render({ user, deal, facility, facilityName });
            wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
              .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/issue-facility`, 'Facility issued');
          }
        });
      });

      describe('when facility.issueFacilityDetailsSubmitted and issueFacilityDetailsStarted is false', () => {
        it('should render link to issue facility page with `Issue facility` text', () => {
          const facility = {
            _id: '1234',
            facilityStage: 'Conditional',
            issueFacilityDetailsSubmitted: false,
            issueFacilityDetailsStarted: false,
          };

          for (const deal of deals) {
            const wrapper = render({ user, deal, facility, facilityName });
            wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
              .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/issue-facility`, 'Issue facility');
          }
        });
      });

      describe('when facility.issueFacilityDetailsSubmitted and facility.status is `Ready for check`', () => {
        const facility = {
          _id: '1234',
          facilityStage: 'Conditional',
          issueFacilityDetailsSubmitted: true,
          issueFacilityDetailsProvided: true,
          status: 'Ready for check',
        };

        it('should render link to facility preview page', () => {
          for (const deal of deals) {
            const wrapper = render({ user, deal, facility, facilityName });
            wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
              .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/preview`, 'Issue facility');
          }
        });

        describe('when facility.issueFacilityDetailsStarted is true', () => {
          it('should render link to facility preview page with `Issue facility`', () => {
            facility.issueFacilityDetailsStarted = true;
            for (const deal of deals) {
              const wrapper = render({ user, deal, facility, facilityName });
              wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
                .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/preview`, 'Facility issued');
            }
          });
        });
      });

      describe('when facility.issueFacilityDetailsSubmitted and deal.status is `Ready for Checker\'s approval`', () => {
        const facility = {
          _id: '1234',
          facilityStage: 'Conditional',
          issueFacilityDetailsSubmitted: true,
          issueFacilityDetailsProvided: true,
        };

        const deal = {
          _id: 1,
          details: {
            status: 'Ready for Checker\'s approval',
            submissionType: 'Automatic Inclusion Notice',
          },
        };

        it('should render link to facility preview page', () => {
          const wrapper = render({ user, deal, facility, facilityName });
          wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
            .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/preview`, 'Issue facility');
        });

        describe('when facility.issueFacilityDetailsStarted is true', () => {
          it('should render link to facility preview page with `Issue facility`', () => {
            facility.issueFacilityDetailsStarted = true;

            const wrapper = render({ user, deal, facility, facilityName });
            wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
              .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/preview`, 'Facility issued');
          });
        });
      });
    });
  });

  // DTFS2-1868: additional checks that may or may not be covered in the above tests.
  describe('when the deal status is `Ready for Checker\'s approval`, facility status is `Ready for check` and issuance details started & provided', () => {
    it('should render a link to facility preview page', () => {
      const user = { roles: ['maker'] };
      const facilityName = 'loan';
      const facility = {
        _id: '1234',
        facilityStage: 'Conditional',
        status: 'Ready for check',
        issueFacilityDetailsProvided: true,
        issueFacilityDetailsStarted: true,
      };

      const deal = {
        _id: 1,
        details: {
          status: 'Ready for Checker\'s approval',
          submissionType: 'Automatic Inclusion Notice',
        },
      };

      const wrapper = render({ user, deal, facility, facilityName });
      wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
        .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/preview`, 'Facility issued');
    });
  });

  describe('when the deal status is `Submitted`, facility status is `Submitted`, issuance details started, provided & submitted ', () => {
    it('should render a link to facility preview page', () => {
      const user = { roles: ['maker'] };
      const facilityName = 'loan';
      const facility = {
        _id: '1234',
        facilityStage: 'Conditional',
        status: 'Submitted',
        issueFacilityDetailsProvided: true,
        issueFacilityDetailsStarted: true,
        issueFacilityDetailsSubmitted: true,
      };

      const deal = {
        _id: 1,
        details: {
          status: 'Submitted',
          submissionType: 'Automatic Inclusion Notice',
        },
      };

      const wrapper = render({ user, deal, facility, facilityName });
      wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
        .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/preview`, 'Facility issued');
    });
  });

  describe('when the deal status is `Acknowledged by UKEF`, facility status is `Acknowledged`, issuance details started, provided & submitted ', () => {
    it('should render a link to facility preview page', () => {
      const user = { roles: ['maker'] };
      const facilityName = 'loan';
      const facility = {
        _id: '1234',
        facilityStage: 'Conditional',
        status: 'Acknowledged',
        issueFacilityDetailsProvided: true,
        issueFacilityDetailsStarted: true,
        issueFacilityDetailsSubmitted: true,
      };

      const deal = {
        _id: 1,
        details: {
          status: 'Acknowledged by UKEF',
          submissionType: 'Automatic Inclusion Notice',
        },
      };

      const wrapper = render({ user, deal, facility, facilityName });
      wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
        .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/preview`, 'Facility issued');
    });

    describe('when the deal status is `Further Maker\'s input required`, facility status is `Maker\'s input required`, issuance details started, provided & submitted ', () => {
      it('should render a link to facility preview page', () => {
        const user = { roles: ['maker'] };
        const facilityName = 'loan';
        const facility = {
          _id: '1234',
          facilityStage: 'Conditional',
          status: 'Maker\'s input required',
          issueFacilityDetailsProvided: true,
          issueFacilityDetailsStarted: true,
          issueFacilityDetailsSubmitted: true,
        };

        const deal = {
          _id: 1,
          details: {
            status: 'Further Maker\'s input required',
            submissionType: 'Automatic Inclusion Notice',
          },
        };

        const wrapper = render({ user, deal, facility, facilityName });
        wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
          .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/issue-facility`, 'Facility issued');
      });
    });
  });



  describe('when deal status is NOT `Acknowledged by UKEF` or `Ready for Checker\'s approval', () => {
    const facilityName = 'loan';
    const deals = [
      {
        _id: 1,
        details: {
          status: 'Some other status',
        },
      },
      {
        _id: 2,
        details: {
          status: 'Test status',
        },
      },
    ];
    const facility = { _id: '1234' };

    it('should not render at all', () => {
      const user = { roles: ['maker', 'checker'] };
      for (const deal of deals) {
        const wrapper = render({ user, deal, facility, facilityName });
        wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
          .notToExist();
      }
    });

    describe('with params.editable', () => {
      it('should render delete link', () => {
        const user = { roles: ['maker', 'checker'] };
        const editable = true;

        for (const deal of deals) {
          const wrapper = render({ user, deal, facility, facilityName, editable });
          wrapper.expectLink(`[data-cy="${facilityName}-delete-${facility._id}"]`)
            .toLinkTo(`/contract/${deal._id}/${facilityName}/${facility._id}/delete`, 'Delete');
        }
      });
    });
  });

  describe('when deal previousStatus is `Draft`', () => {
    it('should not render at all', () => {
      const facilityName = 'loan';
      const dealsWithPreviousStatus = mockDeals;
      dealsWithPreviousStatus.map((deal) => {
        const d = deal;
        d.details.previousStatus = 'Draft';
        return d;
      });

      const facility = { _id: '1234' };

      const user = { roles: ['maker'] };
      for (const deal of dealsWithPreviousStatus) {
        const wrapper = render({ user, deal, facility, facilityName });
        wrapper.expectLink(`[data-cy="${facilityName}-issue-facility-${facility._id}"]`)
          .notToExist();
      }
    });
  });
});
