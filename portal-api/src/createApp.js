const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const passport = require('passport');
const compression = require('compression');
// const helmet = require('helmet');

const { ApolloServer } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const healthcheck = require('./healthcheck');

const { resolvers, typeDefs, graphQlRouter } = require('./graphql');
const { validateUserMiddleware } = require('./graphql/middleware');

dotenv.config();

const { CORS_ORIGIN } = process.env;

const configurePassport = require('./v1/users/passport');
const { authRouter, openRouter, authRouterAllowXss } = require('./v1/routes');

configurePassport(passport);

const app = express();

// Global middleware set headers
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, noimageindex, nosnippet');
  next();
});

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

app.use(graphQlRouter);

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, validateUserMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
  schema: schemaWithMiddleware,
});

server.applyMiddleware({ app });

app.use((err) => { console.error(err); });

module.exports = app;
