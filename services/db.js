const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'sense_motion'
});

/*connection.connect(function (err) {
    if (err) console.log(err)
    else console.log("Database Connect")
});
 */
module.exports = connection;