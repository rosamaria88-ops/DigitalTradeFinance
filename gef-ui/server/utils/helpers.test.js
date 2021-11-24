import {
  userToken,
  isObject,
  validationErrorHandler,
  isEmpty,
  mapSummaryList,
  apiErrorHandler,
  isTrueSet,
  stringToBoolean,
  isNotice,
  isUkefReviewAvailable,
  isUkefReviewPositive,
} from './helpers';

describe('userToken()', () => {
  it('returns the correct user token', () => {
    const MOCK_REQ = {
      session: {
        userToken: '1234',
      },
    };

    expect(userToken(MOCK_REQ)).toEqual('1234');
  });
});

describe('isObject()', () => {
  it('returns the correct boolean', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
  });
});

describe('apiErrorHandler', () => {
  it('returns a request time out error', () => {
    expect(() => apiErrorHandler({ code: 'ECONNABORTED' })).toThrow('Request timed out.');
  });

  it('returns the entire response object if there is a validation error', () => {
    const mockResponse = {
      response: {
        status: 422,
        data: [],
      },
    };
    expect(apiErrorHandler(mockResponse)).toEqual(mockResponse.response);
  });

  it('returns a standard error', () => {
    const mockResponse = {
      response: {
        status: 301,
        statusText: 'Error message',
      },
    };
    expect(() => apiErrorHandler(mockResponse)).toThrow('Error message');
  });
});

describe('validationErrorHandler()', () => {
  it('converts an error object into the correct validation errors', () => {
    const mockedError = {
      errRef: 'abc',
      errMsg: 'message',
    };

    expect(validationErrorHandler(mockedError)).toEqual({
      errorSummary: [{
        text: 'message',
        href: '#abc',
      }],
      fieldErrors: {
        abc: {
          text: 'message',
        },
      },
    });
  });

  it('passing a `href` arguments adds it before the #hash', () => {
    const mockedError = {
      errRef: 'abc',
      errMsg: 'message',
    };
    expect(validationErrorHandler(mockedError, 'my-link')).toEqual({
      errorSummary: [{
        text: 'message',
        href: 'my-link#abc',
      }],
      fieldErrors: {
        abc: {
          text: 'message',
        },
      },
    });
  });

  it('returns `false`, if no arguments are passed', () => {
    expect(validationErrorHandler()).toBeFalsy();
    expect(validationErrorHandler(null)).toBeFalsy();
    expect(validationErrorHandler(undefined)).toBeFalsy();
    expect(validationErrorHandler('')).toBeFalsy();
  });

  it('accepts errors as an array', () => {
    const mockedError = [
      {
        errRef: 'abc',
        errMsg: 'message',
      },
      {
        errRef: 'xyz',
        errMsg: 'message two',
      },
    ];
    expect(validationErrorHandler(mockedError)).toEqual({
      errorSummary: [
        {
          text: 'message',
          href: '#abc',
        },
        {
          text: 'message two',
          href: '#xyz',
        },
      ],
      fieldErrors: {
        abc: {
          text: 'message',
        },
        xyz: {
          text: 'message two',
        },
      },
    });
  });
  it('adds subField errors for things like dates', () => {
    const mockedError = [
      {
        errRef: 'abc',
        errMsg: 'message',
        subFieldErrorRefs: ['ref1', 'ref2'],
      },
      {
        errRef: 'xyz',
        errMsg: 'message two',
      },
    ];
    expect(validationErrorHandler(mockedError)).toEqual({
      errorSummary: [
        {
          text: 'message',
          href: '#abc',
        },
        {
          text: 'message two',
          href: '#xyz',
        },
      ],
      fieldErrors: {
        abc: {
          text: 'message',
        },
        xyz: {
          text: 'message two',
        },
        ref1: {
          text: 'message',
        },
        ref2: {
          text: 'message',
        },
      },
    });
  });
});

