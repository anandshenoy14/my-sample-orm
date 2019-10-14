//DEPS
const express = require("express");
const chalk = require("chalk")
const app = express();
const bodyParser = require('body-parser');
//connection
const dbConnection = require("./src/db/connection")
const userRouter = require("./src/routes/users");

app.use(bodyParser.json());
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use('/api/db/users',userRouter);
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;