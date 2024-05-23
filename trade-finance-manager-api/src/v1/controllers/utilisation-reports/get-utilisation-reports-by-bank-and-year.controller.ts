import { Request, Response } from 'express';
import axios from 'axios';
import api from '../../api';

/**
 * Fetches a list of utilisation reports reconciliation progress for specified submission year and bank.
 */
export const getSubmittedReportsByBankAndYear = async (req: Request<{ bankId: string; year: string }>, res: Response) => {
  const { bankId, year } = req.params;
  try {
    const summary = await api.getUtilisationReportsByBankIdAndYear(bankId, year);
    res.status(200).send(summary);
  } catch (error) {
    const errorMessage = `Failed to get previous utilisation reports by bank id ${bankId} and year ${year}`;
    console.error(errorMessage, error);
    const statusCode = (axios.isAxiosError(error) && error.response?.status) || 500;
    res.status(statusCode).send(errorMessage);
  }
};
