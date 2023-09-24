const Note = require("./note");
const User = require("./user");
const Team = require("./team");
const Membership = require("./membership");
// assigns foreign keys to each model for join queries
User.hasMany(Note);
Note.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

module.exports = {
  Note,
  User,
  Team,
  Membership,
};
