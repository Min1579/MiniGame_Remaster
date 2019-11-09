const mysql = require('mysql');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'minigame',
    password : 'Seungmin20*'
});

module.exports = pool;