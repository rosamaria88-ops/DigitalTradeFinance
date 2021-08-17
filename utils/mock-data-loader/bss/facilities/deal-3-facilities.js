const {
  nowTimestamp,
  twoMonths,
  twoMonthsTimestamp,
  threeMonths,
} = require('../dates');

module.exports = [
	{
		"mockDealId": 3,
		"facilityType" : "bond",
		"createdDate" : nowTimestamp,
		"bondIssuer" : "",
		"bondType" : "Maintenance bond",
		"ukefGuaranteeInMonths" : null,
		"facilityStage" : "Issued",
		"requestedCoverStartDate-day": twoMonths.day,
		"requestedCoverStartDate-month": twoMonths.month,
		"requestedCoverStartDate-year": twoMonths.year,
		"coverEndDate-day": threeMonths.day,
		"coverEndDate-month": threeMonths.month,
		"coverEndDate-year": threeMonths.year,
		"uniqueIdentificationNumber" : "Test Bond",
		"bondBeneficiary" : "",
		"requestedCoverStartDate": twoMonthsTimestamp,
		"lastEdited": nowTimestamp,
		"facilityValue" : "600000.00",
		"currencySameAsSupplyContractCurrency" : "true",
		"currency" : {
			"text" : "GBP - UK Sterling",
			"id" : "GBP",
			"currencyId" : 12
		},
		"conversionRate" : null,
		"conversionRateDate-day" : null,
		"conversionRateDate-month" : null,
		"conversionRateDate-year" : null,
		"riskMarginFee" : "2",
		"coveredPercentage" : "60",
		"minimumRiskMarginFee" : "",
		"guaranteeFeePayableByBank" : "1.8000",
		"ukefExposure" : "360,000.00",
		"feeFrequency" : "Quarterly",
		"feeType" : "In arrear",
		"dayCountBasis" : "360"
	}
];