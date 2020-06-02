const mysql = require('mysql');

//Connect database 
const connection = mysql.createConnection({
    host: 'mysql669.umbler.com',
    port: '41890',
    user: 'lion_root',
    password: 'Lion1234vest',
    database: 'lionvest_db',
});
/*
connection.connect(function (err) {
    if (err) console.log(err)
    else console.log("Database Connect")
}); */
//Export connection this database
module.exports = connection;