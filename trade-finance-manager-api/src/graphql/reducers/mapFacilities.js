const moment = require('moment');

const mapFacilities = (facilities) => {
  const mappedFacilities = facilities;

  mappedFacilities.map((f) => {
    const facility = f;
    if (facility.facilityType === 'bond') {
      facility.facilityType = 'BSS';
    }
    if (facility.facilityType === 'loan') {
      facility.facilityType = 'EWCS';
    }

    // currently, we don't always have facilityType.
    // this is a hacky fallback/workaround for initial TFM development.
    // TODO: remove this once DTFS2-3054 is completed.
    if (facility.bondType) {
      facility.facilityType = 'BSS';
    }
    if (facility.disbursementAmount) {
      facility.facilityType = 'EWCS';
    }

    const {
      'coverEndDate-day': coverEndDateDay,
      'coverEndDate-month': coverEndDateMonth,
      'coverEndDate-year': coverEndDateYear,
    } = facility;

    const coverEndDate = moment().set({
      date: Number(coverEndDateDay),
      month: Number(coverEndDateMonth) - 1, // months are zero indexed
      year: Number(coverEndDateYear),
    });

    facility.expectedExpiryDate = moment(coverEndDate).format('DD MMM YYYY');

    return facility;
  });

  return mappedFacilities;
};

module.exports = mapFacilities;
