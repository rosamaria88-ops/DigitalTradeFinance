import express from 'express';
import api from '../../../api';
import {
  provide,
  LOAN,
  DEAL,
  CURRENCIES,
} from '../../api-data-provider';
import {
  requestParams,
  postToApi,
  errorHref,
  mapCurrencies,
  generateErrorSummary,
} from '../../../helpers';
import {
  loanGuaranteeDetailsValidationErrors,
  loanFinancialDetailsValidationErrors,
  loanDatesRepaymentsValidationErrors,
  loanPreviewValidationErrors,
} from './pageSpecificValidationErrors';
import completedLoanForms from './completedForms';
import formDataMatchesOriginalData from '../formDataMatchesOriginalData';
import canIssueFacility from '../canIssueFacility';
import isDealEditable from '../isDealEditable';

const router = express.Router();

const userCanAccessLoan = (user, deal) => {
  if (!user.roles.includes('maker')) {
    return false;
  }

  const { status } = deal.details;

  if (status === 'Ready for checker\'s approval'
    || status === 'Acknowledged by UKEF'
    || status === 'Accepted by UKEF (with conditions)'
    || status === 'Accepted by UKEF (without conditions)'
    || status === 'Submitted') {
    return false;
  }

  return true;
};

const userCanAccessLoanPreview = (user) => {
  if (!user.roles.includes('maker')) {
    return false;
  }

  return true;
};

const handleBankReferenceNumberField = (loanBody) => {
  const modifiedLoan = loanBody;
  const {
    facilityStage,
    'facilityStageConditional-bankReferenceNumber': conditionalBankReferenceNumber,
    'facilityStageUnconditional-bankReferenceNumber': unconditionalBankReferenceNumber,
  } = modifiedLoan;

  if (facilityStage === 'Conditional') {
    modifiedLoan.bankReferenceNumber = conditionalBankReferenceNumber;
  } else if (facilityStage === 'Unconditional') {
    modifiedLoan.bankReferenceNumber = unconditionalBankReferenceNumber;
  }

  delete modifiedLoan['facilityStageConditional-bankReferenceNumber'];
  delete modifiedLoan['facilityStageUnconditional-bankReferenceNumber'];

  return modifiedLoan;
};

const handlePremiumFrequencyField = (loanBody) => {
  const modifiedLoan = loanBody;

  const {
    premiumType,
    premiumFrequency: existingPremiumFrequency,
    inAdvancePremiumFrequency,
    inArrearPremiumFrequency,
  } = modifiedLoan;

  const premiumFrequencyValue = () => {
    if (premiumType === 'In advance') {
      return inAdvancePremiumFrequency;
    }

    if (premiumType === 'In arrear') {
      return inArrearPremiumFrequency;
    }

    if (existingPremiumFrequency) {
      return existingPremiumFrequency;
    }

    return '';
  };

  modifiedLoan.premiumFrequency = premiumFrequencyValue();

  delete modifiedLoan.inAdvancePremiumFrequency;
  delete modifiedLoan.inArrearPremiumFrequency;

  return modifiedLoan;
};

router.get('/contract/:_id/loan/create', async (req, res) => {
  const { _id: dealId, userToken } = requestParams(req);
  const { _id, loanId } = await api.createDealLoan(dealId, userToken); // eslint-disable-line no-underscore-dangle

  return res.redirect(`/contract/${_id}/loan/${loanId}/guarantee-details`); // eslint-disable-line no-underscore-dangle
});

router.get('/contract/:_id/loan/:loanId/guarantee-details', provide([LOAN, DEAL]), async (req, res) => {
  const {
    dealId,
    loan,
    validationErrors,
  } = req.apiData.loan;

  const { user } = req.session;

  if (!userCanAccessLoan(user, req.apiData.deal)) {
    return res.redirect('/');
  }

  const completedForms = completedLoanForms(validationErrors);

  return res.render('loan/loan-guarantee-details.njk', {
    dealId,
    loan,
    validationErrors: loanGuaranteeDetailsValidationErrors(validationErrors, loan),
    completedForms,
    user: req.session.user,
  });
});

router.post('/contract/:_id/loan/:loanId/guarantee-details', async (req, res) => {
  const { _id: dealId, loanId, userToken } = requestParams(req);

  const modifiedBody = handleBankReferenceNumberField(req.body);

  await postToApi(
    api.updateDealLoan(
      dealId,
      loanId,
      modifiedBody,
      userToken,
    ),
    errorHref,
  );

  const redirectUrl = `/contract/${dealId}/loan/${loanId}/financial-details`;
  return res.redirect(redirectUrl);
});

