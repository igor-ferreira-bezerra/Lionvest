const mysql = require('mysql2');

//Connect database 
const connection = mysql.createConnection({
    host: 'ferreiraserver.ddns.net',
    port: '3306',
    user: 'root',
    password: 'Igorserver0401',
    database: 'lionvest',
});
/*
connection.connect(function (err) {
    if (err) console.log(err)
    else console.log("Database Connect")
}); */
//Export connection this database
module.exports = connection;