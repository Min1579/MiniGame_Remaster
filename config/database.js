const mysql = require('mysql2');

const pool = mysql.createPool({
    // host: 'us-cdbr-iron-east-05.cleardb.net',
    // port: 3306,
    // user: 'b0115c6bec9292',
    // password: 'fb148cef',
    // database: 'heroku_121397ed296abf5'
    port : 3306,
    user : 'root',
    password : 'mypass',
    database : 'minigame'
});


module.exports = pool;