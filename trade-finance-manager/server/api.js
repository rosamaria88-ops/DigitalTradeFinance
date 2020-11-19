import axios from 'axios';
import FormData from 'form-data';
import apollo from './graphql/apollo';

import { dealQuery } from './graphql/queries';

require('dotenv').config();

// const urlRoot = process.env.TRADE_FINANCE_MANAGER_API_URL;
const urlRoot = 'http://localhost:5200';


const getDeal = async () => {
  const response = await apollo('GET', dealQuery);
  console.log('getDeal response.data \n', response.data);

  return response.data.deal;
};

export default {
  getDeal
};
