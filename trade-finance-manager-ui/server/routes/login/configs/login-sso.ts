import express from 'express';
import { LoginController } from '../../../controllers/login/loginSso/login.controller';
import { GetRouter } from '../../../types/get-router';
import { EntraIdService } from '../../../services/entra-id.service';
import { EntraIdConfig } from '../../../configs/entra-id.config';
import { EntraIdApi } from '../../../third-party-apis/entra-id.api';

export const getLoginSsoRouter: GetRouter = () => {
  const entraIdConfig = new EntraIdConfig();
  const entraIdApi = new EntraIdApi({ entraIdConfig });
  const entraIdService = new EntraIdService({ entraIdConfig, entraIdApi });
  const loginController = new LoginController({ entraIdService });

  const loginSsoRouter = express.Router();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
  loginSsoRouter.get('/', loginController.getLogin);

  return loginSsoRouter;
};