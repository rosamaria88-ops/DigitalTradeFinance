import httpError from 'http-errors';

const parseBool = (params) => !(
  params === 'false'
    || params === '0'
    || params === ''
    || params === undefined
);

const userToken = (req) => {
  const token = req.session.userToken;
  return token;
};

const isObject = (el) => typeof el === 'object' && el !== null && !(el instanceof Array);

const errorHandler = (error) => {
  if (error.code === 'ECONNABORTED') {
    return httpError(501, 'Request timed out.');
  }

  return httpError(error.response.status, error.response.statusText);
};

const validationErrorHandler = (errs, href = '') => {
  const errorSummary = [];
  const fieldErrors = {};
  const errors = isObject(errs) ? [errs] : errs;

  errors.forEach((el) => {
    errorSummary.push({
      text: el.errMsg,
      href: `${href}#${el.errRef}`,
    });
    fieldErrors[el.errRef] = {
      text: el.errMsg,
    };
  });

  return {
    errorSummary,
    fieldErrors,
  };
};

export {
  parseBool,
  userToken,
  isObject,
  errorHandler,
  validationErrorHandler,
};
