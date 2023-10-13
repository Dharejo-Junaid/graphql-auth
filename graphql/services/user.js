const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../helpers/jwt");

const typeDefs = `#graphql

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
    login: async (_, { user }) => {
      const { email, password } = user;

      user = await User.findOne({ email });
      if (!user) throw new Error("User does not exist");

      if (!user.verified) throw new Error("Account is not verified");

      if (!(await bcrypt.compare(password, user.password)))
        throw new Error("Incorrect password");

      const token = generateToken(user._id);
      return token;
    },
  },
  Mutation: {
    signup: async (_, { user }) => {
      const { username, email, password } = user;

      user = await User.findOne({ email: email.toLowerCase() });
      if (user) throw new Error("This email already exists");

      const emailExp = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      if (!emailExp.test(email)) throw new Error("Not a valid email");

      const hashPass = await bcrypt.hash(password, 10);
      user = await User.create({
        username,
        email: email.toLowerCase(),
        password: hashPass,
      });

      const token = generateToken(user._id);
      return token;
    },
  },
};

module.exports = { typeDefs, resolvers };
