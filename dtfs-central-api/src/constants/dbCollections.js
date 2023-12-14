/**
 * @typedef {import('../types/db-models/db-collection-name').DbCollectionName} DbCollectionName
 */

/**
 * @type {Record<string, DbCollectionName>}
 */
const DB_COLLECTIONS = {
  BANKS: 'banks',
  CRON_JOB_LOGS: 'cron-job-logs',
  DEALS: 'deals',
  DURABLE_FUNCTIONS_LOG: 'durable-functions-log',
  ELIGIBILITY_CRITERIA: 'eligibilityCriteria',
  FACILITIES: 'facilities',
  GEF_ELIGIBILITY_CRITERIA: 'gef-eligibilityCriteria',
  GEF_MANDATORY_CRITERIA_VERSIONED: 'gef-mandatoryCriteriaVersioned',
  INDUSTRY_SECTORS: 'industrySectors',
  MANDATORY_CRITERIA: 'mandatoryCriteria',
  TFM_DEALS: 'tfm-deals',
  TFM_FACILITIES: 'tfm-facilities',
  TFM_TEAMS: 'tfm-teams',
  TFM_USERS: 'tfm-users',
  TRANSACTIONS: 'transactions',
  USERS: 'users',
  UTILISATION_DATA: 'utilisationData',
  UTILISATION_REPORTS: 'utilisationReports',
};

module.exports = { DB_COLLECTIONS };
