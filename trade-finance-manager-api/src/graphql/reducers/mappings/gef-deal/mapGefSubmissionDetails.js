const mapGefSubmissionDetails = (dealSnapshot) => {
  const { exporter } = dealSnapshot;

  return {
    supplierName: exporter.companyName,
    supplierAddressLine1: exporter.registeredAddress.addressLine1,
    supplierAddressLine2: exporter.registeredAddress.addressLine2,
    supplierAddressLine3: exporter.registeredAddress.addressLine3,
    supplierAddressTown: exporter.registeredAddress.locality,
    supplierAddressPostcode: exporter.registeredAddress.postalCode,
    supplierCountry: exporter.registeredAddress.country,
    industrySector: exporter.selectedIndustry.name,
    industryClass: exporter.selectedIndustry.class.name,
    supplierCompaniesHouseRegistrationNumber: exporter.companiesHouseRegistrationNumber,
    smeType: exporter.smeType,
    supplierCorrespondenceAddressLine1: exporter.correspondenceAddress.addressLine1,
    supplierCorrespondenceAddressLine2: exporter.correspondenceAddress.addressLine2,
    supplierCorrespondenceAddressLine3: exporter.correspondenceAddress.addressLine3,
    supplierCorrespondenceAddressTown: exporter.correspondenceAddress.locality,
    supplierCorrespondenceAddressPostcode: exporter.correspondenceAddress.postalCode,
    supplierCorrespondenceAddressCountry: exporter.correspondenceAddress.country,
  };
};

module.exports = mapGefSubmissionDetails;
