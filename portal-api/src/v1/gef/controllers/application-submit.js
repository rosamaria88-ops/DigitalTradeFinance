const { ObjectID } = require('mongodb');
const now = require('../../../now');
const refDataApi = require('../../../reference-data/api');
const db = require('../../../drivers/db-client');
const {
  getAllFacilitiesByApplicationId,
  update: updateFacility,
} = require('./facilities.controller');
const CONSTANTS = require('../../../constants');
const { PORTAL_ACTIVITY_LABEL, PORTAL_ACTIVITY_TYPE } = require('../../portalActivity-object-generator/activityConstants');
const portalActivityGenerator = require('../../portalActivity-object-generator');

const generateSubmissionData = async (existingApplication) => {
  const result = {
    date: existingApplication.submissionDate,
  };

  result.count = existingApplication.submissionCount + 1;

  if (!existingApplication.submissionDate) {
    result.date = now();
  }

  return result;
};

const generateId = async ({
  entityId, entityType, dealId, user,
}) => refDataApi.numberGenerator.create({
  dealType: CONSTANTS.DEAL.DEAL_TYPE.GEF,
  entityId,
  entityType,
  dealId,
  user,
});

const generateUkefDealId = async (application) => application.ukefDealId || generateId({
  entityId: application._id,
  entityType: 'deal',
  dealId: application._id,
  user: application.checkerId,
});

const generateUkefFacilityId = async (facility) => facility.ukefDealId || generateId({
  entityId: facility._id,
  entityType: 'facility',
  dealId: facility.applicationId,
});

const addSubmissionDateToIssuedFacilities = async (applicationId) => {
  const facilities = await getAllFacilitiesByApplicationId(applicationId);

  facilities.forEach(async (facility) => {
    const { _id, hasBeenIssued, shouldCoverStartOnSubmission } = facility;

    if (hasBeenIssued) {
      const update = {
        submittedAsIssuedDate: now(),
      };

      // sets coverstartdate to ukef submission date if starts on submission
      // sets hour, min, seconds to midnight of the same day
      if (shouldCoverStartOnSubmission) {
        update.coverStartDate = (new Date()).setHours(0, 0, 0, 0);
      }

      await updateFacility(_id, update);
    }
  });

  return facilities;
};

const addUkefFacilityIdToFacilities = async (applicationId) => {
  const facilities = await getAllFacilitiesByApplicationId(applicationId);

  await Promise.all(facilities.map(async (facility) => {
    const { ukefId } = await generateUkefFacilityId(facility);

    if (ukefId !== facility.ukefFacilityId) {
      const update = {
        ukefFacilityId: ukefId,
      };
      await updateFacility(facility._id, update);
    }
  }));

  return facilities;
};

// retrieves user information from database
const getUserInfo = async (userId) => {
  const userCollectionName = 'users';

  const userCollection = await db.getCollection(userCollectionName);
  const {
    firstname,
    surname = '',
  } = userId
    ? await userCollection.findOne({ _id: new ObjectID(String(userId)) })
    : {};

  // creates user object which can be used
  const user = {
    firstname,
    surname,
    _id: userId,
  };

  return user;
};

// generates labels for portalActivities array based on type of submission
const submissionTypeToConstant = (submissionType) => {
  let submissionConstant;

  switch (submissionType) {
    case CONSTANTS.DEAL.SUBMISSION_TYPE.AIN:
      submissionConstant = PORTAL_ACTIVITY_LABEL.AIN_SUBMISSION;
      break;
    case CONSTANTS.DEAL.SUBMISSION_TYPE.MIN:
      submissionConstant = PORTAL_ACTIVITY_LABEL.MIN_SUBMISSION;
      break;
    case CONSTANTS.DEAL.SUBMISSION_TYPE.MIA:
      submissionConstant = PORTAL_ACTIVITY_LABEL.MIA_SUBMISSION;
      break;
    default:
      submissionConstant = null;
  }

  return submissionConstant;
};

// adds to the portalActivities array for submission to UKEF events
const submissionPortalActivity = async (application) => {
  const { submissionType, portalActivities, checkerId } = application;
  // generates the label for activity array
  const applicationType = submissionTypeToConstant(submissionType);
  // creates user object to add to array
  const user = await getUserInfo(checkerId);
  // generates an activities object
  const activityObj = portalActivityGenerator(applicationType, user, PORTAL_ACTIVITY_TYPE.NOTICE, '');
  // adds to beginning of portalActivities array so most recent displayed first
  portalActivities.unshift(activityObj);

  return portalActivities;
};

const addSubmissionData = async (applicationId, existingApplication) => {
  const { count, date } = await generateSubmissionData(existingApplication);
  const { ukefId } = await generateUkefDealId(existingApplication);

  await addSubmissionDateToIssuedFacilities(applicationId);
  await addUkefFacilityIdToFacilities(applicationId);
  const updatedPortalActivity = await submissionPortalActivity(existingApplication);

  return {
    submissionCount: count,
    submissionDate: date,
    ukefDealId: ukefId,
    portalActivities: updatedPortalActivity,
  };
};

module.exports = {
  addSubmissionData, submissionPortalActivity, submissionTypeToConstant, getUserInfo,
};
