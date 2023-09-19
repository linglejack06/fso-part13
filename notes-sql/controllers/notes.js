const notesRouter = require("express").Router();
const { Note } = require("../models");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};
notesRouter.get("/", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});
notesRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    res.status(400).json({ error });
  }
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