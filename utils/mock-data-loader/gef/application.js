const {
  EXPORTER_COMPLETED,
  EXPORTER_NO_INDUSTRIES,
} = require('./exporter');

const APPLICATION = [{
  // not started
  bank: { id: '9' },
  bankInternalRefName: 'Barclays 123',
  additionalRefName: null,
  mandatoryVersionId: '123', // further down the line you may want exact mongoIDs
  exporter: EXPORTER_COMPLETED,
}, {
  // in progress
  bank: { id: '9' },
  bankInternalRefName: 'UKEF Test 123',
  additionalRefName: '',
  mandatoryVersionId: '123',
  exporter: EXPORTER_NO_INDUSTRIES,
}, {
  // completed
  bank: { id: '9' },
  bankInternalRefName: 'HSBC 123',
  additionalRefName: 'Some Additional Reference',
  mandatoryVersionId: '123',
  exporter: EXPORTER_COMPLETED,
}, {
  // in progress - no exporter
  bank: { id: '9' },
  bankInternalRefName: 'UKEF Test 123',
  additionalRefName: '',
  mandatoryVersionId: '123',
  exporter: {},
}];

module.exports = APPLICATION;
