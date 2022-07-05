'use strict';

const express = require('express');

const Library = require('../models/library');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// - GET - '/game/search' - Allows user to search for games.
router.get('/gamelist', (req, res, next) => {
  const { user, gameId, boolean } = req.params;
  Library.find({
    user
  })
    .then((games) => {
      res.json({ games });
    })
    .catch((error) => {
      next(error);
    });
});
