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

//Router '/auth' Autetication 
router.post('/auth', (require, response) => {
    var cpf = require.body.cpf;
    var password = require.body.password;
    console.log(cpf, password);
    if (cpf && password) {
        connection.query("select * from cliente where cpf = ? and aes_decrypt(senha,'chave') = ?", [cpf, password],
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

router.post('/register_data', (require, response) => {
    let nome = require.body.nome;
    let email = require.body.email;
    let cpf = require.body.cpf;
    let data_nascimento = require.body.data_nascimento;
    let dados = { nome, email, cpf, data_nascimento };
    response.render('./register/register_pwd.html', { dados });
});

router.post('/register_pwd', (require, response) => {
    let nome = require.body.nome;
    let email = require.body.email;
    let cpf = require.body.cpf;
    let data_nascimento = require.body.data_nascimento;
    let senha = require.body.senha;
    let assinatura = require.body.assinatura;
    let values = { nome, email, cpf, data_nascimento, senha, assinatura };
    let query = 'insert into cliente value (null,?,?,?,?,MD5(?),?)';
    /*connection.query(query, values, (err, result) => {
        if (err) {
            response.render('/register');
            console.log(err)
        } else {
            console.log('ok')
        }
    }) */
});

//Router '/sign_up' Sign_up in db
router.post('/sign_up', function (require, response) {
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

module.exports = router;