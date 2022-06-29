'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    gameUrl: {
      type: String,
      required: true
    },

    description: {
      type: String,
      maxLength: 5000,
      trim: true
    },

    genre: {
      type: String,
      enum: ['action', 'horror', 'adventure', 'racing', 'fighting', 'sports'],
      require: true
    },

    price: {
      type: Number,
      required: true,
      min: 2
    },

    cover: {
      type: String,
      require: true
    },

    screenshots: [
      {
        type: String
      }
    ],

    trailer: {
      type: String
    }
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', schema);

module.exports = Game;
