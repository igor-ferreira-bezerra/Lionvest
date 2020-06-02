const router = require("express").Router();
const connection = require('../services/db');


router.get('/', (request, response) => {
    response.render('index.html');
});

//Router '/news' News
router.get('/news', (request, response) => {
    connection.query('select * from post_news', (error, results, fields) => {
        const post_news = results;
        response.render('./home/news.html', { post_news });
    });
});

//Router '/simulator' Simulator
router.get('/simulator', (request, response) => {
    response.render('./home/simulator.html');
});

//Router '/login' Login
router.get('/login', (request, response) => {
    response.render('./login/login.html')
});

//Router '/auth' Autetication 
router.post('/auth', function (require, response) {
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


//Router '/register' Register
router.get('/register', (request, response) => {
    response.render('./register/register.html');
});

router.post('/register_data', (request, response) => {
    response.render('./register/register_pwd.html');
})

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