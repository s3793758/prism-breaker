const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const { typeDefs, resolvers } = require('./schemas/index');

const { ApolloServer } = require('apollo-server-express');
require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3031;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use('/api', userRoutes);

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.use(cors());
  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
})();
