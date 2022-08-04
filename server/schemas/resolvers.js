const { gql } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const UserDetails = require('../models/UserDetails');
const GameDetails = require('../models/GameDetails');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');

const cloudinary = require('../config/cloudinary');

const sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    user: async (parent, { username }, context) => {
      try {
        const user = await User.findOne({ username });
        console.log({ user });
        return user;
      } catch (error) {
        console.log(error);
        throw new Error('Error while getting user details');
      }
    },
    posts: async (parent, { userId }, context) => {
      try {
        if (userId) {
          const posts = await Post.find({
            userId,
          })
            .populate('userId')
            .sort({ createdAt: -1 });
          return posts;
        } else {
          return await Post.find({}).populate('userId').sort({ createdAt: -1 });
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userDetails: async (parent, { username }, context) => {
      try {
        const user = await User.findOne({ username });
        const details = await UserDetails.findOne({ userId: user._id });
        return details;
      } catch (error) {
        throw new Error('Error while getting user details.');
      }
    },
    gameDetails: async (parent, { username }, context) => {
      try {
        const user = await User.findOne({ username });
        const details = await GameDetails.findOne({ userId: user._id });
        return details;
      } catch (error) {
        console.log(error);
        throw new Error('Error while getting game details');
      }
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User with provided email does not exist.');
        }

        const isMatchingPassword = await bcrypt.compare(
          password,
          user.password
        );
        if (isMatchingPassword) {
          return user;
        } else {
          throw new Error('Invalid Password.');
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    register: async (parent, args, context) => {
      try {
        const { username, email } = args.input || {};
        const usernameTaken = await User.findOne({
          username,
        });
        console.log({ args }, { usernameTaken });
        if (usernameTaken) {
          throw new Error(
            'Username is already taken. Please choose another username'
          );
        }
        const emailTaken = await User.findOne({
          email,
        });

        if (emailTaken) {
          throw new Error(
            'Email is already taken. Please choose another email'
          );
        }
        const user = new User(args.input);
        await user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    addUserDetails: async (parent, args, context) => {
      try {
        const isFound = await UserDetails.findOne({
          userId: args.input?.userId,
        });
        let details;
        if (!isFound) {
          details = new UserDetails({
            ...args.input,
          });
          await details.save();
        } else {
          details = await UserDetails.findOneAndUpdate(
            {
              userId: args.input?.userId,
            },
            {
              ...args.input,
            },
            { new: true }
          );
        }
        return details;
      } catch (error) {
        console.log(error);
        throw new Error('Error while updating user details');
      }
    },
    addGameDetails: async (parent, { input }, context) => {
      try {
        const { race, userId, selectedClass } = input;
        const details = await GameDetails.findOne({
          userId,
        });
        if (!details) {
          const gamedetails = new GameDetails({
            userId,
            race,
            selectedClass,
          });

          await gamedetails.save();
          return gamedetails;
        } else {
          const updatedDetails = await GameDetails.findOneAndUpdate(
            {
              userId,
            },
            {
              race,
              selectedClass,
            },
            { new: true }
          );
          return updatedDetails;
        }
      } catch (error) {
        console.log(error);
        throw new Error('Error while updating game details.');
      }
    },
    uploadProfileImage: async (parent, args, context) => {
      try {
        const user = await User.findOne({ _id: args.userId });
        if (!user) {
          throw new Err('Invalid userId');
        }
        const response = await cloudinary.uploader.upload(args.image, {
          folder: `images/profile_pics/user_${args.userId}}`,
        });

        user.profileImage = response.secure_url;
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    singleUpload: async (parent, { file, userId, postId }) => {
      try {
        console.log({ file });
        const { createReadStream, filename, mimetype, encoding } =
          await file?.file;

        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();
        const filePath = path.join(__dirname, '..', `images/${filename}`);

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        const out = fs.createWriteStream(filePath);
        stream.pipe(out);

        await sleep(200);

        const user = await User.findOne({ _id: userId });
        if (!user) {
          throw new Error('Inavlid user id');
        }

        const response = await cloudinary.uploader.upload(filePath, {
          folder: `images/post_images`,
        });
        console.log({ url: response });

        await Post.findOneAndUpdate(
          {
            _id: postId,
          },
          {
            postImage: response.secure_url,
          },
          {
            new: true,
          }
        );

        fs.unlinkSync(filePath);

        return { filePath: response.secure_url };
      } catch (error) {
        console.log({ error });
        throw new Error('Eror while adding post');
      }
    },
    addPost: async (
      parent,
      { postMessage, postImage, postVideo, userId },
      context
    ) => {
      try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
          throw new Error('Invalid user id');
        }

        /*  if (postImage) {
          const response = await cloudinary.uploader.upload(postImage, {
            folder: `images/posts/user_${args.userId}}`,
          });
          console.log('image_url', response?.secure_url);
        }

        if (postVideo) {
          const response = await cloudinary.uploader.upload(postVideo, {
            folder: `videos/posts/user_${args.userId}}`,
          });
          console.log('video_url', response);
        }*/

        const post = new Post({
          userId,
          postMessage,
          //  postImage: postImage ? postImage : '',
          // postVideo: postVideo ? postVideo : '',
        });

        await post.save();

        return post;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deletePost: async (parent, { postId, userId }) => {
      try {
        const user = await Post.findOne({ _id: postId, userId });
        if (!user) {
          throw new Error("You're not allowed to delete this post.");
        }
        const post = await Post.findOneAndDelete({ _id: postId });
        return post;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  User: {
    posts: async (parent, args, context) => {
      try {
        const posts = await Post.find({
          userId: parent._id,
        })
          .populate('userId')
          .sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error('Error while getting list of user posts.');
      }
    },
  },
};

module.exports = resolvers;
