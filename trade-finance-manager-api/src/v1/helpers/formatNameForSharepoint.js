/*
Exporter
********
Ensure exporter name does not have `&` and is appropriately replaced with `and` due to
MS Graph API restriction.

Excepted error message when `&` is present:
Status: 400
Message: Invalid filter clause: There is an unterminated string literal

Files
******
Filenames for the documentation upload  shouldn’t include special characters as this breaks the sharepoint/estore,
valid characters listed below:

1. alphabetic characters A through Z
2. numeric characters 0 through 9
3. -
4. _

see
https://ukef-dtfs.atlassian.net/jira/software/projects/DTFS2/boards/2?assignee=5e42c0d090dfb70c9e60741b&selectedIssue=DTFS2-509
*/

/**
 * Replace all special characters with underscore
 * @param {string} name (i.e. MGA UKEF 1.docx))
 * @returns {string} (i.e. MGA_UKEF_1.docx)
 */
const formatNameForSharepoint = (name) => name.replace(/[^0-9a-zA-Z_-\S]|, /g, '_');

/**
 * Replace all special characters with blank space
 * and `&` with `and`.
 * @param {string} exporter (i.e. St. Michael Cosmetics)
 * @returns {string} (i.e. St Michael Cosmetics)
 */
const formatExporterNameForSharepoint = (exporter) => {
  // Remove all special characters
  let name = exporter.replace(/[\W_]+/g, ' ');
  // Replaces all `&` with `and`
  name = name.replaceAll('&', 'and');
  // Remove last empty character (if there is one)
  name = name.replace(/((\s*\S+)*)\s*/, '$1');
  return name;
};

module.exports = { formatNameForSharepoint, formatExporterNameForSharepoint };
