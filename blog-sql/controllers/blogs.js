const blogsRouter = require("express").Router();
const { Blog } = require("../models");
const { findBlog } = require("../util/helper");

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});
blogsRouter.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});
blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } });
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});
blogsRouter.put("/:id", findBlog, async (req, res, next) => {
  if (req.blog) {
    try {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } catch (error) {
      console.error(`Error updating likes: ${error.message}`);
      next(error);
    }
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;
