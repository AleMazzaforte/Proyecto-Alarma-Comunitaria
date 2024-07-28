const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10719775',
    password: '8JU5Mvr2N2',
    database: 'sql10719775',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

const promisePool = pool.promise();

module.exports = {
    pool: promisePool
};
