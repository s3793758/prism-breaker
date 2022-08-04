const mongoose = require('mongoose');
const UserDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    gamingName: {
      type: String,
    },
    userRole: {
      type: String,
    },
    location: {
      type: String,
    },
    playingPreference: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserDetails;
