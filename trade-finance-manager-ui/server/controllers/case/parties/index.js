const api = require('../../../api');
const { userCanEdit, isEmptyString, partyType } = require('./helpers');
const validatePartyURN = require('./partyUrnValidation.validate');
const { hasAmendmentInProgressDealStage, amendmentsInProgressByDeal } = require('../../helpers/amendments.helper');
const CONSTANTS = require('../../../constants');

const { DEAL } = CONSTANTS;

/**
 * Renders all parties URN page
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {Object} Express response, which renders all party URN page.
 */
const getAllParties = async (req, res) => {
  try {
    const dealId = req.params._id;
    const deal = await api.getDeal(dealId);
    const { data: amendments } = await api.getAmendmentsByDealId(dealId);
    const { user } = req.session;

    if (!deal && !deal.tfm) {
      console.error('Invalid deal.');
      return res.redirect('/not-found');
    }

    const hasAmendmentInProgress = await hasAmendmentInProgressDealStage(amendments);
    if (hasAmendmentInProgress) {
      deal.tfm.stage = DEAL.DEAL_STAGE.AMENDMENT_IN_PROGRESS;
    }
    const amendmentsInProgress = await amendmentsInProgressByDeal(amendments);

    const canEdit = userCanEdit(user);

    // Render all parties URN page
    return res.render('case/parties/parties.njk', {
      userCanEdit: canEdit,
      renderEditLink: canEdit,
      renderEditForm: false,
      deal: deal.dealSnapshot,
      tfm: deal.tfm,
      activePrimaryNavigation: 'manage work',
      activeSubNavigation: 'parties',
      dealId,
      user,
      hasAmendmentInProgress,
      amendmentsInProgress,
    });
  } catch (e) {
    console.error('Error rendering all parties page', { e });
    return res.redirect('/not-found');
  }
};

/**
 * Renders party specific URN edit page
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {Object} Express response as rendered party page.
 */
const getPartyDetails = async (req, res) => {
  try {
    const { user } = req.session;
    const party = partyType(req.url);

    const canEdit = userCanEdit(user);

    if (!canEdit) {
      console.error('Invalid user privilege.');
      return res.redirect('/not-found');
    }

    const dealId = req.params._id;
    const deal = await api.getDeal(dealId);

    if (!deal && !deal.tfm) {
      console.error('Invalid deal.');
      return res.redirect('/not-found');
    }

    if (!party) {
      console.error('Invalid party type specified.');
      return res.redirect('/not-found');
    }

    return res.render(`case/parties/edit/${party}.njk`, {
      userCanEdit: canEdit,
      renderEditLink: false,
      renderEditForm: true,
      activePrimaryNavigation: 'manage work',
      activeSubNavigation: 'parties',
      deal: deal.dealSnapshot,
      tfm: deal.tfm,
      dealId,
      user: req.session.user,
      urn: deal.tfm.parties[party].partyUrn,
    });
  } catch (e) {
    console.error('Error rendering party URN edit page', { e });
    return res.redirect('/not-found');
  }
};

/**
 * Renders party specific urn summary page
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {Object} Express response as rendered party page.
 */
const getPartyUrnDetails = async (req, res) => {
  try {
    const { user } = req.session;
    const party = partyType(req.url);

    const canEdit = userCanEdit(user);

    if (!canEdit) {
      console.error('Invalid user privilege.');
      return res.redirect('/not-found');
    }

    const dealId = req.params._id;
    const partyUrn = req.params.urn;
    const deal = await api.getDeal(dealId);

    if (!deal && !deal.tfm) {
      console.error('Invalid deal.');
      return res.redirect('/not-found');
    }

    if (!party) {
      console.error('Invalid party type specified.');
      return res.redirect('/not-found');
    }

    if (!partyUrn && !partyUrn.trim()) {
      console.error('Invalid party urn.');
      return res.redirect('/not-found');
    }

    // Fetches company information from URN
    const company = await api.getParty(partyUrn);

    if (!company || !company.data) {
      return res.render('case/parties/void.njk', {
        dealId,
        party,
      });
    }

    const name = company.data.length
      ? company.data[0].name
      : '';

    return res.render('case/parties/summary/party.njk', {
      userCanEdit: canEdit,
      renderEditLink: false,
      renderEditForm: true,
      activePrimaryNavigation: 'manage work',
      activeSubNavigation: 'parties',
      deal: deal.dealSnapshot,
      tfm: deal.tfm,
      dealId,
      user: req.session.user,
      urn: partyUrn,
      name,
      party,
    });
  } catch (e) {
    console.error('Error rendering party specific urn summary page', { e });
    return res.redirect('/not-found');
  }
};

/**
 * Post party URN summary page
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {Object} Express response as rendered confirm party URN page.
 */
