// eslint-disable-next-line import/no-extraneous-dependencies
const { jwt } = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET } = require("./config");

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  return next();
};
const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  return next();
};

module.exports = { isAdmin, tokenExtractor };
