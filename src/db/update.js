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
async function updateUser(parameters) {
    const user = await User.update({
        passwd: parameters.password
    }, {
        where: {
            username: {
                [Op.like]: `%${parameters.username}%`
            }
        }
    }).catch(errHandler)
    return user
}
module.exports = {
    updateUser: updateUser
};