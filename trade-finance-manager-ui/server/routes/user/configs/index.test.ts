import { isTfmSsoFeatureFlagEnabled } from '@ukef/dtfs2-common';
import { Router } from 'express';
import { getUserRouter } from '.';
import { getUserSsoRouter } from './user-sso';
import { getUserNonSsoRouter } from './user-non-sso';

jest.mock('@ukef/dtfs2-common', () => ({
  isTfmSsoFeatureFlagEnabled: jest.fn(),
}));

jest.mock('./user-sso', () => ({
  getUserSsoRouter: jest.fn(),
}));

jest.mock('./user-non-sso', () => ({
  getUserNonSsoRouter: jest.fn(),
}));

describe('user routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserRouter', () => {
    it('should return userSsoRouter if isTfmSsoFeatureFlagEnabled is true', () => {
      jest.mocked(isTfmSsoFeatureFlagEnabled).mockReturnValue(true);
      jest.mocked(getUserSsoRouter).mockReturnValue('userSsoRouter' as unknown as Router);

      expect(getUserRouter()).toEqual('userSsoRouter');
      expect(getUserSsoRouter).toHaveBeenCalledTimes(1);
      expect(getUserNonSsoRouter).not.toHaveBeenCalled();
    });

    it('should return userNonSsoRouter if isTfmSsoFeatureFlagEnabled is false', () => {
      jest.mocked(isTfmSsoFeatureFlagEnabled).mockReturnValue(false);
      jest.mocked(getUserNonSsoRouter).mockReturnValue('userNonSsoRouter' as unknown as Router);

      expect(getUserRouter()).toEqual('userNonSsoRouter');
      expect(getUserNonSsoRouter).toHaveBeenCalledTimes(1);
      expect(getUserSsoRouter).not.toHaveBeenCalled();
    });
  });
});
