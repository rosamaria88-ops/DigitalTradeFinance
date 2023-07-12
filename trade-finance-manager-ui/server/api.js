const axios = require('axios');
const apollo = require('./graphql/apollo');
const dealQuery = require('./graphql/queries/deal-query');
const dealsLightQuery = require('./graphql/queries/deals-query-light');
const facilitiesLightQuery = require('./graphql/queries/facilities-query-light');
const facilityQuery = require('./graphql/queries/facility-query');
const teamMembersQuery = require('./graphql/queries/team-members-query');
const updatePartiesMutation = require('./graphql/mutations/update-parties');
const updateFacilityMutation = require('./graphql/mutations/update-facilities');
const updateFacilityRiskProfileMutation = require('./graphql/mutations/update-facility-risk-profile');
const updateTaskMutation = require('./graphql/mutations/update-task');
const updateCreditRatingMutation = require('./graphql/mutations/update-credit-rating');
const updateLossGivenDefaultMutation = require('./graphql/mutations/update-loss-given-default');
const updateProbabilityOfDefaultMutation = require('./graphql/mutations/update-probability-of-default');
const postUnderwriterManagersDecision = require('./graphql/mutations/update-underwriter-managers-decision');
const updateLeadUnderwriterMutation = require('./graphql/mutations/update-lead-underwriter');
const createActivityMutation = require('./graphql/mutations/create-activity');

require('dotenv').config();

const { TFM_API_URL, TFM_API_KEY } = process.env;

const generateHeaders = (token) => ({
  Authorization: token,
  'Content-Type': 'application/json',
  'x-api-key': TFM_API_KEY,
});

const getDeal = async (id, tasksFilters, activityFilters) => {
  const queryParams = {
    _id: id,
    tasksFilters,
    activityFilters,
  };

  const response = await apollo('GET', dealQuery, queryParams);

  if (response.errors || response.networkError) {
    console.error('TFM UI - GraphQL error querying deal ', response.errors || response.networkError.result.errors);
  }

  return response?.data?.deal;
};

const getFacilities = async (queryParams) => {
  const response = await apollo('GET', facilitiesLightQuery, queryParams);

  if (response.errors) {
    console.error('TFM UI - GraphQL error querying facilities ', response.errors);
  }

  if (response?.data?.facilities?.tfmFacilities) {
    return {
      facilities: response.data.facilities.tfmFacilities,
    };
  }

  return { facilities: [] };
};

const getDeals = async (queryParams) => {
  const response = await apollo('GET', dealsLightQuery, queryParams);

  if (response.errors) {
    console.error('TFM UI - GraphQL error querying deals ', response.errors);
  }

  if (response.data && response.data.dealsLight) {
    return {
      deals: response.data.dealsLight.deals,
      count: response.data.dealsLight.count,
    };
  }

  return {
    deals: [],
    count: 0,
  };
};

const getFacility = async (id) => {
  const response = await apollo('GET', facilityQuery, { id });

  if (response.errors) {
    console.error('TFM UI - GraphQL error querying facility ', response.errors);
  }

  return response?.data?.facility;
};

const getTeamMembers = async (teamId) => {
  const response = await apollo('GET', teamMembersQuery, { teamId });

  return response.data.teamMembers;
};

const updateParty = async (id, partyUpdate) => {
  const updateVariables = {
    id,
    partyUpdate,
  };

  const response = await apollo('PUT', updatePartiesMutation, updateVariables);
  return response;
};

const updateFacility = async (id, facilityUpdate) => {
  const updateVariables = {
    id,
    facilityUpdate,
  };
  const response = await apollo('PUT', updateFacilityMutation, updateVariables);
  return response;
};

const updateFacilityRiskProfile = async (id, facilityUpdate) => {
  const updateVariables = {
    id,
    facilityUpdate,
  };
  const response = await apollo('PUT', updateFacilityRiskProfileMutation, updateVariables);
  return response;
};

const updateTask = async (dealId, taskUpdate) => {
  const updateVariables = {
    dealId,
    taskUpdate,
  };

  const response = await apollo('PUT', updateTaskMutation, updateVariables);

  return response;
};

const updateCreditRating = async (dealId, creditRatingUpdate) => {
  const updateVariables = {
    dealId,
    creditRatingUpdate,
  };

  const response = await apollo('PUT', updateCreditRatingMutation, updateVariables);
  return response;
};

const updateLossGivenDefault = async (dealId, lossGivenDefaultUpdate) => {
  const updateVariables = {
    dealId,
    lossGivenDefaultUpdate,
  };

  const response = await apollo('PUT', updateLossGivenDefaultMutation, updateVariables);
  return response;
};

const updateProbabilityOfDefault = async (dealId, probabilityOfDefaultUpdate) => {
  const updateVariables = {
    dealId,
    probabilityOfDefaultUpdate,
  };

  const response = await apollo('PUT', updateProbabilityOfDefaultMutation, updateVariables);
  return response;
};

const updateUnderwriterManagersDecision = async (dealId, update) => {
  const updateVariables = {
    dealId,
    managersDecisionUpdate: update,
  };

  const response = await apollo('PUT', postUnderwriterManagersDecision, updateVariables);

  return response;
};

