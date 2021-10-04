const gql = require('graphql-tag');

const updateLeadUnderwriter = gql`
  mutation UpdateLeadUnderwriter($dealId: ID!, $leadUnderwriterUpdate: TFMLeadUnderwriterInput) {
    updateLeadUnderwriter(dealId: $dealId, leadUnderwriterUpdate: $leadUnderwriterUpdate) {
      leadUnderwriter
    }
  }
`;

module.exports = updateLeadUnderwriter;
