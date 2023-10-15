const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const startGQLServer = require("./graphql/startGQLServer");
const cors = require("cors");
const { connectMongo } = require("./utils/mongo");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const init = async () => {
  const app = express();
  app.use([cors(), express.json()]);

  try {
    const gqlServer = await startGQLServer();
    app.use("/graphql", expressMiddleware(gqlServer));

    await connectMongo();

    app.listen(PORT, console.log(`Server started at PORT=${PORT}`));
  } catch (err) {
    console.log(err.message);
  }
};

init();
