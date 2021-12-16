const MOCK_FACILITIES = [
  {
    _id: '10001',
    facilityType: 'bond',
    bondIssuer: 'Issuer',
    bondType: 'Advance payment guarantee',
    facilityStage: 'Unissued',
    ukefGuaranteeInMonths: '10',
    bondBeneficiary: 'test',
    guaranteeFeePayableByBank: '9.0000',
    facilityValue: '12345.00',
    currencySameAsSupplyContractCurrency: 'true',
    riskMarginFee: '10',
    coveredPercentage: '20',
    minimumRiskMarginFee: '30',
    ukefExposure: '2,469.00',
    feeType: 'At maturity',
    dayCountBasis: '365',
    currency: {
      text: 'USD - US Dollars',
      id: 'USD',
    },
    'coverEndDate-day': '20',
    'coverEndDate-month': '10',
    'coverEndDate-year': '2020',
  },
  {
    _id: '10002',
    facilityType: 'loan',
    createdDate: 1610369832226.0,
    facilityStage: 'Conditional',
    ukefGuaranteeInMonths: '12',
    bankReferenceNumber: '5678',
    guaranteeFeePayableByBank: '27.0000',
    lastEdited: 1610369832226.0,
    facilityValue: '1234.00',
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
    bankReferenceNumberRequiredForIssuance: true,
    requestedCoverStartDate: 1610369832226.0,
    issuedDate: 1610369832226.0,
    issueFacilityDetailsProvided: true,
    status: 'Acknowledged',
    ukefFacilityId: '65432',
    currency: {
      text: 'USD - US Dollars',
      id: 'USD',
    },
  },
];

module.exports = MOCK_FACILITIES;
