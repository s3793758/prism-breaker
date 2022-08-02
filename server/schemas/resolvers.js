const { gql } = require('apollo-server-express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        console.log({ isMatchingPassword });
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
        console.log(args.input);
        const user = new User(args.input);
        console.log({ user });
        await user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw new Error('Something went wrong. Try again later.');
      }
    },
  },
};

module.exports = resolvers;
