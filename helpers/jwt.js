const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "1234567890";

const generateToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "100h" });
};

module.exports = { generateToken };
