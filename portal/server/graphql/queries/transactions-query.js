const gql = require('graphql-tag');

const transactionsQuery = `
query Transactions($start: Int, $pagesize: Int, $filters:[TransactionFilters]){
  transactions(params: {start: $start, pagesize: $pagesize, filters: $filters}) {
    count
    transactions{
      deal_id,
      deal_status,
      deal_created,
      transaction_id,
      bankFacilityId
      ukefFacilityId
      transactionType
      facilityValue
      transactionStage
      issuedDate
      startDate
      lastEdited
      endDate
      maker
      checker
    }
  }
}`;

module.exports = gql(transactionsQuery);
