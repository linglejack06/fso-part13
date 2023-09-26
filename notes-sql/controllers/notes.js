const notesRouter = require("express").Router();
const { Op } = require("sequelize");
const { Note, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(400).json({ error: "token missing" });
  }
  return next();
};
notesRouter.get("/", async (req, res) => {
  try {
    const where = {};
    if (req.query.important) {
      where.important = req.query.important === "true";
    }
    if (req.query.search) {
      where.content = {
        [Op.substring]: req.query.search,
      };
    }
    const notes = await Note.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      where,
    });
    res.json(notes);
  } catch (error) {
    res.status(400).send(error);
  }
});
notesRouter.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: "invalid authentication token" });
    }
    console.log(req.body);
    // sets foreign user key with userId
    const note = await Note.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(note);
  } catch (error) {
    res.status(400).json(error.message);
  }
  return null;
});
notesRouter.get("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});
notesRouter.delete("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy();
  }
  res.status(204).end();
});
notesRouter.put("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    req.note.important = req.body.important;
    await req.note.save(0);
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

module.exports = notesRouter;
