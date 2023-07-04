const mysql = require('mysql2/promise');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let pool;

const getDB = async () => {
    try {
        if (!pool) {
            const db = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                timezone: 'Z',
                ssl: {
                    rejectUnauthorized: false
                },
            });

            pool = mysql.createPool({
                connectionLimit: 10,
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME,
                timezone: 'Z',
                ssl: {
                    rejectUnauthorized: false
                },
            });
        }

        return await pool.getConnection();
    } catch (err) {
        console.log(err);
    }
}

module.exports = getDB;