const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../helpers/jwt");

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
        signup(user: SignupInput!): String!,
    }
`;

const resolvers = {
  Query: {
    login: async () => {},
  },
  Mutation: {
    signup: async (_, { user }) => {
      const { username, email, password } = user;

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) throw new Error("This email already exists");

      const emailExp = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      if (!emailExp.test(email)) throw new Error("Not a valid email");

      const hashPass = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email: email.toLowerCase(),
        password: hashPass,
      });

      const token = generateToken(newUser._id);
      return token;
    },
  },
};

module.exports = { typeDefs, resolvers };
