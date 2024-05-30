const { MONGO_DB_COLLECTIONS } = require('@ukef/dtfs2-common');
const wipeDB = require('../../wipeDB');
const aDeal = require('../deal-builder');

const app = require('../../../src/createApp');
const api = require('../../api')(app);
const { expectAddedFields, expectAddedFieldsWithEditedBy } = require('./expectAddedFields');
const CONSTANTS = require('../../../src/constants');
const { MOCK_PORTAL_USER } = require('../../mocks/test-users/mock-portal-user');

const mockUserNoBank = {
  _id: '6603ebb1b81328945f63a1a2',
  username: 'temp',
  password: '',
  roles: [],
};

const newDeal = aDeal({
  dealType: CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS,
  editedBy: [],
  eligibility: {
    status: 'Not started',
    criteria: [{}],
  },
  status: CONSTANTS.DEALS.DEAL_STATUS.DRAFT,
  exporter: {
    companyName: 'mock company',
  },
  bankInternalRefName: 'test',
  submissionType: CONSTANTS.DEALS.SUBMISSION_TYPE.AIN,
  updatedAt: 123456789,
});

describe('/v1/portal/deals', () => {
  beforeAll(async () => {
    await wipeDB.wipe([MONGO_DB_COLLECTIONS.DEALS, MONGO_DB_COLLECTIONS.FACILITIES]);
  });

  describe('POST /v1/portal/deals', () => {
    it('returns the created deal with correct fields', async () => {
      const { body, status } = await api.post({ deal: newDeal, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');

      expect(status).toEqual(200);

      const { body: createdDeal } = await api.get(`/v1/portal/deals/${body._id}`);

      expect(createdDeal.deal).toEqual(expectAddedFields(newDeal));

      expect(createdDeal.deal.maker).toEqual(MOCK_PORTAL_USER);
      expect(createdDeal.deal.bank).toEqual(MOCK_PORTAL_USER.bank);
      expect(createdDeal.deal.eligibility.status).toEqual(newDeal.eligibility.status);
      expect(createdDeal.deal.eligibility.criteria).toEqual(newDeal.eligibility.criteria);
      expect(createdDeal.deal.facilities).toEqual([]);
    });

    describe('when user is invalid', () => {
      it('missing user returns 400', async () => {
        const postBody = {
          bankInternalRefName: '',
          additionalRefName: '',
        };

        const { status } = await api.post({ deal: postBody }).to('/v1/portal/deals');

        expect(status).toEqual(400);
      });

      it('user with no bank returns validation errors', async () => {
        const postBody = {
          dealType: 'GEF',
          bankInternalRefName: '1234',
          additionalRefName: 'name',
        };

        const { body, status } = await api.post({ deal: postBody, user: mockUserNoBank }).to('/v1/portal/deals');

        expect(status).toEqual(400);
        expect(body.validationErrors.count).toEqual(1);

        expect(body.validationErrors.errorList.makerObject).toBeDefined();
        expect(body.validationErrors.errorList.makerObject.text).toEqual('deal.maker object with bank is required');
      });
    });

    describe('when required fields are missing', () => {
      it('returns 400 with validation errors', async () => {
        const postBody = {
          dealType: 'GEF',
          bankInternalRefName: '',
          additionalRefName: '',
        };

        const { body, status } = await api.post({ deal: postBody, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');

        expect(status).toEqual(400);
        expect(body.validationErrors.count).toEqual(2);

        expect(body.validationErrors.errorList.bankInternalRefName).toBeDefined();
        expect(body.validationErrors.errorList.bankInternalRefName.text).toEqual('Enter the Bank deal ID');

        expect(body.validationErrors.errorList.additionalRefName).toBeDefined();
        expect(body.validationErrors.errorList.additionalRefName.text).toEqual('Enter the Bank deal name');
      });
    });

    describe('when required fields are invalid', () => {
      it('returns 400 with validation errors', async () => {
        const postBody = {
          dealType: 'GEF',
          bankInternalRefName: 'a'.repeat(31),
          additionalRefName: 'b'.repeat(101),
        };

        const { body, status } = await api.post({ deal: postBody, user: mockUserNoBank }).to('/v1/portal/deals');

        expect(status).toEqual(400);
        expect(body.validationErrors.count).toEqual(3);

        expect(body.validationErrors.errorList.bankInternalRefName).toBeDefined();
        expect(body.validationErrors.errorList.bankInternalRefName.text).toEqual('Bank deal ID must be 30 characters or fewer');

        expect(body.validationErrors.errorList.additionalRefName).toBeDefined();
        expect(body.validationErrors.errorList.additionalRefName.text).toEqual('Bank deal name must be 100 characters or fewer');

        expect(body.validationErrors.errorList.makerObject).toBeDefined();
        expect(body.validationErrors.errorList.makerObject.text).toEqual('deal.maker object with bank is required');
      });
    });
  });

  describe('GET /v1/portal/deals/:id', () => {
    it('returns the requested resource', async () => {
      const postResult = await api.post({ deal: newDeal, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');
      const dealId = postResult.body._id;

      const { status, body } = await api.get(`/v1/portal/deals/${dealId}`);

      expect(status).toEqual(200);
      expect(body.deal).toEqual(expectAddedFields(newDeal));
    });

    describe('when a BSS deal has facilities', () => {
      it('returns facilities mapped to deal.bondTransactions and deal.loanTransactions', async () => {
        const postResult = await api.post({ deal: newDeal, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');
        const dealId = postResult.body._id;

        // create some facilities
        const mockFacility = {
          dealId,
          value: 123456,
          user: MOCK_PORTAL_USER,
        };

        const mockBond = {
          type: 'Bond',
          ...mockFacility,
        };

        const mockLoan = {
          type: 'Loan',
          ...mockFacility,
        };

        const { body: createdBond1 } = await api.post({ facility: mockBond, user: MOCK_PORTAL_USER }).to('/v1/portal/facilities');
        const { body: createdBond2 } = await api.post({ facility: mockBond, user: MOCK_PORTAL_USER }).to('/v1/portal/facilities');
        const { body: createdLoan1 } = await api.post({ facility: mockLoan, user: MOCK_PORTAL_USER }).to('/v1/portal/facilities');
        const { body: createdLoan2 } = await api.post({ facility: mockLoan, user: MOCK_PORTAL_USER }).to('/v1/portal/facilities');

        const { body: bond1 } = await api.get(`/v1/portal/facilities/${createdBond1._id}`);
        const { body: bond2 } = await api.get(`/v1/portal/facilities/${createdBond2._id}`);
        const { body: loan1 } = await api.get(`/v1/portal/facilities/${createdLoan1._id}`);
        const { body: loan2 } = await api.get(`/v1/portal/facilities/${createdLoan2._id}`);

        const { status, body } = await api.get(`/v1/portal/deals/${dealId}`);

        expect(status).toEqual(200);
        expect(body.deal.bondTransactions.items).toEqual([bond1, bond2]);

        expect(body.deal.loanTransactions.items).toEqual([loan1, loan2]);
      });
    });
  });

  describe('PUT /v1/portal/deals/:id', () => {
    it('returns the updated deal', async () => {
      const postResult = await api.post({ deal: newDeal, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');
      const createdDeal = postResult.body;
      const updatedDeal = {
        ...newDeal,
        _id: createdDeal._id,
        additionalRefName: 'change this field',
        eligibility: {
          ...newDeal.eligibility,
          mockNewField: true,
        },
      };

      const { status, body } = await api.put({ dealUpdate: updatedDeal, user: MOCK_PORTAL_USER }).to(`/v1/portal/deals/${createdDeal._id}`);

      expect(status).toEqual(200);

      expect(body).toEqual(expectAddedFieldsWithEditedBy(updatedDeal, MOCK_PORTAL_USER));
    });

    it('handles partial updates', async () => {
      const postResult = await api.post({ deal: newDeal, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');
      const createdDeal = postResult.body;

      const partialUpdate = {
        additionalRefName: 'change this field',
        eligibility: {
          mockNewField: true,
        },
      };

      const expectedDataIncludingUpdate = {
        ...newDeal,
        _id: createdDeal._id,
        additionalRefName: 'change this field',
        eligibility: {
          ...newDeal.eligibility,
          mockNewField: true,
        },
      };

      const { status: putStatus } = await api.put({ dealUpdate: partialUpdate, user: MOCK_PORTAL_USER }).to(`/v1/portal/deals/${createdDeal._id}`);
      expect(putStatus).toEqual(200);

      const { status, body } = await api.get(`/v1/portal/deals/${createdDeal._id}`);

      expect(status).toEqual(200);
      expect(body.deal).toEqual(expectAddedFieldsWithEditedBy(expectedDataIncludingUpdate, MOCK_PORTAL_USER));
    });

    it('updates the deal', async () => {
      const postResult = await api.post({ deal: newDeal, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');
      const createdDeal = postResult.body;

      const updatedDeal = {
        ...newDeal,
        _id: createdDeal._id,
        additionalRefName: 'change this field',
      };

      await api.put({ dealUpdate: updatedDeal, user: MOCK_PORTAL_USER }).to(`/v1/portal/deals/${createdDeal._id}`);

      const { status, body } = await api.get(`/v1/portal/deals/${createdDeal._id}`);

      expect(status).toEqual(200);

      expect(body.deal).toEqual(expectAddedFieldsWithEditedBy(updatedDeal, MOCK_PORTAL_USER));
    });

    it('adds updates and retains `editedBy` array with user data', async () => {
      const postResult = await api.post({ deal: newDeal, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');
      const createdDeal = postResult.body;
      const firstUpdate = {
        ...createdDeal,
        additionalRefName: 'change this field',
      };

      await api.put({ dealUpdate: firstUpdate, user: MOCK_PORTAL_USER }).to(`/v1/portal/deals/${createdDeal._id}`);

      const dealAfterFirstUpdate = await api.get(`/v1/portal/deals/${createdDeal._id}`);

      const secondUpdate = {
        ...dealAfterFirstUpdate.body.deal,
        additionalRefName: 'change this field again',
      };

      await api.put({ dealUpdate: secondUpdate, user: MOCK_PORTAL_USER }).to(`/v1/portal/deals/${createdDeal._id}`);

      const dealAfterSecondUpdate = await api.get(`/v1/portal/deals/${createdDeal._id}`);
      expect(dealAfterSecondUpdate.status).toEqual(200);

      expect(dealAfterSecondUpdate.body.deal.editedBy.length).toEqual(2);
      expect(dealAfterSecondUpdate.body.deal.editedBy[0]).toEqual(expectAddedFieldsWithEditedBy(secondUpdate, MOCK_PORTAL_USER, 1).editedBy[0]);
      expect(dealAfterSecondUpdate.body.deal.editedBy[1]).toEqual(expectAddedFieldsWithEditedBy(secondUpdate, MOCK_PORTAL_USER, 2).editedBy[1]);
    });
  });

  describe('PUT /v1/portal/deals/:id/status', () => {
    it('Should return 400 bad request status code when the new status is same and existing application status', async () => {
      // Create a new BSS deal
      const dealWithSubmittedStatus = {
        ...newDeal,
        status: 'Submitted',
        previousStatus: "Checker's approval",
      };
      const postResult = await api.post({ deal: dealWithSubmittedStatus, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');
      const createdDeal = postResult.body;

      // First status update - 200
      let statusUpdate = 'Acknowledged';
      const { status } = await api.put({ status: statusUpdate }).to(`/v1/portal/deals/${createdDeal._id}/status`);
      expect(status).toEqual(200);

      // Second status update - 400
      statusUpdate = 'Acknowledged';
      const { status: secondStatus } = await api.put({ status: statusUpdate }).to(`/v1/portal/deals/${createdDeal._id}/status`);
      expect(secondStatus).toEqual(400);
    });

    it('returns the updated deal with updated statuses', async () => {
      const dealWithSubmittedStatus = {
        ...newDeal,
        status: 'Submitted',
        previousStatus: "Checker's approval",
      };

      const postResult = await api.post({ deal: dealWithSubmittedStatus, user: MOCK_PORTAL_USER }).to('/v1/portal/deals');
      const createdDeal = postResult.body;
      const statusUpdate = 'Acknowledged';

      const { status, body } = await api.put({ status: statusUpdate }).to(`/v1/portal/deals/${createdDeal._id}/status`);

      expect(status).toEqual(200);

      expect(body.status).toEqual('Acknowledged');
      expect(body.previousStatus).toEqual('Submitted');
      expect(typeof body.updatedAt).toEqual('number');
    });
  });
});
