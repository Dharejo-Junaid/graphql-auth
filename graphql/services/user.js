const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../../utils/jwt");
const { sendVerificationEmail } = require("../../utils/emails");

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
    signup(user: SignupInput!): Boolean!,
    verify(token: String): Boolean!
  }
`;

const resolvers = {
  Query: {
    login: async (_, { user }) => {
      const { email, password } = user;

      user = await User.findOne({ email });
      if (!user) throw new Error("User does not exist");

      if (!(await bcrypt.compare(password, user.password)))
        throw new Error("Incorrect password");

      const token = generateToken(user._id);

      if (!user.verified) {
        await sendVerificationEmail(user._id, email, token);
        throw new Error("Account is not verified");
      }

      return token;
    },
  },
  Mutation: {
    signup: async (_, { user }) => {
      const { username, email, password } = user;

      const emailExp = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      if (!emailExp.test(email)) throw new Error("Not a valid email");

      user = await User.findOne({ email: email.toLowerCase() });
      if (user) throw new Error("This email already exists");

      const hashPass = await bcrypt.hash(password, 10);
      user = await User.create({
        username,
        email: email.toLowerCase(),
        password: hashPass,
      });

      const token = generateToken(user._id);
      await sendVerificationEmail(user._id, email, token);
      return true;
    },

    verify: async (_, { token }) => {
      const _id = verifyToken(token);
      if (!_id) throw new Error("Token is not valid");

      const user = await User.findByIdAndUpdate(
        _id,
        { verified: true },
        { new: true }
      );

      return user.verified;
    },
  },
};

module.exports = { typeDefs, resolvers };
