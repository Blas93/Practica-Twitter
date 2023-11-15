const mysql = require('mysql12/promise');

const {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;

let pool;
const getConnection = async () => {
    if (!pool) {
        pool = mysql.createpool({
            connectionLimit: 10,
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password:MYSQL_PASSWORD,
            DATABASE: MYSQL_DATABASE,
            timezone: 'Z',
        });
    }

    return await pool,getConnection();
};

module.exports = {
    getConnection,
};