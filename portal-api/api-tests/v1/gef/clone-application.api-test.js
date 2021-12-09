const wipeDB = require('../../wipeDB');
const app = require('../../../src/createApp');
const testUserCache = require('../../api-test-users');
const { as } = require('../../api')(app);
const mockApplications = require('../../fixtures/gef/application');
const api = require('../../../src/v1/api');

const baseUrl = '/v1/gef/application';
const collectionName = 'gef-application';

const mockApplication = {
  ...mockApplications[0],
  bankInternalRefName: 'Updated Ref Name - Unit Test',
  submissionType: 'Automatic Inclusion Notice',
};

describe(baseUrl, () => {
  let aMaker;
  const tfmDealSubmitSpy = jest.fn(() => Promise.resolve());

  beforeAll(async () => {
    const testUsers = await testUserCache.initialise(app);
    aMaker = testUsers().withRole('maker').one();
  });

  beforeEach(async () => {
    await wipeDB.wipe([collectionName]);

    api.tfmDealSubmit = tfmDealSubmitSpy;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`POST ${baseUrl}/clone`, () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const mockDeal = await as(aMaker).post({
        dealType: 'GEF',
        userId: aMaker._id,
        bankId: aMaker.bank.id,
        bankInternalRefName: 'Bank 1',
        additionalRefName: 'Team 1',
        exporterId: '1234567890',
        createdAt: '2021-01-01T00:00',
        mandatoryVersionId: '123',
        status: 'IN_PROGRESS',
        updatedAt: null,
        submissionCount: 0,
      }).to(baseUrl);

      mockApplication.applicationId = mockDeal.body._id;

      const { status } = await as().post(mockApplication).to(`${baseUrl}/clone`);
      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "maker" role', async () => {
      const mockDeal = await as(aMaker).post({
        dealType: 'GEF',
        userId: aMaker._id,
        bankId: aMaker.bank.id,
        bankInternalRefName: 'Bank 1',
        additionalRefName: 'Team 1',
        exporterId: '1234567890',
        createdAt: '2021-01-01T00:00',
        mandatoryVersionId: '123',
        status: 'IN_PROGRESS',
        updatedAt: null,
        submissionCount: 0,
      }).to(baseUrl);

      mockApplication.applicationId = mockDeal.body._id;
      const { status } = await as(aMaker).post(mockApplication).to(`${baseUrl}/clone`);
      expect(status).toEqual(200);
    });

    it('returns a new application ID when a deal is cloned', async () => {
      const mockDeal = await as(aMaker).post({
        dealType: 'GEF',
        userId: aMaker._id,
        bankId: aMaker.bank.id,
        bankInternalRefName: 'Bank 1',
        additionalRefName: 'Team 1',
        exporterId: '1234567890',
        createdAt: '2021-01-01T00:00',
        mandatoryVersionId: '123',
        status: 'IN_PROGRESS',
        updatedAt: null,
        submissionCount: 0,
      }).to(baseUrl);

      mockApplication.applicationId = mockDeal.body._id;

      const { body } = await as(aMaker).post(mockApplication).to(`${baseUrl}/clone`);
      expect(body).toEqual({ applicationId: expect.any(String) });
    });

    it('returns an error message when Bank Internal Ref Name is null', async () => {
      const mockDeal = await as(aMaker).post({
        dealType: 'GEF',
        userId: aMaker._id,
        bankId: aMaker.bank.id,
        bankInternalRefName: 'Bank 1',
        additionalRefName: 'Team 1',
        exporterId: '1234567890',
        createdAt: '2021-01-01T00:00',
        mandatoryVersionId: '123',
        status: 'IN_PROGRESS',
        updatedAt: null,
        submissionCount: 0,
      }).to(baseUrl);

      const payload = {
        applicationId: mockDeal.body._id,
        ...mockApplications[0],
        bankInternalRefName: null,
      };
      const { body, status } = await as(aMaker).post(payload).to(`${baseUrl}/clone`);
      expect(body).toEqual([{
        errCode: 'MANDATORY_FIELD',
        errRef: 'bankInternalRefName',
        errMsg: 'bankInternalRefName is Mandatory',
      }]);
      expect(status).toEqual(422);
    });

    it('returns an error message when Bank Internal Ref Name is an empty string', async () => {
      const payload = {
        ...mockApplications[0],
        bankInternalRefName: '',
      };
      const { body, status } = await as(aMaker).post(payload).to(`${baseUrl}/clone`);
      expect(body).toEqual([{
        errCode: 'MANDATORY_FIELD',
        errRef: 'bankInternalRefName',
        errMsg: 'bankInternalRefName is Mandatory',
      }]);
      expect(status).toEqual(422);
    });
  });
});
