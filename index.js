const request_bot = require('./services/bot_news');
const connection = require('./services/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

//Consts for Routers
const routers = require('./routers/router');

//Configure database
connection.connect();

//Configure app express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true,
});

//Routers '/'
app.use('/', routers);
//Timer for update datdabase with data bot
//setInterval(request_bot, 60000);

setInterval(request_bot, 60000);

//App express listen port 3000
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
