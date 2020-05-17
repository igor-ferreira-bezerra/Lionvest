const connection = require('./services/db');
const request_bot = require('./services/bot_news');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

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

//Routers express
//Router '/' Nome
app.get('/', (request, response) => {
    response.render('./home/index.html');
});

//Router '/news' News
app.get('/news', (request, response) => {
    connection.query('select * from post_news', (error, results, fields) => {
        const post_news = results;
        response.render('./home/news.html', { post_news });
    });
});

//Router '/simulator' Simulator
app.get('/simulator', (request, response) => {
    response.render('./home/simulator.html');
});

//Router '/login' Login
app.get('/login', (request, response) => {
    response.render('./home/login.html')
});

//Router '/register' Register
app.get('/register', (request, response) => {
    response.render('./register/register.html');
});

//Router '/auth' Autetication 
app.post('/auth', function (require, response) {
    var email = require.body.email;
    var password = require.body.password;
    console.log(email, password);
    if (email && password) {
        connection.query("select * from cliente where email = ? and aes_decrypt(senha,'chave') = ?", [email, password],
            function (error, results, fields) {
                console.log(results);
                if (results.length > 0) {
                    response.render('dashboard.html')
                } else {
                    response.send('Incorrect Username and/or Password!');
                }
                response.end();
            })
    }
    else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

//Router '/sign_up' Sign_up in db
app.post('/sign_up', function (require, response) {
    var user = require.body.user;
    var email = require.body.email;
    var telefone = require.body.telefone;
    var cnpj = require.body.cnpj;
    var senha = require.body.password;
    connection.query(`insert into cliente (nome,telefone,email,senha,cnpj) 
    values ('${user}','${telefone}','${email}',aes_encrypt('${senha}','chave'),'${cnpj}');`, function (error, results, fields) {
        console.log(`error: ${error}`);
        console.log(results);
        if (results) {
            response.render('dashboard.html');
        }
    })

})

//Timer for update database with data bot
setInterval(request_bot, 60000);

//App express listen port 3000
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
