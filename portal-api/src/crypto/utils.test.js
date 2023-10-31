const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
const { issueValidUsernameAndPasswordJWT, issueValid2faJWT } = require('./utils');
const { MAKER } = require('../v1/roles/roles');
const { LOGIN_STATUSES } = require('../constants');

describe('crypto utils', () => {
  const USER = {
    username: 'HSBC-maker-1',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'One',
    email: 'one@email.com',
    timezone: 'Europe/London',
    roles: [MAKER],
    bank: {
      id: '961',
      name: 'HSBC',
      emails: ['maker1@ukexportfinance.gov.uk', 'maker2@ukexportfinance.gov.uk'],
    },
  };

  const EXISTING_SESSION_IDENTIFIER = crypto.randomBytes(32).toString('hex');

  const USER_WITH_EXISTING_SESSION_IDENTIFIER = { ...USER, sessionIdentifier: EXISTING_SESSION_IDENTIFIER };

  const DATE_NOW_IN_UNIX_TIME = Math.floor(Date.now().valueOf() / 1000);

  const SECONDS_IN_105_MINUTES = 105 * 60;

  const SECONDS_IN_12_HOURS = 12 * 60 * 60;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('issueValidUsernameAndPasswordJWT', () => {
    it('should not use an existing session identifier', () => {
      const { sessionIdentifier } = issueValidUsernameAndPasswordJWT(USER_WITH_EXISTING_SESSION_IDENTIFIER);
      expect(sessionIdentifier).not.toEqual(EXISTING_SESSION_IDENTIFIER);
    });

    it('should return a session identifier', () => {
      const { sessionIdentifier } = issueValidUsernameAndPasswordJWT(USER);
      expect(is32ByteHex(sessionIdentifier)).toEqual(true);
    });

    it('should return a token with the expected payload', () => {
      const { token, sessionIdentifier } = issueValidUsernameAndPasswordJWT(USER);
      const decodedToken = jsonwebtoken.decode(token.replace('Bearer ', ''));
      expect(decodedToken.iat).toBe(DATE_NOW_IN_UNIX_TIME);
      expect(decodedToken.exp).toBe(DATE_NOW_IN_UNIX_TIME + SECONDS_IN_105_MINUTES);
      expect(decodedToken.username).toEqual(USER.username);
      expect(decodedToken.loginStatus).toEqual(LOGIN_STATUSES.VALID_USERNAME_AND_PASSWORD);
      expect(decodedToken.sessionIdentifier).toEqual(sessionIdentifier);
    });

    it('should return the correct expiry time', () => {
      const { expires } = issueValidUsernameAndPasswordJWT(USER);
      expect(expires).toEqual('105m');
    });
  });

  describe('issueValid2faJWT', () => {
    it('should throw an error if no existing session identifier is present', () => {
      expect(() => issueValid2faJWT(USER)).toThrow('User does not have a session identifier');
    });

    it('should return the input session identifier', () => {
      const { sessionIdentifier } = issueValid2faJWT(USER_WITH_EXISTING_SESSION_IDENTIFIER);
      expect(is32ByteHex(sessionIdentifier)).toEqual(true);
      expect(sessionIdentifier).toEqual(EXISTING_SESSION_IDENTIFIER);
    });

    it('should return a token with the expected payload', () => {
      const { token, sessionIdentifier } = issueValid2faJWT(USER_WITH_EXISTING_SESSION_IDENTIFIER);
      const decodedToken = jsonwebtoken.decode(token.replace('Bearer ', ''));
      expect(decodedToken.iat).toBe(DATE_NOW_IN_UNIX_TIME);
      expect(decodedToken.exp).toBe(DATE_NOW_IN_UNIX_TIME + SECONDS_IN_12_HOURS);
      expect(decodedToken.username).toEqual(USER.username);
      expect(decodedToken.loginStatus).toEqual(LOGIN_STATUSES.VALID_2FA);
      expect(decodedToken.sessionIdentifier).toEqual(sessionIdentifier);
      expect(decodedToken.sessionIdentifier).toEqual(EXISTING_SESSION_IDENTIFIER);
      expect(decodedToken.roles).toEqual(USER.roles);
      expect(decodedToken.bank).toEqual(USER.bank);
    });

    it('should return the correct expiry time', () => {
      const { expires } = issueValid2faJWT(USER_WITH_EXISTING_SESSION_IDENTIFIER);
      expect(expires).toEqual('12h');
    });
  });

  function is32ByteHex(str) {
    return /^[0-9a-fA-F]{64}$/.test(str);
  }
});
