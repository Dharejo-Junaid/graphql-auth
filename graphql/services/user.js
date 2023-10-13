const typeDefs = `#graphql
    type User {
        username: String!,
        email: String!
        verified: Boolean!
    },

    input SignupInput {
        username: String!,
        email: String!,
        password: String!
    },

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        login(user: LoginInput): String!
    }

    type Mutation {
        signup(user: SignupInput!): User!,
    }
`;

const resolvers = {
  Query: {
    login: async () => {},
  },
  Mutation: {
    signup: async (_, { user }) => {
      return { ...user, verified: false };
    },
  },
};

module.exports = { typeDefs, resolvers };
