'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    purchased: {
      type: Boolean
    }
  },

  { timestamps: true }
);

const Library = mongoose.model('Library', schema);

module.exports = Library;
