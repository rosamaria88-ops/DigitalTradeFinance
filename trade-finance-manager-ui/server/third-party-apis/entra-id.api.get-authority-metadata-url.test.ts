import axios from 'axios';
import MockAdapter = require('axios-mock-adapter');
import { EntraIdConfig } from '../configs/entra-id.config';
import { EntraIdApi } from './entra-id.api';
import { EntraIdConfigMockBuilder } from '../../test-helpers/mocks';

const mockAxios = new MockAdapter(axios);

describe('EntraIdApi', () => {
  describe('getAuthorityMetadataUrl', () => {
    let entraIdConfig: EntraIdConfig;
    let entraIdApi: EntraIdApi;

    const authorityMetadataUrl = 'mock-authority-metadata-url';

    beforeEach(() => {
      jest.resetAllMocks();

      entraIdConfig = new EntraIdConfigMockBuilder().with({ authorityMetadataUrl }).build();

      entraIdApi = new EntraIdApi({ entraIdConfig });

      mockAxios.reset();
      mockAxios.onGet(authorityMetadataUrl).reply(200, { aMetaDataObject: 'a-meta-data-value' });
    });

    it('returns the response data from the api call', async () => {
      // Act
      const result = entraIdApi.getAuthorityMetadataUrl();

      // Assert
      await expect(result).resolves.toEqual({ aMetaDataObject: 'a-meta-data-value' });
    });
  });
});
