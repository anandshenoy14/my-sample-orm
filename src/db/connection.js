/* connection/js */

const Sequelize = require("sequelize");
const sequelize = new Sequelize("UserPostsDB", "root", "DontAskAgain123!", {
    host: "127.0.0.1",
    dialect: "mysql"
});
// const establishRelations = () => {
//     User.hasMany(Tweet, { as: "Tweets", foreignKey: "userId" });
//     Tweet.belongsTo(User, { as: "User", foreignKey: "userId" });
// }
// establishRelations()
module.exports = sequelize;
global.sequelize = sequelize;