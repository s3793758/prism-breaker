const express = require('express');
const path = require('path');
//const cors = require('cors');
const paymentRoutes = require('./routes/payment');
const { typeDefs, resolvers } = require('./schemas/index');

//   "start": "concurrently \"cd server && npm run start\" \"cd client && npm start\"",

const { ApolloServer } = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3030;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  app.use(graphqlUploadExpress());
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.static(path.join(__dirname, '..', 'client/build')));

  // app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(paymentRoutes);

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/build/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
