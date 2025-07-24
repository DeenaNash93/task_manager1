const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // אם יש לך סיסמה, שימי אותה כאן
    database: 'task_manager_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = { pool };
