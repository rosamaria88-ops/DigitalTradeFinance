/* eslint-disable no-underscore-dangle */
import userCanEditLeadUnderwriter from './helpers';

describe('case - lead-underwriter - helpers', () => {
  describe('userCanEditLeadUnderwriter', () => {
    it('should return true', () => {
      const result = userCanEditLeadUnderwriter(
        {
          firstName: 'Joe',
          lastName: 'Bloggs',
          teams: ['UNDERWRITER_MANAGERS'],
        },
      );

      expect(result).toEqual(true);
    });

    describe('when user is NOT in UNDERWRITER_MANAGERS team', () => {
      it('should return false', () => {
        const result = userCanEditLeadUnderwriter(
          {
            firstName: 'Joe',
            lastName: 'Bloggs',
            teams: ['UNDERWRITERS'],
          },
        );

        expect(result).toEqual(false);
      });
    });
  });
});

/* eslint-enable no-underscore-dangle */
