const debug = require('debug')('TAT:app');
const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./routers');
const session = require('express-session');
// const swagger = require('./services/swagger');

const app = express();

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'topsecret',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  // session de 30 jours
  sameSite: 'none',
  secure: false,
  name: 'supersession',
  credentials: true,
}));
// Swagger setup
// swagger(app, path.join(__dirname, 'routers'));

// CORS setup
const corsOptions = {
  origin: process.env.CORS_DOMAINS ?? '*',
};

// Middlewares setup
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname,'../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((request, _, next) => {
  debug(`${request.method} ${request.url} - ${request.ip}`);
  next();
});

app.use(router);

module.exports = app;