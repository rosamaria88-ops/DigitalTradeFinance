import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import nunjucks from 'nunjucks';
import path from 'path';
import routes from './routes';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(session({
  secret: 'test test test',
  resave: false,
  saveUninitialized: true,
}));

app.use(cookieParser()); // could optionally use a secret here
app.use(flash());

const appViews = [
  'node_modules/govuk-frontend',
  'templates',
];

nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});

app.use(express.urlencoded());

app.use(morgan('dev', {
  skip: (req) => req.url.startsWith('/assets') || req.url.startsWith('/main.js'),
}));

app.use('/', routes);

app.use(express.static('dist'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('*', (req, res) => res.render('page-not-found.njk', { user: req.session.user }));

app.listen(PORT, () => console.log(`DTFS2 app listening on port ${PORT}!`)); // eslint-disable-line no-console
