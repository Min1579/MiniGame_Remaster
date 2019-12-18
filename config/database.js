const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Seungmin20*',
    database: 'minigame'
});

module.exports = pool;