const usersRouter = require("express").Router();
const { User, Note } = require("../models");

usersRouter.get("/", async (req, res) => {
  try {
    // creates join query
    const users = await User.findAll({
      include: {
        model: Note,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(400).send({ error });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).send({ error });
  }
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = usersRouter;
