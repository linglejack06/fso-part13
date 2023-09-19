const express = require("express");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");

const app = express();
app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();
