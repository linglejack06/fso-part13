const Note = require("./note");
const User = require("./user");
// assigns foreign keys to each model for join queries
User.hasMany(Note);
Note.belongsTo(User);

Note.sync();
User.sync();

module.exports = {
  Note,
  User,
};
