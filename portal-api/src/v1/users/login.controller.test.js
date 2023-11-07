const { when } = require('jest-when');
const { login } = require('./login.controller');
const { usernameOrPasswordIncorrect, userIsBlocked, userIsDisabled } = require('../../constants/login-results');
const controller = require('./controller');
const utils = require('../../crypto/utils');
const { FEATURE_FLAGS } = require('../../config/feature-flag.config');

jest.mock('./controller', () => ({
  findByUsername: jest.fn(),
  updateLastLogin: jest.fn(),
  incrementFailedLoginCount: jest.fn(),
}));

jest.mock('../../crypto/utils', () => ({
  validPassword: jest.fn(),
  issueJWT: jest.fn(),
}));

jest.mock('../email', () => jest.fn());

describe('login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const USERNAME = 'aUsername';
  const PASSWORD = 'aPassword';
  const ERROR = 'an error';
  const SALT = 'aSalt';
  const HASH = 'aHash';
  const SESSION_IDENTIFIER = 'aSessionIdentifier';
  const TOKEN_OBJECT = { example: 'tokenObject' };

  const USER = {
    'user-status': 'active',
    disabled: false,
    hash: HASH,
    salt: SALT,
  };
  if (!FEATURE_FLAGS.MAGIC_LINK) {
    it('returns the user and token when the user exists and the password is correct', async () => {
      mockFindByUsernameSuccess(USER);
      mockValidPasswordSuccess();
      mockIssueJWTSuccess(USER);
      mockUpdateLastLoginSuccess(USER);

      const result = await login(USERNAME, PASSWORD);

      expect(result).toEqual({ user: USER, tokenObject: TOKEN_OBJECT });
    });
  } else {
    it('returns the token when the user exists and the password is correct', async () => {
      mockFindByUsernameSuccess(USER);
      mockValidPasswordSuccess();
      mockIssueJWTSuccess(USER);
      mockUpdateLastLoginSuccess(USER);

      const result = await login(USERNAME, PASSWORD);

      expect(result).toEqual({ tokenObject: TOKEN_OBJECT });
    });
  }

  it("returns a 'usernameOrPasswordIncorrect' error when the user doesn't exist", async () => {
    mockFindByUsernameReturnsNullUser();
    mockValidPasswordSuccess();
    mockIssueJWTSuccess(USER);
    mockUpdateLastLoginSuccess(USER);

    const result = await login(USERNAME, PASSWORD);

    expect(result).toEqual({ error: usernameOrPasswordIncorrect });
  });

  it('returns an error if findByUsername returns an error message', async () => {
    mockFindByUsernameReturnsError();
    mockValidPasswordSuccess();
    mockIssueJWTSuccess(USER);
    mockUpdateLastLoginSuccess(USER);

    const result = await login(USERNAME, PASSWORD);

    expect(result).toEqual({ error: ERROR });
  });

  it("returns a 'usernameOrPasswordIncorrect' error when the password is incorrect", async () => {
    mockFindByUsernameSuccess(USER);
    mockValidPasswordFailure();
    mockIssueJWTSuccess(USER);
    mockUpdateLastLoginSuccess(USER);

    const result = await login(USERNAME, PASSWORD);

    expect(result).toEqual({ error: usernameOrPasswordIncorrect });
  });

  it("returns a 'userIsDisabled' error when the user is disabled", async () => {
    const DISABLED_USER = { ...USER, disabled: true };

    mockFindByUsernameSuccess(DISABLED_USER);
    mockValidPasswordSuccess();
    mockIssueJWTSuccess(DISABLED_USER);
    mockUpdateLastLoginSuccess(DISABLED_USER);

    const result = await login(USERNAME, PASSWORD);

    expect(result).toEqual({ error: userIsDisabled });
  });

  it("returns a 'userIsBlocked' error when the user is blocked", async () => {
    const BLOCKED_USER = { ...USER, 'user-status': 'blocked' };

    mockFindByUsernameSuccess(BLOCKED_USER);
    mockValidPasswordSuccess();
    mockIssueJWTSuccess(BLOCKED_USER);
    mockUpdateLastLoginSuccess(BLOCKED_USER);

    const result = await login(USERNAME, PASSWORD);

    expect(result).toEqual({ error: userIsBlocked });
  });

  it("returns a 'usernameOrPasswordIncorrect' error when the password is incorrect and the user is disabled", async () => {
    const DISABLED_USER = { ...USER, disabled: true };

    mockFindByUsernameSuccess(DISABLED_USER);
    mockValidPasswordFailure();
    mockIssueJWTSuccess(DISABLED_USER);
    mockUpdateLastLoginSuccess(DISABLED_USER);

    const result = await login(USERNAME, PASSWORD);

    expect(result).toEqual({ error: usernameOrPasswordIncorrect });
  });

  it("returns a 'usernameOrPasswordIncorrect' error when the password is incorrect and the user is blocked", async () => {
    const BLOCKED_USER = { ...USER, 'user-status': 'blocked' };

    mockFindByUsernameSuccess(BLOCKED_USER);
    mockValidPasswordFailure();
    mockIssueJWTSuccess(BLOCKED_USER);
    mockUpdateLastLoginSuccess(BLOCKED_USER);

    const result = await login(USERNAME, PASSWORD);

    expect(result).toEqual({ error: usernameOrPasswordIncorrect });
  });

  function mockFindByUsernameSuccess(user) {
    when(controller.findByUsername)
      .calledWith(USERNAME, expect.anything())
      .mockImplementation((username, callback) => callback(null, user));
  }

  function mockFindByUsernameReturnsNullUser() {
    when(controller.findByUsername)
      .calledWith(USERNAME, expect.anything())
      .mockImplementation((username, callback) => callback(null, null));
  }

  function mockFindByUsernameReturnsError() {
    when(controller.findByUsername)
      .calledWith(USERNAME, expect.anything())
      .mockImplementation((username, callback) => callback(ERROR, null));
  }

  function mockValidPasswordFailure() {
    when(utils.validPassword).calledWith(PASSWORD, HASH, SALT).mockReturnValue(false);
  }

  function mockValidPasswordSuccess() {
    when(utils.validPassword).calledWith(PASSWORD, HASH, SALT).mockReturnValue(true);
  }

  function mockIssueJWTSuccess(user) {
    when(utils.issueJWT)
      .calledWith(user)
      .mockReturnValue({ sessionIdentifier: SESSION_IDENTIFIER, ...TOKEN_OBJECT });
  }

  function mockUpdateLastLoginSuccess(user) {
    when(controller.updateLastLogin)
      .calledWith(user, SESSION_IDENTIFIER, expect.anything())
      .mockImplementation((aUser, sessionIdentifier, callback) => {
        callback();
      });
  }
});
