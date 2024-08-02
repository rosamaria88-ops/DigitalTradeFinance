const { FACILITY_TYPE } = require('@ukef/dtfs2-common');
const CONSTANTS = require('../../constants');

const MOCK_TFM_DEAL_AIN_SUBMITTED = {
  _id: '61f94a2427c1a7009cde1b9d',
  dealSnapshot: {
    _id: { $oid: '61f94a2427c1a7009cde1b9d' },
    additionalRefName: null,
    bank: {
      companiesHouseNo: 'UKEF0001',
      emails: ['maker1@ukexportfinance.gov.uk', 'checker1@ukexportfinance.gov.uk'],
      id: '9',
      mga: ['mga_ukef_1.docx', 'mga_ukef_2.docx'],
      name: 'UKEF test bank (Delegated)',
      partyUrn: '00318345',
    },
    bankInternalRefName: 'abc',
    checkerId: '61f29adb6851c10012604bd1',
    createdAt: 1643727396847,
    dealType: CONSTANTS.DEALS.DEAL_TYPE.GEF,
    editedBy: ['61f29adb6851c10012604bce'],
    comments: [
      {
        roles: ['checker'],
        userName: 'checker1@ukexportfinance.gov.uk',
        createdAt: 1643735218306,
        comment: '123123',
      },
    ],
    exporter: {
      companiesHouseRegistrationNumber: 'SC467044',
      companyName: 'TEST SERVICES LTD',
      industries: [
        {
          code: '1005',
          name: 'Construction',
          class: { code: '43991', name: 'Scaffold erection' },
        },
      ],
      isFinanceIncreasing: false,
      probabilityOfDefault: '1',
      registeredAddress: {
        addressLine1: '123 Street',
        addressLine2: 'Road',
        country: 'Scotland',
        locality: 'Dundee',
        postalCode: 'DD1 1AA',
      },
      selectedIndustry: {
        class: { code: '43991', name: 'Scaffold erection' },
        code: '1005',
        name: 'Construction',
      },
      smeType: 'Micro',
      status: 'Completed',
      updatedAt: 1643727452018,
    },
    facilities: [
      {
        _id: { $oid: '61f94a4327c1a7009cde1b9e' },
        dealId: { $oid: '61f94a2427c1a7009cde1b9d' },
        type: FACILITY_TYPE.CASH,
        hasBeenIssued: true,
        name: 'abc',
        shouldCoverStartOnSubmission: true,
        coverStartDate: '2022-02-01T00:00:00.000Z',
        coverEndDate: '2040-01-01T00:00:00.000Z',
        issueDate: null,
        monthsOfCover: null,
        details: ['TERM'],
        detailsOther: '',
        currency: { id: 'GBP' },
        value: 1000,
        coverPercentage: 80,
        interestPercentage: 1,
        paymentType: 'Monthly',
        createdAt: 1643727427189,
        updatedAt: 1643727452524,
        ukefExposure: 800,
        guaranteeFee: 0.9,
        submittedAsIssuedDate: '1643727452027',
        ukefFacilityId: '0030184096',
        feeType: 'In advance',
        feeFrequency: 'Monthly',
        dayCountBasis: 360,
        coverDateConfirmed: true,
        canResubmitIssuedFacilities: null,
        unissuedToIssuedByMaker: {},
      },
    ],
    facilitiesUpdated: 1643727452525,
    maker: {
      _id: '61f29adb6851c10012604bce',
      bank: {
        companiesHouseNo: 'UKEF0001',
        emails: ['maker1@ukexportfinance.gov.uk', 'checker1@ukexportfinance.gov.uk'],
        id: '9',
        mga: ['mga_ukef_1.docx', 'mga_ukef_2.docx'],
        name: 'UKEF test bank (Delegated)',
        partyUrn: '00318345',
      },
      email: 'maker1@ukexportfinance.gov.uk',
      firstname: 'First',
      roles: ['maker'],
      surname: 'Last',
      timezone: 'Europe/London',
      'user-status': 'active',
      username: 'maker1@ukexportfinance.gov.uk',
    },
    mandatoryVersionId: null,
    portalActivities: [
      {
        type: 'NOTICE',
        timestamp: 1643727452,
        author: {
          firstName: 'Mister',
          lastName: 'Checker',
          _id: '61f29adb6851c10012604bd1',
        },
        text: '',
        label: 'Automatic inclusion notice submitted to UKEF',
        html: '',
        facilityType: '',
        ukefFacilityId: '',
        maker: '',
        checker: '',
      },
    ],
    status: CONSTANTS.DEALS.PORTAL_DEAL_STATUS.SUBMITTED_TO_UKEF,
    submissionCount: 1,
    submissionDate: '1643727452025',
    submissionType: CONSTANTS.DEALS.SUBMISSION_TYPE.AIN,
    supportingInformation: { status: 'Not started' },
    ukefDealId: '0030184099',
    updatedAt: 1643727452024,
  },
  tfm: {
    activities: [
      {
        type: 'ACTIVITY',
        timestamp: 1643727515,
        author: {
          firstName: 'UKEF test bank (Delegated)',
          lastName: '9',
          _id: '',
        },
        text: '',
        label: 'Automatic inclusion notice submitted',
      },
      {
        type: 'ACTIVITY',
        timestamp: 1643727569,
        author: {
          firstName: 'UKEF test bank (Delegated)',
          lastName: '9',
          _id: '',
        },
        text: '',
        label: 'Facility submitted',
      },
    ],
    dateReceived: '01-02-2022',
    exporterCreditRating: 'Acceptable (B+)',
    lastUpdated: 1643727640957,
    lossGivenDefault: 50,
    parties: {
      agent: { partyUrn: '', partyUrnRequired: false },
      buyer: { partyUrn: '', partyUrnRequired: false },
      exporter: { partyUrn: '00307249', partyUrnRequired: true },
      indemnifier: { partyUrn: '', partyUrnRequired: false },
    },
    probabilityOfDefault: 1,
    product: CONSTANTS.DEALS.DEAL_TYPE.GEF,
    stage: 'Confirmed',
    estore: {},
    tasks: [
      {
        groupTitle: 'Set up deal',
        id: 1,
        groupTasks: [
          {
            id: '1',
            groupId: 1,
            title: 'Create or link this opportunity in Salesforce',
            team: {
              id: 'BUSINESS_SUPPORT',
              name: ' Business support group',
            },
            status: 'To do',
            assignedTo: {
              userId: 'Unassigned',
              userFullName: 'Unassigned',
            },
            canEdit: true,
          },
        ],
      },
    ],
    acbs: {
      deal: {
        deal: {
          dealIdentifier: '0030184099',
          receivedFromACBS: '2022-02-01T14:58:35+00:00',
          submittedToACBS: '2022-02-01T14:58:31+00:00',
        },
        guarantee: {
          dealGuaranteeLocation:
            'Deal/0030184099/guarantee/DealGuarantee?accountOwnerIdentifier=00000000&lenderTypeCode=100&sectionIdentifier=00&limitTypeCode=00&limitKey=00283643&guarantorPartyIdentifier=00000141',
          receivedFromACBS: '2022-02-01T14:58:52+00:00',
          submittedToACBS: '2022-02-01T14:58:51+00:00',
        },
        investor: {
          dealInvestorLocation:
            'Deal/0030184099/investor/DealParty?accountOwnerIdentifier=&lenderTypeCode=500&sectionIdentifier=00&limitTypeCode=00&limitKey=00283643',
          receivedFromACBS: '2022-02-01T14:58:43+00:00',
          submittedToACBS: '2022-02-01T14:58:41+00:00',
        },
        parties: {
          bank: {
            partyIdentifier: '00280449',
            receivedFromACBS: '2022-02-01T14:58:22+00:00',
            submittedToACBS: '2022-02-01T14:58:21+00:00',
          },
          exporter: {
            partyIdentifier: '00283643',
            receivedFromACBS: '2022-02-01T14:58:22+00:00',
            submittedToACBS: '2022-02-01T14:58:21+00:00',
          },
        },
      },
      facilities: [
        {
          facilityId: '61f94a4327c1a7009cde1b9e',
          facilityStage: '07',
          facilityMaster: {
            submittedToACBS: '2022-02-01T14:59:25+00:00',
            receivedFromACBS: '2022-02-01T14:59:29+00:00',
            facilityIdentifier: '0030184096',
          },
          facilityInvestor: {
            submittedToACBS: '2022-02-01T14:59:35+00:00',
            receivedFromACBS: '2022-02-01T14:59:36+00:00',
            facilityInvestorIdentifier:
              'FacilityParty?accountOwnerIdentifier=00000000&lenderTypeCode=500&sectionIdentifier=00&limitTypeCode=00&limitKey=00283643',
          },
          facilityCovenant: {
            submittedToACBS: '2022-02-01T14:59:45+00:00',
            receivedFromACBS: '2022-02-01T14:59:47+00:00',
            covenantIdentifier: '0000006402?accountOwnerIdentifier=00000000&lenderTypeCode=100&sectionIdentifier=00&limitTypeCode=00&limitKeyValue=00283643',
          },
          facilityProviderGuarantee: {
            submittedToACBS: '2022-02-01T15:00:05+00:00',
            receivedFromACBS: '2022-02-01T15:00:06+00:00',
            facilityGuaranteeIdentifier:
              'FacilityGuarantee?accountOwnerIdentifier=00000000&lenderTypeCode=100&sectionIdentifier=00&limitTypeCode=00&limitKey=00283643&guarantorPartyIdentifier=00280449',
          },
          codeValueTransaction: {
            submittedToACBS: '2022-02-01T15:00:15+00:00',
            receivedFromACBS: '2022-02-01T15:00:18+00:00',
            bundleIdentifier: '0000230722',
          },
        },
      ],
      portalDealId: '61f94a2427c1a7009cde1b9d',
      ukefDealId: '0030184099',
    },
  },
};

module.exports = MOCK_TFM_DEAL_AIN_SUBMITTED;
