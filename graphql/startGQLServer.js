const { ApolloServer } = require("@apollo/server");
const user = require("./services/user");

const startGQLServer = async () => {
  const typeDefs = `#graphql
    ${user.typeDefs}
  `;

  const resolvers = {
    Query: {
      ...user.resolvers.Query,
    },

    Mutation: {
      ...user.resolvers.Mutation,
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  return server;
};

module.exports = startGQLServer;
