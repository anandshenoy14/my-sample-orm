//DEPS
const express = require("express");
const chalk = require("chalk")
const app = express();
const bodyParser = require('body-parser');
//connection
const dbConnection = require("./src/db/connection")
//CRUD
const dbCreate = require('./src/db/insert');
const dbReader = require('./src/db/read');
const dbUpdate = require('./src/db/update');
const dbDelete = require('./src/db/delete');

app.use(bodyParser.json());
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.post('/api/db/user', (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    dbCreate.createUser(username, pwd).then(user => {
        console.log(chalk.blue(`Username from request ${username} was created successfully`));
        res.send(`User with username : ${user.get('username')} got created`);
    }).catch(err => {
        console.log(chalk.red('Error Occured : While User Creation'))
    })
})
app.get('/api/db/users', (req, res) => {
    dbReader.getAllUsers().then(users => {
        res.send({
            "users": users
        })
    }).catch(err => {
        console.log(chalk.red('Error Occured : While Users Get '+err))
    })
})

app.get('/api/db/user', (req,res)=>{
    const parameters = {
        username : req.query.username
    }
    dbReader.getUser(parameters).then(user=>{
        res.send(user)
    }).catch(err=>{
        console.log(chalk.red('Error Occured : While Users Get '+err))
    })
})
app.patch('/api/db/user', (req,res)=>{
    const parameters = {
        username : req.body.username,
        password : req.body.password
    }
    dbUpdate.updateUser(parameters).then(user=>{
        res.send(user)
    }).catch(err=>{
        console.log(chalk.red('Error Occured : While Users Update '+err))
    })
})
app.delete('/api/db/user', (req,res)=>{
    const parameters = {
        username : req.body.username
    }
    dbDelete.deleteUser(parameters).then(usersDeleted=>{
        res.send(`Number of Users Deleted ${usersDeleted}`)
    }).catch(err=>{
        console.log(chalk.red('Error Occured : While Users Delete '+err))
    })
})
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;