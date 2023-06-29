import axios from 'axios';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { FACILITY_TYPE, PRODUCT_GROUP } from '../../constants';
dotenv.config();

const mapProductGroup = (facilityType: any) => {
  if (facilityType === FACILITY_TYPE.BOND) {
    return PRODUCT_GROUP.BOND;
  }

  if (facilityType === FACILITY_TYPE.LOAN) {
    return PRODUCT_GROUP.LOAN;
  }

  if (facilityType === FACILITY_TYPE.CASH) {
    // TODO: DTFS2-4633 - use correct product group.
    // TEMP whilst we don't know what product group to use for GEF.
    return PRODUCT_GROUP.LOAN;
  }

  if (facilityType === FACILITY_TYPE.CONTINGENT) {
    // TODO: DTFS2-4633 - use correct product group.
    // TEMP whilst we don't know what product group to use for GEF.
    return PRODUCT_GROUP.LOAN;
  }

  return null;
};

/**
Objective:
  The objective of the `getExposurePeriod` function is to calculate the exposure period in months between
  two dates provided and an optional product group. It makes a call to an external API and
  returns the exposure period in months with a status code or a `400` status code with an empty object as `data`.

Inputs:
  `req`: an Express request object
  `res`: an Express response object

Flow:
  1. Destructure `startDate`, `endDate`, and `facilityType` from `req.params`.
  2. Map `facilityType` to `productGroup` using the `mapProductGroup` function.
  3. Make a GET request to an external API with `startDate`, `endDate`, and `productGroup` as query parameters.
  4. If the response is falsy, return a `400` status code with an empty object as `data`.
  5. Destructure `status` and `data` from the response.
  6. Destructure `exposurePeriod` from `data`.
  7. Return the exposure period in months with a status code.

Outputs:
  `exposurePeriodInMonths`: the exposure period in months
  Status code

Additional aspects:
  The `mapProductGroup` function maps `facilityType` to `productGroup` based on predefined constants.
  The function uses the `axios` library to make a GET request to an external API.
  The function handles errors by returning a `400` status code with an empty object as `data`.
 */

/**
 * Calculates exposure period in months between two dates provided and
 * an optional product group
 * @param req Express request
 * @param res Express response
 * @returns Exposure period in months with status code,
 * otherwise `400` status code with empty object as `data`.
 */
export const getExposurePeriod = async (req: Request, res: Response) => {
  const { startDate, endDate, facilityType } = req.params;

  const productGroup = mapProductGroup(facilityType);

  console.info('Calling Exposure Period API');
  const mdm: any = process.env.APIM_MDM_URL;
  const headers = {
    [String(process.env.APIM_MDM_KEY)]: process.env.APIM_MDM_VALUE,
  };

  try {
    const response = await axios({
      method: 'get',
      url: `${mdm}exposure-period?startdate=${startDate}&enddate=${endDate}&productgroup=${productGroup}`,
      headers,
    });

    if (!response) {
      return res.status(400).send({});
    }

    const { status, data } = response;
    const { exposurePeriod } = data;

    return res.status(status).send({
      exposurePeriodInMonths: exposurePeriod,
    });
  } catch (err) {
    console.error('Error calling Exposure Period API', { err });
    return res.status(400).send({});
  }
};