/*
"dealIdentifier":                 Deal ACBS ID,
"facilityIdentifier":             UKEF facilityId,
"portfolioIdentifier":            Facility portfolio identifier. Default to "E1"
"dealBorrowerIdentifier":         exporter ACBS ID
Look up the Obligor ACBS Customer record
Use Party URN on the Deal = Alternate Customer Id.
Use ACBS Customer Id
Note there may be multiple customers in ACBS with the same Party URN.
Use the first record found,
"maximumLiability":               UKEF Exposure
"productTypeId":                  Facility Type i.e. 250 for BOND ??? What is LOAN and GEF?
"capitalConversionFactorCode":    This field is required for GEF. Cash facility has 8, Contingent facility has 9.
"productTypeName":                Facility Type Name/ description i.e. GEF / BSS so appropriate description can be set
"currency":                       Facility currency code
"guaranteeCommencementDate":      see Deal for how to work it out
"guaranteeExpiryDate":            Guarantee Commencement Date plus exposure period
"nextQuarterEndDate":             ???
"delegationType":                 Derive values A,M or N ????
"intrestOrFeeRate":               Bank Rate, this can be for Bond facility corresponding fee rate
or for Loan/EWCS interest rate
"facilityStageCode":              Case Stage this can be 06 Commitment and 07 Issued
"exposurePeriod":                 Credit Period
"creditRatingCode":               Credit Review Risk Code
"guaranteePercentage":            Insured %
"premiumFrequencyCode":           Pre-Issue Est. Payment Frequency QUARTERLY(2)
"riskCountryCode":                "GBR",
"riskStatusCode":                 "03",
"effectiveDate":                  SEE Deal + deal investor calculation
"foreCastPercentage":             Forecast % Derive from FACILITY:Stage, i.e. Commitment or Issued
"issueDate":                      At Commitment stage its not required ,
Issued when issued it would be Issue Date for Bond OR Disbursement Date for Loan
"description":                    FacilityType + Workflow Exposure Period i.e. EWCS 15 Months,
"agentBankIdentifier":            Bank partyUrn??,
"obligorPartyIdentifier":         Supplier partyUrn,
"obligorName":                    Supplier name
"obligorIndustryClassification":  ACBS Supplier industry classification - must be 4 characters e.g. 0104
*/

const helpers = require('./helpers');
const { formatDate } = require('../../helpers/date');

/**
* FMR amendment mapping function.
* Only following properties are eligible for amendments:
* 1. Facility amount
* 2. Facility cover end date
* @param {Object} fmr Facility Master Record
* @param {Object} amendments Facility amendment(s)
* @param {Object} deal Deal object
* @returns {Object} Facility Master Record (FMR) amended
*/
const facilityMasterAmend = (fmr, amendments, deal) => {
  try {
    // Construct base record
    let record = {
      ...fmr,
      productTypeName: deal.dealSnapshot.dealType,
      obligorName: deal.exporter.companyName.substring(0, 35),
    };
    const { amendment } = amendments;
    // Construct amendment record
    if (amendment) {
      const { amount, coverEndDate } = amendment;

      // UKEF Exposure
      if (amount) {
        record = {
          ...record,
          maximumLiability: helpers.getMaximumLiability(amendments),
        };
      }

      // Cover end date
      if (coverEndDate) {
        record = {
          ...record,
          guaranteeExpiryDate: formatDate(coverEndDate),
          exposurePeriod: helpers.getExposurePeriod(amendments, deal.dealSnapshot.dealType, fmr),
        };
      }
    }

    // Return amended FMR
    return record;
  } catch (e) {
    console.error('Unable to map facility master amendment record: ', { e });
    return e;
  }
};

module.exports = facilityMasterAmend;