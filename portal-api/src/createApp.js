const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const passport = require('passport');
const compression = require('compression');
// const helmet = require('helmet');

const healthcheck = require('./healthcheck');

dotenv.config();

const { CORS_ORIGIN } = process.env;

const configurePassport = require('./v1/users/passport');
const { authRouter, openRouter, authRouterAllowXss } = require('./v1/routes');

configurePassport(passport);

const app = express();
// TODO: re-enable Helmet (Jira - 4998)
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   }),
// );
app.use(healthcheck);
app.use(passport.initialize());
app.use(express.json());
app.use(compression());

app.use(cors({
  origin: CORS_ORIGIN,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/v1', openRouter);
app.use('/v1', authRouterAllowXss);
app.use('/v1', authRouter);

app.use((err) => { console.error(err); });

module.exports = app;
