const { default: mongoose } = require("mongoose");

const connectMongo = async () => {
  const URI = process.env.MONGO_URI || "mongodb://mongo:27017/auth";

  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Issue in connecting MongoDB");
  }
};

module.exports = { connectMongo };
