const Note = require("./note");
const User = require("./user");
// assigns foreign keys to each model for join queries
User.hasMany(Note);
Note.belongsTo(User);
// causes data in database to match model
Note.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  Note,
  User,
};
