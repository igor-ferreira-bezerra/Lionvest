const router = require("express").Router();
const connection = require('../services/db');
const { request, response } = require("express");


router.get('/', (request, response) => {
    response.render('index.html');
});

//Router '/about' About
router.get('/about', (request, response) => {
    response.render('./home/about.html');
});

//Router '/investment' Investiment
router.get('/investment', (request, response) => {
    response.render('./home/investment.html')
})

//Router '/news' News
router.get('/news', (request, response) => {
    connection.query('select * from post_news', (error, results, fields) => {
        if (error) console.log(error);
        const post_news = results;
        response.render('./home/news.html', { post_news });
    });
});

//Router '/simulator' Simulator
router.get('/simulator', (request, response) => {
    response.render('./home/simulator.html');
});

router.get('/support', (request, response) => {
    response.render('./home/support.html')
});

//Router '/login' Login
router.get('/login', (request, response) => {
    response.render('./login/login.html')
});

//Router '/forgot_pwd' Forgot Password
router.get('/forgot_pwd', (request, response) => {
    let type = 'senha';
    response.render('./login/forgot.html', { type });
});

//Router '/forgot_pwd' Forgot Signature
router.get('/forgot_sgt', (request, response) => {
    let type = 'assinatura';
    response.render('./login/forgot.html', { type });
});

//Router '/register' Register
router.get('/register', (request, response) => {
    response.render('./register/register.html');
});

//Router '/register_data' Register Data
router.post('/register_data', (require, response) => {
    let nome = require.body.nome;
    let email = require.body.email;
    let cpf = require.body.cpf;
    let data_nascimento = require.body.data_nascimento;
    let action = '/register_pwd';
    let dados = { nome, email, cpf, data_nascimento, action };
    response.render('./register/register_pwd.html', { dados });
});

//Router '/register_pwd' Register Password
router.post('/register_pwd', (require, response) => {
    let nome = require.body.nome;
    let email = require.body.email;
    let cpf = require.body.cpf;
    let data_nascimento = require.body.data_nascimento;
    let senha = require.body.senha;
    let assinatura = require.body.assinatura;
    let values = [nome, email, cpf, data_nascimento, senha, assinatura];
    let query = `insert into cliente value (null,?,?,?,?,MD5(?),MD5(?));`;
    connection.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            response.render('./login/login.html');
        }
    });
});

//Router '/auth' Autetication 
router.post('/auth', (require, response) => {
    var cpf = require.body.cpf;
    var password = require.body.password;
    connection.query("select * from cliente where cpf = ? and senha = MD5(?)", [cpf, password],
        function (error, results, fields) {
            if (error) {
                console.log(error)
            } else {
                if (results.length > 0) {
                    let name = results[0].nome;
                    response.render('./investments/graphic.html', { name });
                } else {
                    response.render('./login/login.html')
                }
            }
        });
});

//Router '/check_forgot' Check Forgot 
router.post('/check_forgot', (require, response) => {
    let cpf = require.body.cpf;
    let email = require.body.email;
    let type = require.body.type;
    let action = '/register_only';
    let dados = { cpf, action };
    let query = `select * from cliente where cpf = ? and email = ?;`;
    connection.query(query, [cpf, email],
        function (error, results, fields) {
            if (error) {
                console.log(error)
            } else {
                if (results.length > 0) {
                    response.render('./register/register_pwd.html', { dados })
                } else {
                    response.render('./login/forgot.html', { type });
                }
            }
        });
});

//Router '/regiter_only' Register only Password or Subscription
router.post('/register_only', (require, response) => {
    let cpf = require.body.cpf;
    let senha = require.body.senha;
    let assinatura = require.body.assinatura;
    let values = [senha, assinatura, cpf];
    let query = `update cliente set senha = MD5(?), assinatura = MD5(?) where cpf = ?;`;
    connection.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            response.render('./login/login.html');
        }
    });
});


module.exports = router;