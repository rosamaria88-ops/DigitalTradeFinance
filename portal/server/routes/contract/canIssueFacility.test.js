import canIssueFacility from './canIssueFacility';

describe('canIssueFacility', () => {
  const mockUserRoles = ['maker'];

  const mockLoanThatCanBeIssued = {
    facilityStage: 'Conditional',
    issueFacilityDetailsSubmitted: false,
  };

  describe('when user is a maker', () => {
    describe('when a deal has status `Acknowledged by UKEF`, AIN submissionType and a Conditional loan that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Acknowledged by UKEF',
            submissionType: 'Automatic Inclusion Notice',
          },
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockLoanThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a deal has status `Accepted by UKEF (with conditions)`, AIN submissionType and a Conditional loan that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Accepted by UKEF (with conditions)',
            submissionType: 'Automatic Inclusion Notice',
          },
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockLoanThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a deal has status `Accepted by UKEF (without conditions)`, AIN submissionType and a Conditional loan that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Accepted by UKEF (without conditions)',
            submissionType: 'Automatic Inclusion Notice',
          },
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockLoanThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a deal has status `Ready for Checker\'s approval`, MIN submissionType and a Conditional loan that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Ready for Checker\'s approval',
            submissionType: 'Manual Inclusion Notice',
          },
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockLoanThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a deal has status `Further Maker\'s input required`, MIN submissionType and a Conditional loan that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Further Maker\'s input required',
            submissionType: 'Manual Inclusion Notice',
          },
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockLoanThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a deal has status `Ready for Checker\'s approval`, MIN submissionType and an Unissued bond that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Ready for Checker\'s approval',
            submissionType: 'Manual Inclusion Notice',
          },
        };
        const mockBondThatCanBeIssued = {
          issueFacilityDetailsSubmitted: false,
          bondStage: 'Unissued',
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockBondThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a deal has status `Further Maker\'s input required`, MIN submissionType and an Unissued bond that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Further Maker\'s input required',
            submissionType: 'Manual Inclusion Notice',
          },
        };
        const mockBondThatCanBeIssued = {
          issueFacilityDetailsSubmitted: false,
          bondStage: 'Unissued',
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockBondThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a deal has status `Accepted by UKEF (with conditions)`, MIA submissionType and a facility that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Accepted by UKEF (with conditions)',
            submissionType: 'Manual Inclusion Application',
          },
        };

        const mockBondThatCanBeIssued = {
          issueFacilityDetailsSubmitted: false,
          bondStage: 'Unissued',
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockBondThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a deal has status `Accepted by UKEF (without conditions)`, MIA submissionType and a facility that has NOT been submitted', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Accepted by UKEF (without conditions)',
            submissionType: 'Manual Inclusion Application',
          },
        };

        const mockBondThatCanBeIssued = {
          issueFacilityDetailsSubmitted: false,
          bondStage: 'Unissued',
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockBondThatCanBeIssued)).toEqual(true);
      });
    });

    describe('when a loan has `Unconditional` facilityStage and `Conditional` previousFacilityStage', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Further Maker\'s input required',
            submissionType: 'Manual Inclusion Notice',
          },
        };
        const mockLoan = {
          issueFacilityDetailsSubmitted: false,
          facilityStage: 'Unconditional',
          previousFacilityStage: 'Conditional',
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockLoan)).toEqual(true);
      });
    });

    describe('when a bond has `Issued` bondStage and `Unissued` previousFacilityStage', () => {
      it('should return true', () => {
        const mockDeal = {
          details: {
            status: 'Further Maker\'s input required',
            submissionType: 'Manual Inclusion Notice',
          },
        };
        const mockBond = {
          issueFacilityDetailsSubmitted: false,
          bondStage: 'Issued',
          previousFacilityStage: 'Unissued',
        };

        expect(canIssueFacility(mockUserRoles, mockDeal, mockBond)).toEqual(true);
      });
    });
  });

  describe('when user is NOT a maker', () => {
    it('should return false', () => {
      const checkerUserRole = ['checker'];
      const mockDeal = {
        details: {
          status: 'Ready for Checker\'s approval',
          submissionType: 'Manual Inclusion Notice',
        },
      };

      expect(canIssueFacility(checkerUserRole, mockDeal, mockLoanThatCanBeIssued)).toEqual(false);
    });
  });

  describe('when deal status is invalid', () => {
    it('should return false', () => {
      const mockDeal = {
        details: {
          status: 'Some other status',
          submissionType: 'Manual Inclusion Notice',
        },
      };

      expect(canIssueFacility(mockUserRoles, mockDeal, mockLoanThatCanBeIssued)).toEqual(false);
    });
  });

  describe('when deal submissionType is NOT `Automatic Inclusion Notice` or `Manual Inclusion Notice`', () => {
    it('should return false', () => {
      const mockDeal = {
        details: {
          status: 'Acknowledged by UKEF',
          submissionType: 'Some other submission type',
        },
      };

      expect(canIssueFacility(mockUserRoles, mockDeal, mockLoanThatCanBeIssued)).toEqual(false);
    });
  });

  describe('when facility.facilityStage is `Unconditional`', () => {
    it('should return false', () => {
      const mockDeal = {
        details: {
          status: 'Acknowledged by UKEF',
          submissionType: 'Manual Inclusion Notice',
        },
      };

      const mockLoan = {
        facilityStage: 'Unconditional',
        issueFacilityDetailsSubmitted: false,
      };

      expect(canIssueFacility(mockUserRoles, mockDeal, mockLoan)).toEqual(false);
    });
  });

  describe('when facility.facilityStage is `Issued`', () => {
    it('should return false', () => {
      const mockDeal = {
        details: {
          status: 'Acknowledged by UKEF',
          submissionType: 'Manual Inclusion Notice',
        },
      };

      const mockBond = {
        facilityStage: 'Issued',
        issueFacilityDetailsSubmitted: false,
      };

      expect(canIssueFacility(mockUserRoles, mockDeal, mockBond)).toEqual(false);
    });
  });

  describe('when facility.issueFacilityDetailsSubmitted is true', () => {
    it('should return false', () => {
      const mockDeal = {
        details: {
          status: 'Acknowledged by UKEF',
          submissionType: 'Manual Inclusion Notice',
        },
      };

      const mockLoan = {
        facilityStage: 'Conditional',
        issueFacilityDetailsSubmitted: true,
      };

      expect(canIssueFacility(mockUserRoles, mockDeal, mockLoan)).toEqual(false);
    });
  });
});
