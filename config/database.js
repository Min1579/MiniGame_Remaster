const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    port: 3306,
    user: 'b591c460fb7aa2',
    password: '1714412a',
    database: 'heroku_0d58aebdfff05c1'
});

module.exports = pool;