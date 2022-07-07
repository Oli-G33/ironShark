'use strict';

const express = require('express');
const Game = require('../models/game');
const User = require('../models/user');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const ImageKit = require('imagekit');

// - GET - / - List games and profiles
router.get('/', (req, res, next) => {
  let games;
  //res.json({ message: 'success' });

  Game.find()
    // .limit(10)
    .sort({ createdAt: -1 })
    .then((documents) => {
      games = documents;
      return User.find().limit(10).sort({ createdAt: -1 });
    })
    .then((profiles) => {
      res.json({ games, profiles });
    })
    .catch((error) => {
      next;
    });
});

router.get('/imagekit-authentication', (req, res, next) => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_API_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_API_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.json(authenticationParameters);
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