router.get('/contract/:_id/loan/:loanId/financial-details', provide([LOAN, DEAL, CURRENCIES]), async (req, res) => {
  const {
    dealId,
    loan,
    validationErrors,
  } = req.apiData.loan;
  const { currencies } = req.apiData;

  const { user } = req.session;

  if (!userCanAccessLoan(user, req.apiData.deal)) {
    return res.redirect('/');
  }

  const completedForms = completedLoanForms(validationErrors);

  return res.render('loan/loan-financial-details.njk', {
    dealId,
    loan,
    currencies: mapCurrencies(currencies, loan.currency),
    validationErrors: loanFinancialDetailsValidationErrors(validationErrors, loan),
    completedForms,
    user: req.session.user,
  });
});

router.post('/contract/:_id/loan/:loanId/financial-details', async (req, res) => {
  const { _id: dealId, loanId, userToken } = requestParams(req);

  await postToApi(
    api.updateDealLoan(
      dealId,
      loanId,
      req.body,
      userToken,
    ),
    errorHref,
  );

  const redirectUrl = `/contract/${dealId}/loan/${loanId}/dates-repayments`;
  return res.redirect(redirectUrl);
});

router.get('/contract/:_id/loan/:loanId/dates-repayments', provide([LOAN, DEAL]), async (req, res) => {
  const {
    dealId,
    loan,
    validationErrors,
  } = req.apiData.loan;

  const { user } = req.session;

  if (!userCanAccessLoan(user, req.apiData.deal)) {
    return res.redirect('/');
  }

  const completedForms = completedLoanForms(validationErrors);

  return res.render('loan/loan-dates-repayments.njk', {
    dealId,
    loan,
    validationErrors: loanDatesRepaymentsValidationErrors(validationErrors, loan),
    completedForms,
    user: req.session.user,
  });
});

router.post('/contract/:_id/loan/:loanId/dates-repayments', async (req, res) => {
  const { _id: dealId, loanId, userToken } = requestParams(req);

  const modifiedBody = handlePremiumFrequencyField(req.body);

  await postToApi(
    api.updateDealLoan(
      dealId,
      loanId,
      modifiedBody,
      userToken,
    ),
    errorHref,
  );

  const redirectUrl = `/contract/${dealId}/loan/${loanId}/preview`;
  return res.redirect(redirectUrl);
});

router.get('/contract/:_id/loan/:loanId/preview', provide([LOAN]), async (req, res) => {
  const { loanId, userToken } = requestParams(req);
  const {
    dealId,
    loan,
    validationErrors,
  } = req.apiData.loan;

  const { user } = req.session;

  if (!userCanAccessLoanPreview(user)) {
    return res.redirect('/');
  }

  // POST to api to flag that we have viewed preview page.
  // this is required specifically for other Loan forms/pages, to match the existing UX/UI.
  const updatedLoan = {
    ...loan,
    viewedPreviewPage: true,
  };

  await postToApi(
    api.updateDealLoan(
      dealId,
      loanId,
      updatedLoan,
      userToken,
    ),
  );

  // TODO: make similar to other routes, using page specific function.
  let formattedValidationErrors;
  if (validationErrors.count !== 0) {
    formattedValidationErrors = generateErrorSummary(
      loanPreviewValidationErrors(validationErrors, dealId, loanId),
      errorHref,
    );
  }

  const completedForms = completedLoanForms(validationErrors);

  return res.render('loan/loan-preview.njk', {
    dealId,
    loan,
    validationErrors: formattedValidationErrors,
    completedForms,
    user: req.session.user,
  });
});

router.post('/contract/:_id/loan/:loanId/save-go-back', provide([LOAN]), async (req, res) => {
  const { _id: dealId, loanId, userToken } = requestParams(req);
  const { loan } = req.apiData.loan;

  let modifiedBody = handleBankReferenceNumberField(req.body);
  modifiedBody = handlePremiumFrequencyField(req.body);

  // UI form submit only has the currency code. API has a currency object.
  // to check if something has changed, only use the currency code.
  const mappedOriginalData = loan;

  if (loan.currency && loan.currency.id) {
    mappedOriginalData.currency = loan.currency.id;
  }
  delete mappedOriginalData._id; // eslint-disable-line no-underscore-dangle
  delete mappedOriginalData.status;

  if (!formDataMatchesOriginalData(modifiedBody, mappedOriginalData)) {
    await postToApi(
      api.updateDealLoan(
        dealId,
        loanId,
        modifiedBody,
        userToken,
      ),
    );
  }

  const redirectUrl = `/contract/${req.params._id}`; // eslint-disable-line no-underscore-dangle
  return res.redirect(redirectUrl);
});

