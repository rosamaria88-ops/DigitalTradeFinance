const nunjucks = require('nunjucks');
const filterLocaliseTimestamp = require('./filter-localiseTimestamp');
const filterFormatDateString = require('./filter-formatDateString');
const dashIfEmpty = require('./filter-dashIfEmpty');
const displayName = require('./filter-displayName');
const formatAsCurrency = require('./formatAsCurrency');
const countriesWithEmptyInitialOption = require('./filter-countriesWithEmptyInitialOption');
const replaceWhiteSpaceWithDash = require('./filter-replaceWhiteSpaceWithDash');
const bondBeneficiaryFacilities = require('./filter-bondBeneficiaryFacilities');
const bondIssuerFacilities = require('./filter-bondIssuerFacilities');
const formatAsDecimal = require('./formatAsDecimal');

const configureNunjucks = (opts) => {
  const appViews = [
    'node_modules/govuk-frontend',
    'node_modules/@ministryofjustice/frontend',
    'templates',
  ];

  const nunjucksEnvironment = nunjucks.configure(appViews, opts);

  nunjucksEnvironment.addFilter('localiseTimestamp', filterLocaliseTimestamp);
  nunjucksEnvironment.addFilter('formatDateString', filterFormatDateString);
  nunjucksEnvironment.addFilter('dashIfEmpty', dashIfEmpty);
  nunjucksEnvironment.addFilter('displayName', displayName);
  nunjucksEnvironment.addFilter('formatAsCurrency', formatAsCurrency);
  nunjucksEnvironment.addFilter('countriesWithEmptyInitialOption', countriesWithEmptyInitialOption);
  nunjucksEnvironment.addFilter('replaceWhiteSpaceWithDash', replaceWhiteSpaceWithDash);
  nunjucksEnvironment.addFilter('bondBeneficiaryFacilities', bondBeneficiaryFacilities);
  nunjucksEnvironment.addFilter('bondIssuerFacilities', bondIssuerFacilities);
  nunjucksEnvironment.addFilter('formatAsDecimal', formatAsDecimal);

  return nunjucks;
};

module.exports = configureNunjucks;
