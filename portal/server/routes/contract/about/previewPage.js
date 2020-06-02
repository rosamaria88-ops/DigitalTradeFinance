import express from 'express';
import api from '../../../api';
import {
  requestParams,
  errorHref,
  generateErrorSummary,
} from '../../../helpers';

import { DEAL } from '../../api-data-provider';

import calculateStatusOfEachPage from './navStatusCalculations';

const router = express.Router();

router.get('/contract/:_id/about/preview', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  const deal = req.apiData[DEAL];

  // TODO dirty hack; this is how we apply the business rule
  //  "don't display error messages unless the user has viewed the preview page"
  await api.updateSubmissionDetails(deal, { hasBeenPreviewed: true }, userToken);

  const { validationErrors } = await api.getSubmissionDetails(_id, userToken);
  const formattedValidationErrors = generateErrorSummary(
    validationErrors,
    errorHref,
  );
  deal.supplyContract = {
    completedStatus: calculateStatusOfEachPage(Object.keys(formattedValidationErrors.errorList)),
  };

  return res.render('contract/about/about-supply-preview.njk', { deal, validationErrors: formattedValidationErrors });
});


export default router;
