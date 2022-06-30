'use strict';

const express = require('express');
const Game = require('../models/game');
const router = new express.Router();
const User = require('../models/user');
const routeGuard = require('./../middleware/route-guard');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let user;
  User.findById(id)
    .then((document) => {
      user = document;
      return Game.find({ owner: id });
    })
    .then((games) => {
      res.json({ profile: user, games });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/', routeGuard, (req, res, next) => {
  const { name, email, picture } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email, picture }, { new: true })
    .then((user) => {
      res.json({ profile: user });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
