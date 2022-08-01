const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const { typeDefs, resolvers } = require('./schemas/index');

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

//app.use('/api', userRoutes);

(async () => {
  app.use(graphqlUploadExpress());
  await server.start();
  server.applyMiddleware({ app });

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
})();
