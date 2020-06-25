const mysql = require('mysql');

//Connect database 
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root_dev',
    password: '123456',
    database: 'lionvest',
});
/*
connection.connect(function (err) {
    if (err) console.log(err)
    else console.log("Database Connect")
}); */
//Export connection this database
module.exports = connection;