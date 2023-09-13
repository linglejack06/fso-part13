const { Sequelize, DataTypes, Model, QueryTypes } = require("sequelize");
const express = require("express");

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

app.get("/api/blogs", async (req, res) => {
  await sequelize.authenticate();
  const blogs = await sequelize.query("SELECT * FROM blogs", {
    type: QueryTypes.SELECT
  });
  res.send(blogs);
  sequelize.close();
})

app.listen(3000, () => {
  console.log("RUNNING");
})