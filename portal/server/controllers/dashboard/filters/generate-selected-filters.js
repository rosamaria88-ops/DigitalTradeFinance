const { formatFieldValue } = require('./helpers');
const CONTENT_STRINGS = require('../../../content-strings');

/**
 * Create an object for a single, selected filter
 * This will used in mojFilter component - selectedFilters.categories.
 *
 * @param {string} field heading
 * @param {string} field name
 * @param {array} submitted filters
 * @example ( 'Mock heading', 'dealType', [ 'BSS/EWCS', 'GEF' ] )
 * @returns { heading: { text: 'Mock heading' }, items: [ { text: 'BSS-EWCS', href: `filters/remove/dealType/BSS-EWCS`, value: 'BSS-EWCS' } ] }
 */
const generateSelectedFiltersObject = (
  heading,
  fieldName,
  submittedFieldFilters,
) => ({
  heading: {
    text: heading,
  },
  items: submittedFieldFilters.map((fieldValue) => {
    const formattedFieldValue = formatFieldValue(fieldValue);

    return {
      text: fieldValue,
      href: `filters/remove/${fieldName}/${formattedFieldValue}`,
      formattedFieldValue,
    };
  }),
});

/**
 * Create an object for all selected submissionType filters.
 * This will used in mojFilter component - selectedFilters.categories.
 *
 * @param {string} field name
 * @param {object} submitted submissionType filters
 * @example ( ['Automatic Inclusion Notice', 'Manual Inclusion Notice'] )
 * @returns generateSelectedFiltersObject('Notice Type', 'submissionType', ['Automatic Inclusion Notice', 'Manual Inclusion Notice'])
 */
const selectedSubmissionTypeFilters = (fieldName, submittedFilters) =>
  generateSelectedFiltersObject(
    CONTENT_STRINGS.DASHBOARD_FILTERS.FILTER_HEADINGS.NOTICE_TYPE,
    fieldName,
    submittedFilters,
  );

/**
 * Map true/false boolean to Issued/Unissued string.
 *
 * @param {boolean} the submitted filter value
 * @example ( true )
 * @returns 'Issued'
 */
const mapIssuedValueToText = (hasBeenIssued) => {
  if (hasBeenIssued) {
    return CONTENT_STRINGS.DASHBOARD_FILTERS.BESPOKE_FILTER_VALUES.FACILITIES.ISSUED;
  }

  return CONTENT_STRINGS.DASHBOARD_FILTERS.BESPOKE_FILTER_VALUES.FACILITIES.UNISSUED;
};

/**
 * Create an object for all selected hasBeenIssued filters.
 * This will used in mojFilter component - selectedFilters.categories.
 *
 * @param {object} submitted hasBeenIssued filters
 * @example ( [true, false] )
 * @returns generateSelectedFiltersObject('Facility stage', 'hasBeenIssued', ['Issued', 'Unissued'])
 */
const selectedHasBeenIssuedFilters = (
  heading,
  fieldName,
  submittedFilters,
) => {
  const mappedFilters = submittedFilters.map((value) =>
    mapIssuedValueToText(value));

  const selectedFiltersObj = generateSelectedFiltersObject(
    heading,
    fieldName,
    mappedFilters,
  );

  return selectedFiltersObj;
};

module.exports = {
  generateSelectedFiltersObject,
  selectedSubmissionTypeFilters,
  mapIssuedValueToText,
  selectedHasBeenIssuedFilters,
};
