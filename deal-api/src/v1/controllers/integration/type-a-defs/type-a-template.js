const nillableNode = {
  '@': {
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:nil': 'true',
  },
};

const typeADeal = {
  '@': {
    action_code: '',
    action_name: '',
    application_group: '',
    message_type: 'A',
    portal_deal_id: '',
    revision_id: '',

  },
  General_information: {
    Deal_name: '',
    Bank_deal_id: '',
  },
  Application_route: '',
  Application_owner: '',
  Application_owner_email: '',
  Application_bank: '',
  Application_bank_co_hse_reg_number: '',
  UKEF_deal_id: '',
  Deal_information: {
    Exporter_and_indemnifier: {
      Customer_type: '',
      Exporter_co_hse_reg_number: '',
      Exporter_registration_source: 'Companies House',
      Exporter_name: '',
      Exporter_address: {
        Line1: '',
        Line2: '',
        Line3: '',
        Town: '',
        PostalCode: '',
        Country: '',
      },
      Exporter_correspondence_address: {
        Line1: '',
        Line2: '',
        Line3: '',
        Town: '',
        PostalCode: '',
        Country: '',
      },
      Industry_sector_code: '',
      Industry_sector_name: '',
      Industry_class_code: '',
      Industry_class_name: '',
      Sme_type: '',
      Description_of_export: '',
      Bank_security: '',
      Indemnifier_co_hse_reg_number: '',
      Indemnifier_name: '',
      Indemnifier_address: {
        Line1: '',
        Line2: '',
        Line3: '',
        Town: '',
        PostalCode: '',
        Country: '',
      },
      Indemnifier_correspondence_address: {
        Line1: '',
        Line2: '',
        Line3: '',
        Town: '',
        PostalCode: '',
        Country: '',
      },
    },
    Buyer: {
      Buyer_name: '',
      Buyer_country_code: '',
      Destination_country_code: '',
    },
    Financial: {
      Deal_currency_code: '',
      Conversion_rate: '',
      Conversion_date: '',
      Contract_value: '',
    },
  },
  Eligibility_checklist: {
    Ec_agents_check: '',
    Ec_initial_term_check: nillableNode,
    Ec_total_exposure_check: nillableNode,
    Ec_bond_issuance_check: nillableNode,
    Ec_industry_check: nillableNode,
    Ec_indemnifier_turnover_check: nillableNode,
    Ec_indemnifier_net_worth_check: nillableNode,
    Ec_indemnifier_liquidity_check: nillableNode,
    Ec_indemnifier_filed_accounts_check: nillableNode,
    Ec_indemnifier_watchlist_check: nillableNode,
    Ec_indemnifier_rating_check: nillableNode,
    Ec_internal_approval_check: nillableNode,
    Ec_third_party_check: nillableNode,
    Ec_bank_facility_letter_check: nillableNode,
    Ec_banks_normal_pricing_policies_check: nillableNode,
    Ec_fees_interest_frequency_check: nillableNode,
    Ec_affiliate_to_the_supplier_check: nillableNode,
    Ec_requested_cover_start_date_check: nillableNode,
    Ec_supplier_declaration_check: nillableNode,
    Ec_affected_transaction_check: nillableNode,
    Ec_bank_complied_check: nillableNode,
    Ec_bank_sole_beneficial_owner_check: nillableNode,
    Ec_disposal_risk_transfer_check: nillableNode,
    Ec_consent_obligor_check: nillableNode,
    Ec_agreement_with_obligor_check: nillableNode,
    Agent_name: '',
    Agent_address: {
      Line1: '',
      Line2: '',
      Line3: '',
      Town: '',
      PostalCode: '',
      Country: '',
    },
  },
  Facilities: {
    BSS: [],
    EWCS: [],
  },
  Deal_summary: {
    Deal_no_facilities: '',
    Deal_total_value_deal_cur: '',
    Deal_total_exposure_gbp: '',
    Deal_total_premium_gbp: '',
    Deal_total_exposure_deal_cur: '',
    Deal_total_premium_deal_cur: '',
    BSS_no_facilities: '',
    BSS_total_exposure_gbp: '',
    BSS_total_premium_gbp: '',
    BSS_total_exposure_deal_cur: '',
    BSS_total_premium_deal_cur: '',
    EWCS_no_facilities: '',
    EWCS_total_exposure_gbp: '',
    EWCS_total_premium_gbp: '',
    EWCS_total_exposure_deal_cur: '',
    EWCS_total_premium_deal_cur: '',
  },
  Deal_files: {},
};

const typeABSS = {
  UKEF_BSS_facility_id: '',
  BSS_Guarantee_details: {
    BSS_portal_facility_id: '',
    BSS_bank_id: '',
    BSS_issuer: '',
    BSS_type: '',
    BSS_stage: '',
    BSS_beneficiary: '',
  },
  BSS_Financial_details: {
    BSS_value: '',
    BSS_currency_code: '',
    BSS_conversion_rate_deal: '',
    BSS_conversion_date_deal: '',
    BSS_fee_rate: '',
    BSS_fee_perc: '',
    BSS_guarantee_perc: '',
    BSS_max_liability: '',
    BSS_min_quarterly_fee: '',
  },
  BSS_Dates_repayments: {
    BSS_premium_freq: nillableNode,
    BSS_premium_type: '',
    BSS_cover_start_date: '',
    BSS_issue_date: '',
    BSS_cover_end_date: '',
    BSS_cover_period: '',
    BSS_day_basis: '',
  },

};

const typeAEWCS = {
  UKEF_EWCS_facility_id: '',
  EWCS_Guarantee_details: {
    EWCS_portal_facility_id: '',
    EWCS_bank_id: '',
    EWCS_stage: '',
  },
  EWCS_Financial_details: {
    EWCS_value: '',
    EWCS_currency_code: '',
    EWCS_conversion_rate_deal: '',
    EWCS_conversion_date_deal: '',
    EWCS_disbursement_amount: '',
    EWCS_interest_rate: '',
    EWCS_fee_perc: '',
    EWCS_guarantee_perc: '',
    EWCS_max_liability: '',
    EWCS_min_quarterly_fee: '',
  },
  EWCS_Dates_repayments: {
    EWCS_premium_type: '',
    EWCS_premium_freq: nillableNode,
    EWCS_cover_start_date: '',
    EWCS_issue_date: '',
    EWCS_cover_end_date: '',
    EWCS_cover_period: '',
    EWCS_day_basis: '',
  },

};

module.exports = {
  typeADeal,
  typeABSS,
  typeAEWCS,
  nillableNode,
};
