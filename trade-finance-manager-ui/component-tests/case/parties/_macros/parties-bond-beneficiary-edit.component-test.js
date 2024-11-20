const { BOND_TYPE } = require('@ukef/dtfs2-common');
const { componentRenderer } = require('../../../componentRenderer');

const page = '../templates/case/parties/_macros/parties-bond-beneficiary-edit.njk';
const render = componentRenderer(page);

describe(page, () => {
  let wrapper;

  describe('bond issuer', () => {
    const params = {
      bondType: BOND_TYPE.RETENTION_BOND,
      bond: {
        _id: '123',
        facilitySnapshot: {
          _id: '123',
          ukefFacilityId: '0040004833',
          ukefFacilityType: 'Bond',
          bondBeneficiary: 'test bond beneficiary',
        },
        tfm: {
          bondBeneficiaryPartyUrn: '1234-test',
        },
      },
      index: 1,
    };

    beforeEach(() => {
      wrapper = render(params);
    });

    it('should render bond issuer name', () => {
      wrapper.expectText('[data-cy="bond-beneficiary-name"]').toContain(params.bond.facilitySnapshot.bondBeneficiary);
    });

    it('should render bond issuer urn input', () => {
      wrapper.expectInput('[data-cy="urn-input-1"]').toHaveValue(params.bond.tfm.bondBeneficiaryPartyUrn);
    });
  });
});
