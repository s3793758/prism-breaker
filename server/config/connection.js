const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(() => {
    console.log('database connection is successful');
  })
  .catch((err) => {
    console.log('error connecting database');
  });
