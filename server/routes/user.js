const express = require('express');
const User = require('../models/User');
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

Router.get('/getData', (req, res) => {
  console.log('getting data');
  res.send('hello');
});

module.exports = Router;
