const componentRenderer = require('../../componentRenderer');
const component = 'contract/components/proceed-to-review-button.njk';
const render = componentRenderer(component);

describe(component, () => {

  describe("when viewed by a maker", () => {

    it("should be enabled for deals in status=Draft and status=Further Maker's input required", () =>{
      const user = {roles: ['maker']};
      const deals = [
        {_id: 1, details:{status:"Draft"}},
        {_id: 2, details:{status:"Further Maker's input required"}},
      ];

      for (const deal of deals) {
        const $ = render({user, deal});
        $.expectLink('[data-cy="ProceedToReview"]').toLinkTo(`/contract/${deal._id}/ready-for-review`);

//TODO button Text?
//TODO primary/secondary?

      }
    });

    it("should not render at all for deals in status=Submitted and status=Rejected by UKEF", () =>{
      const user = {roles: ['maker']};
      const deals = [
        {_id: 1, details:{status:"Submitted"}},
        {_id: 2, details:{status:"Rejected by UKEF"}},
      ];

      for (const deal of deals) {
        const $ = render({user, deal});
        $.expectLink('[data-cy="ProceedToReview"]').notToExist();
      }
    });

    it("should be disabled for deals in all other states", () =>{
      const user = {roles: ['maker']};
      const deals = [
        {_id: 1, details:{status:"Abandoned Deal"}},
        {_id: 2, details:{status:"Acknowledged by UKEF"}},
        {_id: 3, details:{status:"Accepted by UKEF (without conditions)"}},
        {_id: 4, details:{status:"Accepted by UKEF (with conditions)"}},
        {_id: 5, details:{status:"Ready for Checker's approval"}},
      ];

      for (const deal of deals) {
        const $ = render({user, deal});
        $.expectLink('[data-cy="ProceedToReview"]').toBeDisabled();
      }
    });

  });

  describe("when viewed by a checker", () => {
    it("should not render at all", () =>{
      const user = {roles: ['checker']};
      const deals = [
        {_id: 1, details:{status:"Draft"}},
        {_id: 2, details:{status:"Further Maker's input required"}},
        {_id: 3, details:{status:"Submitted"}},
        {_id: 4, details:{status:"Rejected by UKEF"}},
        {_id: 5, details:{status:"Abandoned Deal"}},
        {_id: 6, details:{status:"Acknowledged by UKEF"}},
        {_id: 7, details:{status:"Accepted by UKEF (without conditions)"}},
        {_id: 8, details:{status:"Accepted by UKEF (with conditions)"}},
        {_id: 9, details:{status:"Ready for Checker's approval"}},
      ];

      for (const deal of deals) {
        const $ = render({user, deal});
        $.expectLink('[data-cy="ProceedToReview"]').notToExist();
      }
    });
  });
});
