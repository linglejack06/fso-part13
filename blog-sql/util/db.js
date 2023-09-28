const Sequelize = require("sequelize");
// eslint-disable-next-line import/no-extraneous-dependencies
const { Umzug, SequelizeStorage } = require("umzug");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const migrationConfig = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  console.log("Migrations are up to date", {
    files: migrations.map((mig) => mig.name),
  });
};
const rollBackMigrations = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down();
};
const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    return process.exit(1);
  }
  return null;
};

module.exports = { connectToDb, sequelize, rollBackMigrations };
