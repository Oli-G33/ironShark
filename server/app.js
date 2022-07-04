'use strict';

const path = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cors = require('cors');
const expressSession = require('express-session');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const baseRouter = require('./routes/base');
const authenticationRouter = require('./routes/authentication');
const gameRouter = require('./routes/game');
const ImageKit = require('imagekit');
const profileRouter = require('./routes/profile');
const User = require('./models/user');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const imagekit = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/p8y8zbsn1',
  publicKey: 'public_zuna+geOzioLn2fOkcxMCWNf+Qs=',
  privateKey: 'private_7d7yxwd8OFudu4LCost3weFJks0='
});

const app = express();

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Added for Stripe
app.use(express.static('public'));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.get('/authentication', function (req, res) {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(
  cors({
    ...(process.env.CLIENT_APP_ORIGINS && {
      origin: process.env.CLIENT_APP_ORIGINS.split(',')
    }),
    credentials: true
  })
);
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    proxy: true,
    proxy: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
      secure: process.env.NODE_ENV === 'production'
    },
    store: connectMongo.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

// Stripe

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post('/create-payment-intent', async (req, res) => {
  const { price } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/profile', profileRouter);
app.use('/game', gameRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
