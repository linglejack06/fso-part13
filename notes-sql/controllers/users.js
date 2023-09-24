const usersRouter = require("express").Router();
const { User, Note, Team } = require("../models");
const { tokenExtractor, isAdmin } = require("../util/middleware");

usersRouter.get("/", async (req, res) => {
  try {
    // creates join query
    const users = await User.findAll({
      include: [
        {
          model: Note,
          attributes: { exclude: ["userId"] },
        },
        {
          model: Team,
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
      ],
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
usersRouter.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    if (user) {
      user.disabled = req.body.disabled;
      await user.save();
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
  return null;
});

module.exports = usersRouter;