describe('isEmpty()', () => {
  it('returns True if the Value or Object is empty', () => {
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty({ foo: '' })).toBeTruthy();
    expect(isEmpty({ foo: null })).toBeTruthy();
    expect(isEmpty({ foo: 'Hello' })).toBeFalsy();
    expect(isEmpty({
      foo: {
        bar: null,
        foo: null,
      },
    })).toBeTruthy();
    expect(isEmpty({
      foo: {
        bar: 'Text',
        foo: null,
      },
    })).toBeFalsy();
  });
});

describe('mapSummaryList()', () => {
  const MockedData = () => ({
    details: {
      id: '123456',
    },
    validation: {
      required: [],
    },
  });

  const MockedDisplayItems = () => [
    {
      label: 'Id',
      id: 'id',
    },
  ];

  it('returns an empty array if Data object is empty ', () => {
    expect(mapSummaryList({})).toEqual([]);
    expect(mapSummaryList(null)).toEqual([]);
    expect(mapSummaryList(undefined)).toEqual([]);
  });

  it('returns an array populated by the correct properties', () => {
    const mockedData = MockedData();
    const mockedDisplayItems = MockedDisplayItems();

    expect(mapSummaryList(mockedData, mockedDisplayItems)).toEqual([{ actions: { items: [] }, key: { text: 'Id' }, value: { text: '123456' } }]);
  });

  it('returns populated items array if href property is required', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();
    mockedDisplayItems[0].href = '/test';
    const { items } = mapSummaryList(mockedData, mockedDisplayItems)[0].actions;
    expect(items.length).toEqual(1);
  });

  it('returns the correct link label if href has been required', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();
    mockedDisplayItems[0].href = '/test';
    const item = mapSummaryList(mockedData, mockedDisplayItems)[0].actions.items[0];
    expect(item).toEqual(expect.objectContaining({ href: '/test', text: 'Change' }));
    mockedData.details.id = null;
    const item2 = mapSummaryList(mockedData, mockedDisplayItems)[0].actions.items[0];
    expect(item2.text).toEqual('Add');
  });

  it('returns the `Required` html element if corresponding dataset is required', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedData.details.id = null;
    mockedData.validation.required = ['id'];
    const { html } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(html).toMatch('required');
  });

  it('returns a long dash if value is empty and is NOT required', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedData.details.id = null;
    const { text } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(text).toMatch('—');
  });

  it('returns a long dash if Object contains only null values', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedData.details.address = {};
    mockedData.details.address.line1 = null;
    mockedData.details.address.line2 = null;
    mockedDisplayItems.slice(1);
    mockedDisplayItems[0].label = 'Address';
    mockedDisplayItems[0].id = 'address';
    const { text } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(text).toMatch('—');
  });

  it('returns an unordered list if property contains an object', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedData.details.address = {};
    mockedData.details.address.line1 = 'Test Road';
    mockedData.details.address.line2 = null;
    mockedDisplayItems.slice(1);
    mockedDisplayItems[0].label = 'Address';
    mockedDisplayItems[0].id = 'address';

    const { html } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(html).toEqual('<ul class="is-unstyled"><li>Test Road</li></ul>');
  });

  it('returns an unordered list with Provided on details if property contains an object', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();
    mockedData.details.details = ['OTHER'];
    mockedData.details.detailsOther = 'Other text';
    mockedDisplayItems.slice(1);
    mockedDisplayItems[0].isDetails = true;
    mockedDisplayItems[0].label = 'Provided on';
    mockedDisplayItems[0].id = 'details';

    const other = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(other.html).toEqual('<ul class="is-unstyled"><li>Other - Other text</li></ul>');
  });

  it('returns selected industry ', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedData.details.selectedIndustry = {
      code: '1017',
      name: 'Arts, entertainment and recreation',
      class: {
        code: '90030',
        name: 'Artistic creation',
      },
    };
    mockedDisplayItems[0].isIndustry = true;
    mockedDisplayItems[0].id = 'selectedIndustry';

    const { html } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(html).toEqual('Arts, entertainment and recreation<br>Artistic creation');
  });

  it('returns `null` if value is undefined', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedData.details.id = '123';
    mockedDisplayItems[0].id = 'abc';

    const response = mapSummaryList(mockedData, mockedDisplayItems)[0];
    expect(response).toEqual(null);
  });

  it('returns a value with currency', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedDisplayItems[0].id = 'price';
    mockedDisplayItems[0].isCurrency = true;

    mockedData.details.price = 200;
    mockedData.details.currency = 'GBP';

    const { text } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(text).toEqual('200 GBP');
  });

  it('returns a value with a prefix', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedDisplayItems[0].id = 'price';
    mockedDisplayItems[0].prefix = '£';

    mockedData.details.price = 200;

    const { text } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(text).toEqual('£200');
  });

  it('returns a value with a suffix', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    mockedDisplayItems[0].id = 'percentage';
    mockedDisplayItems[0].suffix = '%';

    mockedData.details.percentage = 15;

    const { text } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(text).toEqual('15%');
  });

  it('alters the value depending on the `method` passed', () => {
    const mockedDisplayItems = MockedDisplayItems();
    const mockedData = MockedData();

    const reverseFunction = (val) => val.split('').reverse().join('');

    mockedDisplayItems[0].id = 'reverse';
    mockedDisplayItems[0].method = (callback) => reverseFunction(callback);

    mockedData.details.reverse = 'abcd';
    const { text } = mapSummaryList(mockedData, mockedDisplayItems)[0].value;
    expect(text).toEqual('dcba');
  });
});

