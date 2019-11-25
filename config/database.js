const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Seungmin20*',
    database: 'minigame'
});

connection.connect();

module.exports = connection;