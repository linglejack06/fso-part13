const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET } = require("../util/config");

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.password || !body.username) {
      next({ message: "missing password or username" });
    }
    const user = await User.findOne({
      where: {
        username: body.username,
      },
    });
    if (!user) {
      next({ message: "Invalid username" });
    }
    const pwCorrect = await bcrypt.compare(body.password, user.passwordHash);
    if (pwCorrect) {
      const userForToken = {
        username: user.username,
        id: user.id,
      };

      const token = jwt.sign(userForToken, SECRET);
      res.status(200).send({ token, username: user.username, name: user.name });
    } else {
      next({ message: "invalid password" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
