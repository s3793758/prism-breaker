const mongoose = require('mongoose');

const RaceSchema = new mongoose.Schema(
  {
    index: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      requird: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = RaceSchema;
