const mongoose = require('mongoose');
const RaceSchema = require('./RaceSchema');

const GameDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    race: {
      type: RaceSchema,
    },
    selectedClass: {
      type: RaceSchema,
    },
  },
  {
    timestamps: true,
  }
);

const GameDetails = mongoose.model('GameDetails', GameDetailsSchema);

module.exports = GameDetails;
