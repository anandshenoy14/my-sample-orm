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

/**
 *
 *
 * @param {*} name
 * @param {*} password
 * @returns user object
 */
async function createUser(name, password) {
    const user = await User.create({
        username: name,
        passwd: password
    }).catch(errHandler);
    return user;
}
/**
 *
 *
 * @param {*} content
 * @param {*} userid
 */
async function createTweet(content, userid) {
    const tweet = await Tweet.create({
        content: content,
        userId: userid
    }).catch(errHandler);
}
module.exports = {
    createTweet: createTweet,
    createUser: createUser
};