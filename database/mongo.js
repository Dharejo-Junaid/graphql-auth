const { default: mongoose } = require("mongoose");

const URI = "mongodb://localhost:27017/auth";

const connectMongo = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Issue in connecting MongoDB");
  }
};

module.exports = { connectMongo };