describe('isTrueSet()', () => {
  it('returns null if value is not a string', () => {
    expect(isTrueSet(null)).toBe(null);
    expect(isTrueSet(10)).toBe(null);
    expect(isTrueSet('')).toBe(null);
    expect(isTrueSet(true)).toBe(null);
    expect(isTrueSet(false)).toBe(null);
    expect(isTrueSet(undefined)).toBe(null);
  });

  it('returns true boolean if string value is equal to `true`', () => {
    expect(isTrueSet('true')).toBe(true);
  });

  it('returns false boolean if string value is equal to `false`', () => {
    expect(isTrueSet('false')).toBe(false);
  });
});

describe('isNotice()', () => {
  it('Should return TRUE for any `Notice` submission type i.e. MIN or AIN', () => {
    expect(isNotice('Manual inclusion notice')).toEqual(true);
  });

  it('Should return FALSE for any `Application` submission type i.e. MIA', () => {
    expect(isNotice('Manual inclusion application')).toEqual(false);
  });

  it('Should return FALSE for any `Application` submission type i.e. MIA with mixed case', () => {
    expect(isNotice('manUAL InClUsIoN APPLICATION')).toEqual(false);
  });
});

describe('isUkefReviewAvailable()', () => {
  it('Should return TRUE for application with UKEF_APPROVED_WITH_CONDITIONS, UKEF_APPROVED_WITHOUT_CONDITIONS and UKEF_REFUSED status', () => {
    expect(isUkefReviewAvailable('UKEF_APPROVED_WITHOUT_CONDITIONS')).toEqual(true);
  });

  it('Should return FALSE for application with non UKEF_APPROVED_WITH_CONDITIONS, UKEF_APPROVED_WITHOUT_CONDITIONS and UKEF_REFUSED status', () => {
    expect(isUkefReviewAvailable('UKEF_ACKNOWLEDGED')).toEqual(false);
  });
});

describe('isUkefReviewPositive()', () => {
  it('Should return TRUE for application with UKEF_APPROVED_WITHOUT_CONDITIONS status', () => {
    expect(isUkefReviewPositive('UKEF_APPROVED_WITHOUT_CONDITIONS')).toEqual(true);
  });

  it('Should return TRUE for application with UKEF_APPROVED_WITH_CONDITIONS status', () => {
    expect(isUkefReviewPositive('UKEF_APPROVED_WITH_CONDITIONS')).toEqual(true);
  });

  it('Should return FALSE for application with UKEF_REFUSED status', () => {
    expect(isUkefReviewPositive('UKEF_REFUSED')).toEqual(false);
  });
});

describe('stringToBoolean', () => {
  it('returns `true` string as boolean', () => {
    expect(stringToBoolean('true')).toEqual(true);
  });

  it('returns `false` string as boolean', () => {
    expect(stringToBoolean('false')).toEqual(false);
  });
});
