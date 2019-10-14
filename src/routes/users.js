const express = require("express")
const router = express.Router();
const chalk = require('chalk')
//CRUD
const dbCreate = require('../db/insert');
const dbReader = require('../db/read');
const dbUpdate = require('../db/update');
const dbDelete = require('../db/delete');

router.post('/', async (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    const user = await dbCreate.createUser(username, pwd)
    res.send(`User with username : ${user.get('username')} got created`);
})
router.get('/', async (req, res) => {
    if (req.query && Object.keys(req.query).length == 0) {
        const users = await dbReader.getAllUsers()
        res.send({
            "users": users
        })
    } else {
        // for one get
        const parameters = {
            username: req.query.username
        }
        const user = await dbReader.getUser(parameters)
        res.send(user)
    }
})
router.patch('/', async (req, res) => {
    const parameters = {
        username: req.body.username,
        password: req.body.password
    }
    const rowsaffected = await dbUpdate.updateUser(parameters)
    res.send(`The updation affected ${rowsaffected[0]} rows`)
})
router.delete('/', async (req, res) => {
    const parameters = {
        username: req.body.username
    }
    const usersDeleted = await dbDelete.deleteUser(parameters)
    res.send(`Number of Users Deleted ${usersDeleted}`)
})

module.exports = router;