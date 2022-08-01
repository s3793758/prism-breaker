const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Router = express.Router();

Router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    console.log({ user });
    await user.save();
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong. Try again later.');
  }
});

module.exports = Router;
