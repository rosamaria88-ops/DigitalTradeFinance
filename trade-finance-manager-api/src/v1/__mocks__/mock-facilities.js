const MOCK_FACILITIES = [
  {
    _id: '61f7a4edcf809301e78fbe53',
    dealId: 'AIN_DEAL',
    type: 'Bond',
    bondIssuer: 'Issuer',
    bondType: 'Advance payment guarantee',
    facilityStage: 'Unissued',
    hasBeenIssued: false,
    ukefGuaranteeInMonths: '10',
    bondBeneficiary: 'test',
    guaranteeFeePayableByBank: '9.0000',
    value: '12345.00',
    currencySameAsSupplyContractCurrency: 'true',
    riskMarginFee: '10',
    coveredPercentage: '20',
    minimumRiskMarginFee: '30',
    ukefExposure: '2,469.00',
    feeType: 'At maturity',
    feeFrequency: '12',
    dayCountBasis: '365',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
    },
    'coverEndDate-day': '20',
    'coverEndDate-month': '10',
    'coverEndDate-year': '2020',
    name: '12345678',
    submittedAsIssuedDate: 1606900616651,
    requestedCoverStartDate: '1606900616652',
    ukefFacilityId: '123',
  },
  {
    _id: '61f7a4edcf809301e78fbe53',
    ukefFacilityId: '123',
    dealId: '61f7a4edcf809301e78fbe41',
    type: 'Loan',
    createdDate: 1610369832226.0,
    facilityStage: 'Conditional',
    hasBeenIssued: false,
    ukefGuaranteeInMonths: '12',
    name: '5678',
    guaranteeFeePayableByBank: '27.0000',
    updatedAt: 1610369832226.0,
    value: '1234.00',
    currencySameAsSupplyContractCurrency: 'true',
    interestMarginFee: '30',
    coveredPercentage: '20',
    minimumQuarterlyFee: '10',
    ukefExposure: '246.80',
    premiumType: 'At maturity',
    dayCountBasis: '365',
    'issuedDate-day': '25',
    'issuedDate-month': '08',
    'issuedDate-year': '2020',
    'coverEndDate-day': '24',
    'coverEndDate-month': '09',
    'coverEndDate-year': '2020',
    disbursementAmount: '1,234.00',
    issueFacilityDetailsStarted: true,
    nameRequiredForIssuance: true,
    requestedCoverStartDate: 1610369832226.0,
    issuedDate: 1610369832226.0,
    issueFacilityDetailsProvided: true,
    status: 'Acknowledged',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
    },
    feeType: 'At maturity',
    feeFrequency: '12',
    hasBeenIssuedAndAcknowledged: true,
  },
  {
    _id: 'MOCK_DEAL_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED_BOND',
    dealId: 'MOCK_DEAL_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED',
    type: 'Bond',
    bondIssuer: 'Issuer',
    bondType: 'Advance payment guarantee',
    facilityStage: 'Issued',
    hasBeenIssued: true,
    previousFacilityStage: 'Unissued',
    ukefGuaranteeInMonths: '10',
    bondBeneficiary: 'test',
    guaranteeFeePayableByBank: '9.0000',
    value: '12345.00',
    currencySameAsSupplyContractCurrency: 'true',
    riskMarginFee: '10',
    coveredPercentage: '20',
    minimumRiskMarginFee: '30',
    ukefExposure: '2,469.00',
    feeType: 'At maturity',
    dayCountBasis: '365',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
    },
    'coverEndDate-day': '20',
    'coverEndDate-month': '10',
    'coverEndDate-year': '2020',
    status: 'Submitted',
    ukefFacilityId: '123',
  },
  {
    _id: 'MOCK_DEAL_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED_LOAN',
    dealId: 'MOCK_DEAL_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED',
    type: 'Loan',
    createdDate: 1610369832226.0,
    facilityStage: 'Unconditional',
    hasBeenIssued: true,
    previousFacilityStage: 'Conditional',
    ukefGuaranteeInMonths: '12',
    name: '5678',
    guaranteeFeePayableByBank: '27.0000',
    updatedAt: 1610369832226.0,
    value: '1234.00',
    currencySameAsSupplyContractCurrency: 'true',
    interestMarginFee: '30',
    coveredPercentage: '20',
    minimumQuarterlyFee: '10',
    ukefExposure: '246.80',
    premiumType: 'At maturity',
    dayCountBasis: '365',
    'coverEndDate-day': '24',
    'coverEndDate-month': '09',
    'coverEndDate-year': '2020',
    disbursementAmount: '1,234.00',
    issueFacilityDetailsStarted: true,
    nameRequiredForIssuance: true,
    requestedCoverStartDate: 1610369832226.0,
    status: 'Submitted',
    ukefFacilityId: '123',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
    },
  },
  {
    _id: 'MOCK_DEAL_FACILITY_ISSUED_BOND',
    dealId: 'MOCK_DEAL_ISSUED_FACILTIES',
    type: 'Bond',
    bondIssuer: 'Issuer',
    bondType: 'Advance payment guarantee',
    facilityStage: 'Issued',
    hasBeenIssued: true,
    previousFacilityStage: 'Unissued',
    ukefGuaranteeInMonths: '10',
    bondBeneficiary: 'test',
    guaranteeFeePayableByBank: '9.0000',
    value: '12345.00',
    currencySameAsSupplyContractCurrency: 'true',
    riskMarginFee: '10',
    coveredPercentage: '20',
    minimumRiskMarginFee: '30',
    ukefExposure: '2,469.00',
    feeType: 'At maturity',
    dayCountBasis: '365',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
    },
    requestedCoverStartDate: 1610369832226,
    status: 'Submitted',
    ukefFacilityId: '123',
  },
  {
    _id: 'MOCK_DEAL_FACILITY_ISSUED_LOAN',
    dealId: 'MOCK_DEAL_ISSUED_FACILTIES',
    type: 'Loan',
    createdDate: 1610369832226.0,
    facilityStage: 'Unconditional',
    hasBeenIssued: true,
    previousFacilityStage: 'Conditional',
    ukefGuaranteeInMonths: '12',
    name: '5678',
    guaranteeFeePayableByBank: '27.0000',
    updatedAt: 1610369832226.0,
    value: '1234.00',
    currencySameAsSupplyContractCurrency: 'true',
    interestMarginFee: '30',
    coveredPercentage: '20',
    minimumQuarterlyFee: '10',
    ukefExposure: '246.80',
    premiumType: 'At maturity',
    dayCountBasis: '365',
    'coverEndDate-day': '11',
    'coverEndDate-month': '01',
    'coverEndDate-year': '2023',
    disbursementAmount: '1,234.00',
    issueFacilityDetailsStarted: true,
    nameRequiredForIssuance: true,
    requestedCoverStartDate: 1610369832226.0,
    status: 'Submitted',
    ukefFacilityId: '123',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
    },
  },
  {
    _id: '61f7a4edcf809301e78fbe53',
    ukefFacilityId: '123',
    dealId: '61f7a4edcf809301e78fbe41',
    type: 'Loan',
    createdDate: 1610369832226.0,
    facilityStage: 'Conditional',
    hasBeenIssued: false,
    ukefGuaranteeInMonths: '12',
    name: '5678',
    guaranteeFeePayableByBank: '27.0000',
    updatedAt: 1610369832226.0,
    value: '1,234.00',
    currencySameAsSupplyContractCurrency: 'true',
    interestMarginFee: '30',
    coveredPercentage: '20',
    minimumQuarterlyFee: '10',
    ukefExposure: '2,460.123',
    premiumType: 'At maturity',
    dayCountBasis: '365',
    'issuedDate-day': '25',
    'issuedDate-month': '08',
    'issuedDate-year': '2020',
    'coverEndDate-day': '24',
    'coverEndDate-month': '09',
    'coverEndDate-year': '2020',
    disbursementAmount: '1,234,567.123',
    issueFacilityDetailsStarted: true,
    nameRequiredForIssuance: true,
    requestedCoverStartDate: 1610369832226.0,
    issuedDate: 1610369832226.0,
    issueFacilityDetailsProvided: true,
    status: 'Acknowledged',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
    },
    feeType: 'At maturity',
    feeFrequency: '12',
    hasBeenIssuedAndAcknowledged: true,
  },
];

module.exports = { MOCK_FACILITIES };
