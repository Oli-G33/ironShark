'use strict';

const express = require('express');
const Game = require('../models/game');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

// - GET - / - List games and profiles
router.get('/', (req, res, next) => {
  let games;
  Game.find()
    .limit(10)
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

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
