// NOTE!!
// these objects are to be pushed straight into the portal-api,
// so the fields need to go into the correct places in the object..

const now = new Date().valueOf().toString();

module.exports = [
  {
    submissionType: 'Automatic Inclusion Notice',
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Draft',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      status: 'Incomplete',
    },
    eligibility: {
      status: 'Incomplete',
    },
  }, {
    submissionType: 'Automatic Inclusion Notice',
    bankInternalRefName: 'abc-2-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Draft',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      status: 'Not started',
    },
  }, {
    submissionType: 'Automatic Inclusion Notice',
    bankInternalRefName: 'abc-3-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Draft',
      submissionDate: now,
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    submissionType: 'Manual Inclusion Notice',
    bankInternalRefName: 'abc-4-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: "Ready for Checker's approval",
      previousStatus: 'Draft',
      submissionDate: now,
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
    comments: [{
      user: {
        firstname: 'bob',
        surname: 'builder',
      },
      timestamp: '2020 07 01 11:12:08:194 +0100',
      text: 'to me',
    }],
  }, {
    submissionType: 'Manual Inclusion Application',
    bankInternalRefName: 'abc-5-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: "Further Maker's input required",
      previousStatus: "Ready for Checker's approval",
      submissionDate: now,
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
    comments: [{
      user: {
        firstname: 'bob',
        surname: 'builder',
      },
      timestamp: '2020 07 01 11:12:08:194 +0100',
      text: 'to me',
    }],
  }, {
    bankInternalRefName: 'abc-6-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Abandoned',
      previousStatus: 'Draft',
      submissionDate: now,
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-7-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Submitted',
      previousStatus: "Ready for Checker's approval",
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
    comments: [{
      user: {
        firstname: 'bob',
        surname: 'builder',
      },
      timestamp: '2020 07 01 11:12:08:194 +0100',
      text: 'to me',
    }],
  }, {
    bankInternalRefName: 'abc-8-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Submitted',
      previousStatus: "Ready for Checker's approval",
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
    comments: [{
      user: {
        firstname: 'bob',
        surname: 'builder',
      },
      timestamp: '2020 07 01 11:12:08:194 +0100',
      text: 'to me',
    }],
  }, {
    bankInternalRefName: 'abc-9-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: "Ready for Checker's approval",
      previousStatus: 'Draft',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
    comments: [{
      user: {
        firstname: 'bob',
        surname: 'builder',
      },
      timestamp: '2020 07 01 11:12:08:194 +0100',
      text: 'to me',
    }],
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Acknowledged by UKEF',
      previousStatus: 'Submitted',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Draft',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Draft',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Draft',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Acknowledged by UKEF',
      previousStatus: 'Submitted',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Accepted by UKEF (without conditions)',
      previousStatus: 'Submitted',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Rejected by UKEF',
      previousStatus: 'Submitted',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Rejected by UKEF',
      previousStatus: 'Submitted',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: "Further Maker's input required",
      previousStatus: "Ready for Checker's approval",
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc-1-def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Accepted by UKEF (without conditions)',
      previousStatus: 'Submitted',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc 2 def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Accepted by UKEF (with conditions)',
      previousStatus: 'Submitted',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  }, {
    bankInternalRefName: 'abc 2 def',
    additionalRefName: 'Tibettan submarine acquisition scheme',
    details: {
      status: 'Abandoned',
      previousStatus: 'Draft',
      owningBank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
    },
    submissionDetails: {
      'supplier-name': 'Supplier name 2',
    },
  },
];
