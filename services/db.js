const mysql = require('mysql');

//Connect database 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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