router.get('/contract/:_id/loan/:loanId/issue-facility', provide([LOAN, DEAL]), async (req, res) => {
  const { _id: dealId } = requestParams(req);
  const { loan } = req.apiData.loan;
  const { user } = req.session;

  if (!canIssueFacility(user.roles, req.apiData.deal, loan)) {
    return res.redirect('/');
  }

  return res.render('loan/loan-issue-facility.njk', {
    dealId,
    user,
    loan,
  });
});

router.post('/contract/:_id/loan/:loanId/issue-facility', async (req, res) => {
  const { _id: dealId, loanId, userToken } = requestParams(req);
  const { user } = req.session;

  const { validationErrors, loan } = await postToApi(
    api.updateLoanIssueFacility(
      dealId,
      loanId,
      req.body,
      userToken,
    ),
    errorHref,
  );

  if (validationErrors) {
    return res.render('loan/loan-issue-facility.njk', {
      user,
      validationErrors,
      loan,
      dealId,
    });
  }

  return res.redirect(`/contract/${dealId}`);
});

router.get('/contract/:_id/loan/:loanId/confirm-requested-cover-start-date', provide([LOAN]), async (req, res) => {
  const { _id: dealId } = requestParams(req);
  const { loan } = req.apiData.loan;

  return res.render('_shared-pages/confirm-requested-cover-start-date.njk', {
    dealId,
    user: req.session.user,
    facility: loan,
  });
});

router.post('/contract/:_id/loan/:loanId/confirm-requested-cover-start-date', provide([LOAN]), async (req, res) => {
  const { _id: dealId, loanId, userToken } = requestParams(req);

  const { loan } = req.apiData.loan;

  let requestedCoverValidationErrors;

  if (req.body.needToChangeRequestedCoverStartDate) {
    if (!req.session.confirmedRequestedCoverStartDates) {
      req.session.confirmedRequestedCoverStartDates = {};
    }

    if (!req.session.confirmedRequestedCoverStartDates[dealId]) {
      req.session.confirmedRequestedCoverStartDates[dealId] = [loanId];
    } else if (!req.session.confirmedRequestedCoverStartDates[dealId].includes(loanId)) {
      req.session.confirmedRequestedCoverStartDates[dealId].push(loanId);
    }
  }

  if (req.body.needToChangeRequestedCoverStartDate === 'true') {
    if (!req.body['requestedCoverStartDate-day'] || !req.body['requestedCoverStartDate-day'] || !req.body['requestedCoverStartDate-day']) {
      requestedCoverValidationErrors = {
        count: 1,
        errorList: {
          requestedCoverStartDate: {
            text: 'Enter the Cover End Date', order: '1',
          },
        },
        summary: [{
          text: 'Enter the Cover End Date',
          href: '#requestedCoverStartDate',
        }],
      };
    } else {
      const today = new Date();
      const newLoanDetails = {
        ...req.body,
        previousCoverStartDate: `${loan['requestedCoverStartDate-day']}/${loan['requestedCoverStartDate-month']}/${loan['requestedCoverStartDate-year']}`,
        dateOfCoverChange: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
      };

      const { validationErrors } = await postToApi(
        api.updateDealLoan(
          dealId,
          loanId,
          newLoanDetails,
          userToken,
        ),
        errorHref,
      );

      requestedCoverValidationErrors = {
        ...validationErrors,
      };
    }

    if (
      requestedCoverValidationErrors
      && requestedCoverValidationErrors.errorList
      && requestedCoverValidationErrors.errorList.requestedCoverStartDate
    ) {
      return res.render('_shared-pages/confirm-requested-cover-start-date.njk', {
        dealId,
        user: req.session.user,
        facility: loan,
        validationErrors: requestedCoverValidationErrors,
        enteredValues: req.body,
        needToChangeRequestedCoverStartDate: req.body.needToChangeRequestedCoverStartDate,
      });
    }
  }

  const redirectUrl = `/contract/${dealId}`;
  return res.redirect(redirectUrl);
});

router.get('/contract/:_id/loan/:loanId/delete', provide([DEAL, LOAN]), async (req, res) => {
  const { user } = req.session;
  const { loan } = req.apiData.loan;

  if (isDealEditable(req.apiData.deal, user)) {
    return res.render('loan/loan-delete.njk', {
      deal: req.apiData.deal,
      loan,
      user: req.session.user,
    });
  }

  const redirectUrl = `/contract/${req.params._id}`; // eslint-disable-line no-underscore-dangle
  return res.redirect(redirectUrl);
});

router.post('/contract/:_id/loan/:loanId/delete', async (req, res) => {
  const { _id: dealId, loanId, userToken } = requestParams(req);

  await postToApi(
    api.deleteDealLoan(
      dealId,
      loanId,
      userToken,
    ),
    errorHref,
  );

  req.flash('successMessage', {
    text: `Loan #${loanId} has been deleted`,
  });

  return res.redirect(`/contract/${dealId}`);
});

export default router;
