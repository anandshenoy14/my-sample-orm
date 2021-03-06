/* src/bootstrap.js */
//Export a default function (we use Async/Await)
const Tweet = require("./models/tweets");
const User = require("./models/users");
const chalk = require('chalk');
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

//Generic Error Handler 
const errHandler = err => {
    //Catch and log any error.
    console.error(chalk.red("Error: ", err));
};
//Find All Users
async function getAllUsers(){
    const users = await User.findAll().catch(errHandler);
    return users;
}
//Find User based on params
async function getUser(parameters){
    const username = parameters.username;
    const user = await User.findOne({where : {
        username : {
            [Op.like] : `%${username}%`
        }
    }})
    return user;
}
module.exports = {
    getAllUsers : getAllUsers,
    getUser : getUser
};