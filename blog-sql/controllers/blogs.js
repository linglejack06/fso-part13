const blogsRouter = require("express").Router();
const { Blog } = require("../models");

blogsRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error });
  }
});
blogsRouter.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});
blogsRouter.delete("/:id", async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } });
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = blogsRouter;
