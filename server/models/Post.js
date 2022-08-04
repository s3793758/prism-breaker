const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postMessage: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
    },
    postVideo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
