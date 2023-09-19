const loginRouter = require("express").Router();
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const User = require("../models");

loginRouter.post("/", async (req, res) => {
  const { body } = req;
  try {
    const user = await User.findOne({
      where: {
        username: body.username,
      },
    });
    const pwCorrect = body.password === "secret";
    if (!(user && pwCorrect)) {
      res.status(401).json({
        error: "Invalid username or password",
      });
    }
    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = loginRouter;
