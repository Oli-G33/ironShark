'use strict';

const express = require('express');
const Bookmark = require('../models/bookmarks');
const Game = require('../models/game');

const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');

// - GET - '/game/search' - Allows user to search for games.
router.get('/search', (req, res, next) => {
  const { title, genre, free, maximumPrice } = req.query;
  Game.find({
    title,
    genre,
    price: { $lte: maximumPrice }
  })
    .then((games) => {
      res.json({ games });
    })
    .catch((error) => {
      next(error);
    });
});

// - GET - '/game/:id' - Loads single game.
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Game.findById(id)
    .populate('owner')
    .then((game) => {
      res.json({ game });
    })
    .catch((error) => {
      next(error);
    });
});

// - PATCH - '/game/:id' - Allows user to edit game they own.
router.patch('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    gameUrl,
    description,
    genre,
    price,
    inStock,
    fileSize,
    cover,
    screenshots,
    trailer
  } = req.body;
  const owner = req.user._id;
  Game.findOneAndUpdate(
    { _id: id, owner },
    {
      title,
      gameUrl,
      description,
      genre,
      price,
      inStock,
      fileSize,
      cover,
      screenshots,
      trailer
    },
    { new: true }
  )
    .then((game) => {
      res.json({ game });
    })
    .catch((error) => {
      next(error);
    });
});

// - DELETE - '/game/:id' - Allows user to delete game they own.
router.delete('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const owner = req.user._id;
  Game.findOneAndDelete({ _id: id, owner })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

// - POST - '/game' - Add a new game.
router.post('/', routeGuard, (req, res, next) => {
  const {
    title,
    gameUrl,
    description,
    genre,
    price,
    inStock,
    fileSize,
    cover,
    screenshots,
    trailer
  } = req.body;
  const owner = req.user._id;
  Game.create({
    title,
    gameUrl,
    description,
    owner,
    genre,
    price,
    inStock,
    fileSize,
    cover,
    screenshots,
    trailer
  })
    .then((game) => {
      res.json({ game });
    })
    .catch((error) => {
      next(error);
    });
});

// - GET - '/game/bookmarked' - List all games an authenticated user has bookmarked.
router.get('/bookmarked', routeGuard, (req, res, next) => {
  const userId = req.user._id;
  Bookmark.find({ user: userId })
    .populate('game')
    .then((bookmarks) => {
      const games = bookmarks.map((Bookmark) => bookmarks.game);
      res.json({ games });
    })
    .catch((error) => {
      next(error);
    });
});

// - POST - '/game/:id/bookmark' - Set bookmark for this game on this users profile.
router.post('/:id/bookmark', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  /* Avioids creating a duplicate bookmark */
  Bookmark.findOne({ game: id, user: userId })
    .then((game) => {
      if (!game) {
        return Bookmark.create({ game: id, user: userId });
      }
    })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

// - DELETE - '/game/:id/bookmark' - Unset bookmark for this game on this users profile.
router.delete('/:id/bookmark', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Bookmark.findOneAndDelete({ game: id, user: userId })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