const confirmPartyUrn = async (req, res) => {
  try {
    const party = partyType(req.url);
    const { user } = req.session;

    const canEdit = userCanEdit(user);

    if (!canEdit) {
      console.error('Invalid user privilege.');
      return res.redirect('/not-found');
    }

    const dealId = req.params._id;
    const deal = await api.getDeal(dealId);

    if (!deal && !deal.tfm) {
      console.error('Invalid deal.');
      return res.redirect('/not-found');
    }

    if (!party) {
      console.error('Invalid party type specified.');
      return res.redirect('/not-found');
    }

    /**
     * PartyURN input validation.
     * 1. Should be at least 3 numbers
     */
    const { partyUrn } = req.body;

    if (isEmptyString(partyUrn)) {
      const urnValidationErrors = [];

      const partyUrnParams = {
        urnValue: partyUrn,
        partyUrnRequired: deal.tfm.parties[party].partyUrnRequired,
        // index not required for these fields as only 1 URN box on page
        index: null,
        party,
        urnValidationErrors,
      };

      // Validates partyURN input
      const validationError = validatePartyURN(partyUrnParams);

      if (validationError.errorsObject) {
      // Render party specific page with error
        return res.render(`case/parties/edit/${party}.njk`, {
          userCanEdit: canEdit,
          renderEditLink: false,
          renderEditForm: true,
          activePrimaryNavigation: 'manage work',
          activeSubNavigation: 'parties',
          deal: deal.dealSnapshot,
          tfm: deal.tfm,
          dealId,
          user: req.session.user,
          errors: validationError.errorsObject.errors,
          urn: validationError.urn,
        });
      }
    }

    // Fetches company information from URN
    const company = await api.getParty(partyUrn);

    // Non-existent party urn
    if (!company && !company.data) {
      return res.render('case/parties/void.njk', {
        dealId,
        party,
      });
    }

    // Agent party only - Commission rate
    if (req.body.commissionRate) {
      req.session.commissionRate = req.body.commissionRate;
    }

    // Redirect to summary (confirmation) page
    return res.redirect(`/case/${dealId}/parties/${party}/summary/${partyUrn}`);
  } catch (e) {
    console.error('Error posting party URN summary page', { e });
    return res.redirect('/not-found');
  }
};

/**
 * Submits confirmed party URN to the TFM
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {Object} Express response, if successful then re-directed to all parties page
 */
const postPartyDetails = async (req, res) => {
  try {
    const { user } = req.session;

    delete req.body._csrf;

    if (!userCanEdit(user)) {
      return res.redirect('/not-found');
    }

    const dealId = req.params._id;
    const deal = await api.getDeal(dealId);

    if (!deal && !deal.tfm) {
      console.error('Invalid deal.');
      return res.redirect('/not-found');
    }

    const party = partyType(req.url);

    if (!party) {
      console.error('Invalid party type specified.');
      return res.redirect('/not-found');
    }

    const partyUrn = req.params.urn;

    if (!partyUrn && !partyUrn.trim()) {
      console.error('Invalid party urn.');
      return res.redirect('/not-found');
    }

    // Party URN
    const update = {
      [party]: {
        partyUrn,
      },
    };

    // Agent party only - Commission rate
    if (req.session.commissionRate) {
      update[party].commissionRate = req.session.commissionRate;
      delete req.session.commissionRate;
    }

    await api.updateParty(dealId, update);

    return res.redirect(`/case/${dealId}/parties`);
  } catch (e) {
    console.error('Error posting party URN to TFM', { e });
    return res.redirect('/not-found');
  }
};

const getBondIssuerPartyDetails = async (req, res) => {
  const { user } = req.session;

  const canEdit = userCanEdit(user);

  if (!canEdit) {
    console.error('Invalid user privilege.');
    return res.redirect('/not-found');
  }

  const dealId = req.params._id;
  const deal = await api.getDeal(dealId);

  if (!deal) {
    console.error('Invalid deal.');
    return res.redirect('/not-found');
  }

  return res.render('case/parties/edit/bonds-issuer.njk', {
    userCanEdit: canEdit,
    renderEditLink: false,
    renderEditForm: true,
    activePrimaryNavigation: 'manage work',
    activeSubNavigation: 'parties',
    deal: deal.dealSnapshot,
    user,
  });
};

const getBondBeneficiaryPartyDetails = async (req, res) => {
  const { user } = req.session;

  const canEdit = userCanEdit(user);

  if (!canEdit) {
    console.error('Invalid user privilege.');
    return res.redirect('/not-found');
  }

  const dealId = req.params._id;
  const deal = await api.getDeal(dealId);

  if (!deal) {
    console.error('Invalid deal.');
    return res.redirect('/not-found');
  }

  return res.render('case/parties/edit/bonds-beneficiary.njk', {
    userCanEdit: canEdit,
    renderEditLink: false,
    renderEditForm: true,
    activePrimaryNavigation: 'manage work',
    activeSubNavigation: 'parties',
    deal: deal.dealSnapshot,
    user,
  });
};

module.exports = {
  getPartyDetails,
  getPartyUrnDetails,
  confirmPartyUrn,
  postPartyDetails,
  getAllParties,
  getBondIssuerPartyDetails,
  getBondBeneficiaryPartyDetails,
};
