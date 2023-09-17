const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.log("failed connecting to database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
