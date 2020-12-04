module.exports = {
  login: require('./login'),
  header: require('./header'),
  landingPage: require('./landingPage'),
  beforeYouStart: require('./beforeYouStart'),
  unableToProceed: require('./unableToProceed'),
  bankDetails: require('./bankDetails'),
  contract: require('./contract'),
  contractAboutSupplier: require('./contract/about/about-supplier'),
  contractAboutBuyer: require('./contract/about/about-buyer'),
  contractAboutFinancial: require('./contract/about/about-financial'),
  contractAboutPreview: require('./contract/about/about-preview'),
  contractComments: require('./contract/contract-comments-tab'),
  contractDelete: require('./contract/contract-delete'),
  contractCheckDealDetails: require('./contract/contract-check-deal-details'),
  contractReadyForReview: require('./contract/contract-readyForReview'),
  contractReturnToMaker: require('./contract/contract-returnToMaker'),
  contractConfirmSubmission: require('./contract/contract-confirmSubmission'),
  contractSubmissionDetails: require('./contractSubmissionDetails'),
  editDealName: require('./contract/contract-edit-name'),
  dashboard: require('./dashboard'),
  transactionDashboard: require('./transactionDashboard'),
  cloneDeal: require('./cloneDeal'),
  eligibilityCriteria: require('./eligibilityCriteria'),
  eligibilityDocumentation: require('./eligibilityDocumentation'),
  eligibilityPreview: require('./eligibilityPreview'),
  header: require('./header'),
  bondDetails: require('./bondDetails'),
  bondFinancialDetails: require('./bondFinancialDetails'),
  bondFeeDetails: require('./bondFeeDetails'),
  bondPreview: require('./bondPreview'),
  bondIssueFacility: require('./bondIssueFacility'),
  bondDelete: require('./bondDelete'),
  loanGuaranteeDetails: require('./loanGuaranteeDetails'),
  loanFinancialDetails: require('./loanFinancialDetails'),
  loanDatesRepayments: require('./loanDatesRepayments'),
  loanPreview: require('./loanPreview'),
  loanIssueFacility: require('./loanIssueFacility'),
  loanDelete: require('./loanDelete'),
  facilityConfirmCoverStartDate: require('./facilityConfirmCoverStartDate'),
  defaults: require('./defaults'),
  users: require('./admin/users/users'),
  userProfile: require('./user/profile'),
  changePassword: require('./user/changePassword'),
  createUser: require('./admin/users/createUser'),
  editUser: require('./admin/users/editUser'),
  resetPassword: require('./resetPassword'),
  mga: require('./mga'),
  footer: require('./footer'),

  reports: require('./reports'),
};