const updateLeadUnderwriter = async (dealId, leadUnderwriterUpdate) => {
  const updateVariables = {
    dealId,
    leadUnderwriterUpdate,
  };

  const response = await apollo('PUT', updateLeadUnderwriterMutation, updateVariables);

  return response;
};

const createActivity = (dealId, activityUpdate) => {
  const updateVariable = {
    dealId,
    activityUpdate,
  };

  return apollo('PUT', createActivityMutation, updateVariable);
};

const login = async (username, password) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${TFM_API_URL}/v1/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { username, password },
    });
    let data = '';

    if (response?.data) {
      data = {
        success: response.data.success,
        token: response.data.token,
        user: response.data.user,
      };
    }

    return data;
  } catch (err) {
    console.error('Unable to log in', err?.response?.data);
    return err?.response?.data;
  }
};

const updateUserPassword = async (id, update, token) => {
  try {
    const response = await axios({
      method: 'put',
      url: `${TFM_API_URL}/v1/users/${id}`,
      headers: generateHeaders(token),
      data: update,
    }).catch((err) => err.response);

    return response;
  } catch (error) {
    console.error('Unable to update user details', { error });
    return error;
  }
};

const createFeedback = async (formData, token) => {
  const response = await axios({
    method: 'post',
    url: `${TFM_API_URL}/v1/feedback`,
    headers: generateHeaders(token),
    data: formData,
  });
  return response.data;
};

const getUser = async (userId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/users/${userId}`,
      headers: generateHeaders(token),
    });

    return response.data.user;
  } catch (err) {
    console.error('Unable to get the user details', err?.response?.data);
    return err?.response?.data;
  }
};

const createFacilityAmendment = async (facilityId, token) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${TFM_API_URL}/v1/facilities/${facilityId}/amendments`,
      headers: generateHeaders(token),
      data: { facilityId },
    });

    return response.data;
  } catch (err) {
    console.error('Unable to create new amendment %s', err);
    return err?.response?.data;
  }
};

const updateAmendment = async (facilityId, amendmentId, data, token) => {
  try {
    const response = await axios({
      method: 'put',
      url: `${TFM_API_URL}/v1/facilities/${facilityId}/amendments/${amendmentId}`,
      headers: generateHeaders(token),
      data,
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to create amendment request %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getAmendmentInProgress = async (facilityId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/facilities/${facilityId}/amendments/in-progress`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the amendment in progress %s', err);
    return { status: err?.response?.status || 500, data: err?.response?.data };
  }
};

const getAllAmendmentsInProgress = async (token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/amendments/in-progress`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the amendments in progress %s', err);
    return { status: err?.response?.status || 500, data: err?.response?.data };
  }
};

const getCompletedAmendment = async (facilityId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/facilities/${facilityId}/amendments/completed`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the completed amendment %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getLatestCompletedAmendmentValue = async (facilityId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/facilities/${facilityId}/amendments/completed/latest-value`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the latest completed value amendment %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getLatestCompletedAmendmentDate = async (facilityId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/facilities/${facilityId}/amendments/completed/latest-cover-end-date`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the latest completed coverEndDate amendment %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getAmendmentById = async (facilityId, amendmentId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/facilities/${facilityId}/amendments/${amendmentId}`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the amendment by Id %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getAmendmentsByFacilityId = async (facilityId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/facilities/${facilityId}/amendments`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the amendment by Id %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getAmendmentsByDealId = async (dealId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/deals/${dealId}/amendments`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the amendment by deal Id %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getAmendmentInProgressByDealId = async (dealId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/deals/${dealId}/amendments/in-progress`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the amendment in progress by deal Id %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getCompletedAmendmentByDealId = async (dealId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/deals/${dealId}/amendments/completed`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the completed amendment by deal Id %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getLatestCompletedAmendmentByDealId = async (dealId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/deals/${dealId}/amendments/completed/latest`,
      headers: generateHeaders(token),
    });

    return { status: 200, data: response.data };
  } catch (err) {
    console.error('Unable to get the latest completed amendment by deal Id %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

const getParty = async (partyUrn, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${TFM_API_URL}/v1/party/urn/${partyUrn}`,
      headers: generateHeaders(token),
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    console.error('Unable to get party %s', err);
    return { status: err?.response?.status, data: err?.response?.data };
  }
};

module.exports = {
  getDeal,
  getDeals,
  getFacility,
  updateFacilityRiskProfile,
  getTeamMembers,
  getUser,
  updateUserPassword,
  updateParty,
  updateFacility,
  updateTask,
  updateCreditRating,
  updateLossGivenDefault,
  updateProbabilityOfDefault,
  updateUnderwriterManagersDecision,
  updateLeadUnderwriter,
  createActivity,
  login,
  getFacilities,
  createFeedback,
  updateAmendment,
  createFacilityAmendment,
  getAmendmentInProgress,
  getCompletedAmendment,
  getAmendmentById,
  getAmendmentsByFacilityId,
  getAmendmentsByDealId,
  getAmendmentInProgressByDealId,
  getCompletedAmendmentByDealId,
  getLatestCompletedAmendmentByDealId,
  getAllAmendmentsInProgress,
  getLatestCompletedAmendmentValue,
  getLatestCompletedAmendmentDate,
  getParty,
};
