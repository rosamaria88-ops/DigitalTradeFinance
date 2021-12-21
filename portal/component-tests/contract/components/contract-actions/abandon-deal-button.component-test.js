const componentRenderer = require('../../../componentRenderer');
const component = 'contract/components/contract-actions/abandon-deal-button.njk';
const render = componentRenderer(component);

describe(component, () => {
  describe("when viewed by a maker", () => {

    it("should be enabled for deals in status=Draft and status=Further Maker's input required", () =>{
      const user = {_id: 123, roles: ['maker']};
      const deals = [
        {
          _id: 1,
          status: "Draft",
          details: {
            maker: {
              _id:123,
            },
          },
        },
        {
          _id: 2,
          status: "Further Maker's input required",
          details: {
            maker: { _id: 123 },
          },
        },
      ];

      for (const deal of deals) {
        const wrapper = render({user, deal});
        wrapper.expectSecondaryButton('[data-cy="Abandon"]')
          .toLinkTo(`/contract/${deal._id}/delete`, 'Abandon');
      }
    });

    it("should not render at all for deals in status=Submitted and status=Rejected by UKEF", () =>{
      const user = {_id: 123, roles: ['maker']};
      const deals = [
        {
          _id: 1,
          status: "Submitted",
          details: {
            maker: { _id: 123 },
          },
        },
        {
          _id: 2,
          status:"Rejected by UKEF",
          details: {
            maker: { _id: 123 },
          },
        },
      ];

      for (const deal of deals) {
        const wrapper = render({user, deal});
        wrapper.expectSecondaryButton('[data-cy="Abandon"]')
          .notToExist();
      }
    });

    it("should be disabled for deals in all other states", () =>{
      const user = {_id: 123, roles: ['maker']};
      const deals = [
        {
          _id: 1,
          status:"Abandoned",
          details: {
            maker: { _id: 123 },
          },
        },
        {
          _id: 2,
          status: "Acknowledged by UKEF",
          details: {
            maker: { _id: 123 },
          },
        },
        {
          _id: 3,
          status: "Accepted by UKEF (without conditions)",
          details: {
            maker: { _id: 123 },
          },
        },
        {
          _id: 4,
          status: "Accepted by UKEF (with conditions)",
          details: {
            maker: { _id: 123 },
          },
        },
        {
          _id: 5,
          status: "Ready for Checker's approval",
          details: {
            maker: { _id: 123 },
          },
        },
      ];

      for (const deal of deals) {
        const wrapper = render({user, deal});
        wrapper.expectSecondaryButton('[data-cy="Abandon"]')
          .toBeDisabled();
      }
    });

  });

  describe("when viewed by a checker", () => {
    it("should not render at all", () => {
      const user = { _id: 123, roles: ['checker'] };
      const deals = [
        { _id: 1, status: "Draft", details: { maker: { _id: 123 } } },
        { _id: 2, status: "Further Maker's input required", details: { maker: { _id: 123 } } },
      ];

      for (const deal of deals) {
        const wrapper = render({ user, deal });
        wrapper.expectSecondaryButton('[data-cy="Abandon"]')
          .notToExist();
      }
    });
  });

  describe("when viewed by a user with maker AND checker role", () => {
    it("should render", () => {
      const user = { _id: 123, roles: ['maker', 'checker'] };
      const deals = [
        { _id: 1, status: "Draft", details: { maker: { _id: 123 } } },
        { _id: 2, status: "Further Maker's input required", details: { maker: { _id: 123 } } },
      ];

      for (const deal of deals) {
        const wrapper = render({ user, deal });
        wrapper.expectSecondaryButton('[data-cy="Abandon"]')
          .toLinkTo(`/contract/${deal._id}/delete`, 'Abandon');
      }
    });
  });
});
