const crypto = require('node:crypto');
const { MongoDbClient } = require('@ukef/dtfs2-common/mongo-db-client');
const { SqlDbDataSource } = require('@ukef/dtfs2-common/sql-db-connection');
const { UtilisationReportEntity } = require('@ukef/dtfs2-common');
const createTfmDealToInsertIntoDb = require('../tfm/cypress/fixtures/create-tfm-deal-to-insert-into-db');
const createTfmFacilityToInsertIntoDb = require('../tfm/cypress/fixtures/create-tfm-facility-to-insert-into-db');
const { DB_COLLECTIONS } = require('../e2e-fixtures/dbCollections');

SqlDbDataSource.initialize()
  .then(() => console.info('🗄️ Successfully initialised connection to SQL database'))
  .catch((error) => console.error('❌ Failed to initialise connection to SQL database:', error));

module.exports = {
  createTasks: ({ dbName, dbConnectionString }) => {
    const db = new MongoDbClient({ dbName, dbConnectionString });

    const usersCollectionName = 'users';
    const tfmDealsCollectionName = 'tfm-deals';
    const tfmFacilitiesCollectionName = 'tfm-facilities';

    const getUsersCollection = () => db.getCollection(usersCollectionName);
    const getTfmDealsCollection = () => db.getCollection(tfmDealsCollectionName);
    const getTfmFacilitiesCollection = () => db.getCollection(tfmFacilitiesCollectionName);

    const log = (message) => {
      console.info('Cypress log %s', message);
      return null;
    };

    const getUserFromDbByEmail = async (email) => {
      const users = await getUsersCollection();
      return users.findOne({ email: { $eq: email } });
    };

    const getUserFromDbByUsername = async (username) => {
      const users = await getUsersCollection();
      return users.findOne({ username: { $eq: username } });
    };

    const overridePortalUserSignInTokenWithValidTokenByUsername = async ({ username, newSignInToken }) => {
      const thirtyMinutesInMilliseconds = 30 * 60 * 1000;
      const salt = crypto.randomBytes(64);
      const hash = crypto.pbkdf2Sync(newSignInToken, salt, 210000, 64, 'sha512');
      const saltHex = salt.toString('hex');
      const hashHex = hash.toString('hex');
      const expiry = Date.now() + thirtyMinutesInMilliseconds;
      const userCollection = await getUsersCollection();
      return userCollection.updateOne({ username: { $eq: username } }, { $set: { signInTokens: [{ hashHex, saltHex, expiry }] } });
    };

    const overridePortalUserSignInTokensByUsername = async ({ username, newSignInTokens }) => {
      const signInTokens = newSignInTokens.map((newSignInToken) => {
        const { signInTokenFromLink, expiry } = newSignInToken;
        const salt = crypto.randomBytes(64);
        const hash = crypto.pbkdf2Sync(signInTokenFromLink, salt, 210000, 64, 'sha512');
        const saltHex = salt.toString('hex');
        const hashHex = hash.toString('hex');
        return { saltHex, hashHex, expiry };
      });

      const userCollection = await getUsersCollection();
      return userCollection.updateOne({ username: { $eq: username } }, { $set: { signInTokens } });
    };

    const resetPortalUserStatusAndNumberOfSignInLinks = async (username) => {
      const users = await getUsersCollection();
      return users.updateOne(
        { username: { $eq: username } },
        {
          $set: {
            'user-status': 'active',
          },
          $unset: {
            signInLinkSendDate: '',
            signInLinkSendCount: '',
            blockedStatusReason: '',
            signInLikeTokens: '',
            disabled: '',
          },
        },
      );
    };

    /**
     * Inserts utilisation report details to the SQL database
     * @param {Partial<import('@ukef/dtfs2-common').UtilisationReportEntity[]>} utilisationReports
     * @returns {import('@ukef/dtfs2-common').UtilisationReportEntity[]} The inserted reports
     */
    const insertUtilisationReportsIntoDb = async (utilisationReports) => {
      const utilisationReportRepo = SqlDbDataSource.getRepository(UtilisationReportEntity);
      const saveOperations = utilisationReports.map((utilisationReport) => utilisationReportRepo.save(utilisationReport));
      return await Promise.all(saveOperations);
    };

    /**
     * Deletes all the rows from the utilisation report and azure file info tables
     */
    const removeAllUtilisationReportsFromDb = async () => await SqlDbDataSource.manager.getRepository(UtilisationReportEntity).delete({});

    const getAllBanks = async () => {
      const banks = await db.getCollection(DB_COLLECTIONS.BANKS);
      return banks.find().toArray();
    };

    const disablePortalUserByUsername = async (username) => {
      const users = await getUsersCollection();
      return users.updateOne(
        { username: { $eq: username } },
        {
          $set: {
            disabled: true,
          },
        },
      );
    };

    const insertUtilisationReportDetailsIntoDb = async (utilisationReportDetails) => {
      const utilisationReports = await db.getCollection(DB_COLLECTIONS.UTILISATION_REPORTS);
      return utilisationReports.insertMany(utilisationReportDetails);
    };

    const removeAllUtilisationReportDetailsFromDb = async () => {
      const utilisationReports = await db.getCollection(DB_COLLECTIONS.UTILISATION_REPORTS);
      return utilisationReports.deleteMany({});
    };

    /**
     * Generates the specified number of TFM deals and inserts them directly
     * into the db. The UKEF deal ID of the first generated deal is 10000001;
     * this is incremented for each subsequent deal. The deal exporter is
     * 'Company 1' for the deals with odd numbered UKEF deal IDs and 'Company 2'
     * for those with even numbered UKEF deal IDs. This is to allow easy testing
     * of searching and sorting. Optionally, an array of MongoDB deal Object IDs
     * to use can be passed as the second argument - if the number of deals to
     * insert exceeds the length of this array (by n, say), then the last n deals
     * will have their MongoDB Object IDs autogenerated
     * @param {Object} numberOfDealsToInsert The number of deals to insert
     * @param {Array} dealObjectIds An array of MongoDB deal Object IDs to use
     * @returns {Object} MongoDB document representing the result of the insertion
     */
    const insertManyTfmDeals = async (numberOfDealsToInsert, dealObjectIds = []) => {
      const deals = await getTfmDealsCollection();
      const dealsToInsert = [];
      for (let i = 0; i < numberOfDealsToInsert; i += 1) {
        const ukefDealId = (10000001 + i).toString();
        const companyName = i % 2 === 0 ? 'Company 1' : 'Company 2';
        const dealObjectId = dealObjectIds[i];
        dealsToInsert.push(createTfmDealToInsertIntoDb(ukefDealId, companyName, dealObjectId));
      }
      return deals.insertMany(dealsToInsert);
    };

    const deleteAllTfmDeals = async () => {
      const deals = await getTfmDealsCollection();
      return deals.deleteMany({});
    };

    /**
     * Generates the specified number of TFM facilities and inserts them directly
     * into the db. It also inserts two deals (to link the facilities to).
     * The UKEF facility ID of the first generated facility is 10000001;
     * this is incremented for each subsequent facility. The inserted facilities
     * alternate with respect to which of the two deals they are linked to. This
     * is to allow easy testing of searching and sorting
     * @param {Object} numberOfFacilitiesToInsert The number of facilities to insert
     * @returns {Object} MongoDB document representing the result of the insertion
     */
    const insertManyTfmFacilitiesAndTwoLinkedDeals = async (numberOfFacilitiesToInsert) => {
      const dealObjectIds = ['65f18fd9cb063105fd4be63f', '65f18fd9cb063105fd4be645'];

      insertManyTfmDeals(2, dealObjectIds);

      const facilities = await getTfmFacilitiesCollection();
      const facilitiesToInsert = [];
      for (let i = 0; i < numberOfFacilitiesToInsert; i += 1) {
        const ukefFacilityId = (10000001 + i).toString();
        const dealObjectId = dealObjectIds[i % 2];
        facilitiesToInsert.push(createTfmFacilityToInsertIntoDb(ukefFacilityId, dealObjectId));
      }
      return facilities.insertMany(facilitiesToInsert);
    };

    const deleteAllTfmFacilities = async () => {
      const facilities = await getTfmFacilitiesCollection();
      return facilities.deleteMany({});
    };

    return {
      log,
      getUserFromDbByEmail,
      getUserFromDbByUsername,
      overridePortalUserSignInTokenWithValidTokenByUsername,
      overridePortalUserSignInTokensByUsername,
      resetPortalUserStatusAndNumberOfSignInLinks,
      disablePortalUserByUsername,
      insertUtilisationReportDetailsIntoDb,
      insertManyTfmDeals,
      deleteAllTfmDeals,
      insertManyTfmFacilitiesAndTwoLinkedDeals,
      deleteAllTfmFacilities,
      removeAllUtilisationReportDetailsFromDb,
      getAllBanks,
      insertUtilisationReportsIntoDb,
      removeAllUtilisationReportsFromDb,
    };
  },
};
