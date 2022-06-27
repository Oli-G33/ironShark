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
      enum: ['action', 'racing'],
      require: true
    },

    price: {
      type: Number,
      required: true,
      min: 2
    },

    inStock: {
      type: Boolean,
      required: true
    },

    fileSize: {
      type: Number,
      required: true,
      min: 0
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', schema);

module.exports = Game;
