const Sequelize = require("sequelize");
// eslint-disable-next-line import/no-extraneous-dependencies
const { Umzug, SequelizeStorage } = require("umzug");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });
  const migrations = await migrator.up();
  console.log("migrations are up to date", {
    files: migrations.map((mig) => mig.name),
  });
};
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to database");
  } catch (error) {
    console.log("failed connecting to database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
