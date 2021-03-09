import moment from 'moment';

const exporterItems = (exporterUrl) => [
  {
    label: 'Companies House registration number',
    id: 'companiesHouseRegistrationNumber',
    href: `${exporterUrl}/`,
  },
  {
    label: 'Company name',
    id: 'companyName',
    href: `${exporterUrl}/`,
  },
  {
    label: 'Registered Address',
    id: 'registeredAddress',
  },
  {
    label: 'Correspondence address, if different',
    id: 'correspondenceAddress',
  },
  {
    label: 'Industry sector',
    id: 'industrySectorId',
  },
  {
    label: 'Industry class',
    id: 'industryClassId',
  },
  {
    label: 'SME type',
    id: 'smeTypeId',
    href: `${exporterUrl}/`,
  },
  {
    label: 'Probability of default',
    id: 'probabilityOfDefault',
    href: `${exporterUrl}/`,
  },
  {
    label: 'Is finance for this exporter increasing?',
    id: 'isFinanceIncreasing',
    href: `${exporterUrl}/`,
    method: (callback) => (callback ? 'Yes' : 'No'),
  },
];

const facilityItems = (exporterUrl) => [
  {
    label: 'Name',
    id: 'name',
    href: `${exporterUrl}/`,
  },
  {
    label: 'Stage',
    id: 'stage',
    href: `${exporterUrl}/`,
  },
  {
    label: 'Cover start date',
    id: 'coverStartDate',
    href: `${exporterUrl}/`,
    method: (callback) => moment(callback).format('D MMMM YYYY'),
  },
  {
    label: 'Cover end date',
    id: 'coverEndDate',
    href: `${exporterUrl}/`,
    method: (callback) => moment(callback).format('D MMMM YYYY'),
  },
  {
    label: 'Months the UKEF guarantee will be in place for',
    id: 'monthsOfCover',
    href: `${exporterUrl}/`,
    suffix: ' months',
  },
  {
    label: 'Facility provided on',
    id: 'details',
    href: `${exporterUrl}/`,
  },
  {
    label: 'Facility value',
    id: 'value',
    href: `${exporterUrl}/`,
    isCurrency: true,
  },
  {
    label: 'Percentage of UKEF cover needed',
    id: 'coverPercentage',
    href: `${exporterUrl}/`,
    suffix: '%',
  },
  {
    label: 'Your bank’s maximum liability',
    id: 'banksMaximumLiability',
    href: `${exporterUrl}/`,
    isCurrency: true,
  },
  {
    label: 'UKEF’s maximum liability',
    id: 'ukefMaximumLiability',
    href: `${exporterUrl}/`,
    isCurrency: true,
  },
  {
    label: 'Interest margin your bank will charge',
    id: 'interestPercentage',
    href: `${exporterUrl}/`,
    suffix: '%',
  },
  {
    label: 'Risk margin your bank will charge',
    id: 'riskMarginPercentage',
    href: `${exporterUrl}/`,
    suffix: '%',
  },
];

export {
  exporterItems,
  facilityItems,
};