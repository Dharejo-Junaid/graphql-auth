const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const startGQLServer = require("./graphql/startGQLServer");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const init = async () => {
  const app = express();
  app.use([cors(), express.json()]);

  const gqlServer = await startGQLServer();
  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, console.log(`Server started at PORT=${PORT}`));
};

init();
