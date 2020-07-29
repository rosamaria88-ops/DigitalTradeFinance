const moment = require('moment');
const { findOneDeal } = require('./deal.controller');
const { userHasAccessTo } = require('../users/checks');
const { updateLoanInDeal } = require('./loans.controller');
const loanIssueFacilityValidationErrors = require('../validation/loan-issue-facility');

const formattedTimestamp = (timestamp, userTimezone) => {
  const targetTimezone = userTimezone;
  const utc = moment(parseInt(timestamp, 10));
  const localisedTimestamp = utc.tz(targetTimezone);
  const formatted = localisedTimestamp.format();
  return formatted;
};

const createTimestamp = (submittedValues, fieldName) => {
  const day = submittedValues[`${fieldName}-day`];
  const month = submittedValues[`${fieldName}-month`];
  const year = submittedValues[`${fieldName}-year`];

  const momentDate = moment().set({
    date: Number(day),
    month: Number(month) - 1, // months are zero indexed
    year: Number(year),
  });

  return moment(momentDate).utc().valueOf().toString();
};

const updateRequestedCoverStartDate = (deal, loan) => {
  const modifiedLoan = loan;

  const {
    'requestedCoverStartDate-day': requestedCoverStartDateDay,
    'requestedCoverStartDate-month': requestedCoverStartDateMonth,
    'requestedCoverStartDate-year': requestedCoverStartDateYear,
  } = modifiedLoan;

  const hasRequestedCoverStartDate = (requestedCoverStartDateDay
    && requestedCoverStartDateMonth
    && requestedCoverStartDateYear);

  if (hasRequestedCoverStartDate) {
    modifiedLoan.requestedCoverStartDate = createTimestamp(modifiedLoan, 'requestedCoverStartDate');
    delete modifiedLoan['requestedCoverStartDate-day'];
    delete modifiedLoan['requestedCoverStartDate-month'];
    delete modifiedLoan['requestedCoverStartDate-year'];
  } else {
    modifiedLoan.requestedCoverStartDate = deal.details.submissionDate;
  }

  return modifiedLoan;
};

exports.updateLoanIssueFacility = async (req, res) => {
  const {
    loanId,
  } = req.params;

  await findOneDeal(req.params.id, async (deal) => {
    if (deal) {
      if (!userHasAccessTo(req.user, deal)) {
        res.status(401).send();
      }

      const loan = deal.loanTransactions.items.find((l) =>
        String(l._id) === loanId); // eslint-disable-line no-underscore-dangle

      if (!loan) {
        return res.status(404).send();
      }

      let modifiedLoan = {
        _id: loanId,
        ...loan,
        ...req.body,
      };

      modifiedLoan.issuedDate = createTimestamp(req.body, 'issuedDate');

      // modifiedLoan.requestedCoverStartDate = requestedCoverStartDateValue(deal, modifiedLoan);
      modifiedLoan = updateRequestedCoverStartDate(deal, modifiedLoan);

      const validationErrors = loanIssueFacilityValidationErrors(
        modifiedLoan,
        formattedTimestamp(deal.details.submissionDate, req.user.timezone),
        formattedTimestamp(modifiedLoan.issuedDate, req.user.timezone),
        formattedTimestamp(modifiedLoan.requestedCoverStartDate, req.user.timezone),
      );

      if (validationErrors.count === 0) {
        modifiedLoan.facilityIssued = true;
      }

      const updatedLoan = await updateLoanInDeal(req.params, req.user, deal, modifiedLoan);

      if (validationErrors.count !== 0) {
        return res.status(400).send({
          validationErrors,
          loan: updatedLoan,
        });
      }

      return res.status(200).send(updatedLoan);
    }
    return res.status(404).send();
  });
};
