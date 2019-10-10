/* src/bootstrap.js */
//Export a default function (we use Async/Await)
const Tweet = require("./models/tweets");
const User = require("./models/users");
const chalk = require('chalk');

//Generic Error Handler 
const errHandler = err => {
    //Catch and log any error.
    console.error(chalk.red("Error: ", err));
};

const establishRelations = () => {
    User.hasMany(Tweet, { as: "Tweets", foreignKey: "userId" });
    Tweet.belongsTo(User, { as: "User", foreignKey: "userId" });
}
//Find All Users
async function getAllUsers(){
    const users = await User.findAll().catch(errHandler);
    return users;
}

module.exports = {
    getAllUsers : getAllUsers
};