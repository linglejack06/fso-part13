const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    return process.exit(1);
  }
  return null;
};

module.exports = { connectToDb, sequelize };
