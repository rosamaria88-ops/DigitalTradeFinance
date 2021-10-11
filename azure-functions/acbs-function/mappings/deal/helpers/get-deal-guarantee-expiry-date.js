/*
 yyyy-MM-dd
ACBS guaranteeCommencementDate algorithm
provided by DM 23/03/2021
                              ACBS Effective Date     ACBS Issued Date
Commitment                    Portal Submission Date  (we don’t send)
Switch Commitment to Issued   Portal Submission Date  Cover Start Date
Issued (straight to Issued    Cover Start Date        Cover Start Date
*/
const { formatTimestamp, addYear } = require('../../../helpers/date');
const CONSTANT = require('../../../constants/product');

const getDealGuaranteeExpiryDate = (deal) => {
  if (deal.dealSnapshot.dealType === CONSTANT.TYPE.GEF) {
    return addYear(formatTimestamp(deal.dealSnapshot.submissionDate), 20);
  }

  const latestGuaranteeExpiry = deal.reduce((latestDate, facility) => {
    const { guaranteeExpiryDate } = facility.tfm.facilityGuaranteeDates;
    return guaranteeExpiryDate > latestDate ? guaranteeExpiryDate : latestDate;
  }, formatTimestamp(deal.submittedDate));

  return latestGuaranteeExpiry;
};

module.exports = getDealGuaranteeExpiryDate;
