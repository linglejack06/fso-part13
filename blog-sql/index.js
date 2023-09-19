const express = require("express");
const { connectToDb } = require("./util/db");
const { PORT } = require("./util/config");
const blogsRouter = require("./controllers/blogs");

const app = express();
app.use(express.json());
app.use("/api/blogs", blogsRouter);

const startServer = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}. View at http://localhost:${PORT}`);
  });
};

startServer();
