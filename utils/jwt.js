const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  const JWT_SECRET = process.env.JWT_SECRET || "1234567890";
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "100h" });
};

const verifyToken = (token) => {
  const JWT_SECRET = process.env.JWT_SECRET || "1234567890";
  const payload = jwt.verify(token, JWT_SECRET);
  return payload._id;
};

module.exports = { generateToken, verifyToken };
