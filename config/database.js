const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    port: 3306,
    user: 'b0115c6bec9292',
    password: 'fb148cef',
    database: 'heroku_121397ed296abf5'
});

connection.connect();

module.exports = connection;