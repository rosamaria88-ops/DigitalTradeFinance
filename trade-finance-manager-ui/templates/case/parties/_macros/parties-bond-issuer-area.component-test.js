const componentRenderer = require('../../../../component-tests/componentRenderer');

const page = '../templates/case/parties/_macros/parties-bond-issuer-area.njk';
const render = componentRenderer(page);

describe(page, () => {
  let wrapper;
  const params = {
    deal: {
      _id: '12345678',
      details: {
        submissionType: 'Automatic Inclusion Notice',
        bankSupplyContractID: 'contract-1',
        bankSupplyContractName: 'FirstContract',
        owningBank: {
          name: 'Lloyds',
          emails: ['xxx@yyy.com'],
        },
        maker: {
          firstname: 'John',
          surname: 'Doe',
          email: 'john.doe@exporter.com',
        },
      },
      facilities: [],
    },
  };

  beforeEach(() => {
    wrapper = render(params);
  });

  it('should render heading', () => {
    wrapper.expectText('[data-cy="bond-issuer-heading"]').toRead('Bond issuer');
  });

  it('should render sub heading', () => {
    wrapper.expectText('[data-cy="bond-issuer-sub-heading"]').toRead('(if different to bank)');
  });

  describe('when facilities have bondIssuer', () => {
    it('should render bond issuer facilities table', () => {
      const paramsWithFacilities = {
        deal: {
          facilities: [
            {
              _id: '123',
              facilitySnapshot: {
                _id: '123',
                ukefFacilityId: '0040004833',
                ukefFacilityType: 'bond',
                bondIssuer: 'test bond beneficiary',
              },
              tfm: {
                bondBeneficiaryPartyUrn: '1234-test',
              },
            },
            {
              _id: '456',
              facilitySnapshot: {
                _id: '456',
                ukefFacilityType: 'bond',
                ukefFacilityId: '0040004833',
                bondIssuer: 'test bond beneficiary',
              },
              tfm: {
                bondBeneficiaryPartyUrn: '1234-test',
              },
            },
            {
              _id: '789',
              facilitySnapshot: {
                _id: '789',
                ukefFacilityType: 'bond',
                ukefFacilityId: '0040004833',
              },
              tfm: {
                bondBeneficiaryPartyUrn: '1234-test',
              },
            },
          ],
        },
      };

      wrapper = render(paramsWithFacilities);

      wrapper.expectElement('[data-cy="bond-issuer-facilities-table"]').toExist();
      wrapper.expectElement('[data-cy="bond-issuer-not-applicable"]').notToExist();
    });
  });

  describe('when facilities do not have bondIssuer', () => {
    it('should render `Not applicable`', () => {
      const paramsWithFacilities = {
        deal: {
          facilities: [
            {
              _id: '123',
              facilitySnapshot: {
                _id: '123',
                ukefFacilityType: 'bond',
              },
            },
            {
              _id: '456',
              facilitySnapshot: {
                _id: '456',
                ukefFacilityType: 'bond',
              },
            },
            {
              _id: '789',
              facilitySnapshot: {
                _id: '789',
                ukefFacilityType: 'bond',
              },
            },
          ],
        },
      };

      wrapper = render(paramsWithFacilities);

      wrapper.expectElement('[data-cy="bond-issuer-not-applicable"]').toExist();
      wrapper.expectElement('[data-cy="bond-issuer-facilities-table"]').notToExist();
    });
  });
});
