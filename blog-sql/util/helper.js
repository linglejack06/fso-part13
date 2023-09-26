const { Blog } = require("../models");

const findBlog = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (error) {
    console.error(
      `Error finding blog with id ${req.params.id} \n\n ${error.message}`
    );
  }
};
const handleError = async (error, req, res, next) => {
  res.status(400).send(error.message);
  next();
};

module.exports = {
  findBlog,
  handleError,
};
