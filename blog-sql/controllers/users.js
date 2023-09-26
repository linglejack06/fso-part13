const router = require("express").Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { SALT_ROUNDS } = require("../util/config");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
    });
    return res.json(users);
  } catch (error) {
    next(error);
  }
  return null;
});
router.post("/", async (req, res, next) => {
  try {
    const pwHash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({
      username: req.body.username,
      name: req.body.name,
      passwordHash: pwHash,
    });
    // so it is not sent
    user.passwordHash = null;
    return res.json(user);
  } catch (error) {
    next(error);
  }
  return null;
});
router.put("/:username", async (req, res, next) => {
  if (!req.body.password) {
    return next({ message: "No password provided" });
  }
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (!user) return next({ message: "Cannot find user with that username" });
    const pwCorrect = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
    if (!pwCorrect) return next({ message: "Invalid password" });
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
  return null;
});

module.exports = router;
