const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user",
  }
);

module.exports = User;
