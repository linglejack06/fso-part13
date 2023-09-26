require("dotenv").config();

module.exports = {
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://jack:sqlisbest@localhost:5432/postgres",
  PORT: process.env.PORT || 3000,
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  SECRET: "BLUEMAN",
};
