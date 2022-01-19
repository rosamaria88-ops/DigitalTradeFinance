const typeDefs = `

type StatusType {
  code: Int
  msg: String
}

type Currency {
  currencyId: Int!
  text: String
  id: String
}

type Bank {
  id: String
  name: String
  emails: [String]
}

type Maker {
  username: String
  firstname: String
  surname: String
}

type Checker {
  username: String
  firstname: String
  surname: String
}

type ErrorListItem {
  order: String
  text: String
}

type AllDeal {
  _id: String!
  status: String
  bankInternalRefName: String
  exporter: String
  product: String
  submissionType: String
  updatedAt: Float
}

type AllDealsQuery {
  status: StatusType
  count: Int
  deals: [AllDeal]
}

input DashboardSort {
  field: String
  order: Int
}

input DashboardFilters {
  field: String
  value: [String]
  operator: String
}

input DealsInput {
  start: Int
  pagesize: Int
  filters: [DashboardFilters]
  sort: [DashboardSort]
}

input GefFacilitiesFilters {
  field: String
  value: String
  operator: String
}

input GefFacilitiesInput {
  start: Int
  pagesize: Int
  filters: [GefFacilitiesFilters]
}

type Exporter {
  _id: String
  companiesHouseRegistrationNumber: String
  companyName: String
  registeredAddress: String
  correspondenceAddress: String
  selectedIndustry: String
  industries: String,
  smeType: String
  probabilityOfDefault: Float
  isFinanceIncreasing: Boolean
  createdAt: Float
  updatedAt: Float
}

type EligibilityCriterion {
  id: Int
  name: String
  text: String
  errMsg: String
  answer: Boolean
}

type Eligibility {
  lastUpdated: Int
  criteria: [EligibilityCriterion]
}

type GefDeal {
  _id: String
  maker: Maker
  status: String
  bank: Bank
  bankInternalRefName: String
  mandatoryVersionId: String
  additionalRefName: String
  submissionCount: String
  submissionDate: Float
  submissionType: String
  ukefDealId: String
  checkerId: String
  createdAt: Float
  updatedAt: Float
  exporter: Exporter
  eligibility: Eligibility
}

type GefCurrency {
   id: String
}

type GefFacility {
  _id: String
  dealId: String
  type: String
  hasBeenIssued: Boolean
  name: String
  shouldCoverStartOnSubmission: String
  coverStartDate: Float
  coverEndDate: Float
  monthsOfCover: Int
  details: String
  detailsOther: String
  currency: GefCurrency
  value: Float
  coverPercentage: Float
  interestPercentage: Float
  paymentType: String
  ukefExposure: Float
  submittedAsIssuedDate: Float
  ukefFacilityId: String
  createdAt: Float
  updatedAt: Float
  deal: GefDeal
}

type GefFacilitiesQuery {
  count: Int
  facilities: [GefFacility]
}

type Query {
  currencies: [Currency]
  allDeals(params: DealsInput): AllDealsQuery
  gefFacilities(params: GefFacilitiesInput): GefFacilitiesQuery
}

type DealStatusErrorItem {
  comments: ErrorListItem
  confirmSubmit: ErrorListItem
}

type DealStatusUpdateResult {
  statusCode: Int
  status: String
  comments: String
  success: Boolean
  count: Int
  errorList: DealStatusErrorItem
}

type Mutation {
  dealStatusUpdate( dealId: String, status: String, comments: String): DealStatusUpdateResult
}
`;

module.exports = typeDefs;
