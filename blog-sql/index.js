const express = require("express");
const { connectToDb } = require("./util/db");
const { PORT } = require("./util/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { handleError } = require("./util/helper");

const app = express();
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(handleError);

const startServer = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}. View at http://localhost:${PORT}`);
  });
};

startServer();
