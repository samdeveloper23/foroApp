const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../services/errors');

const insertUserQuery = async (
    username,
    password,
) => {
    let connection;

    try {
        connection = await getDB();

        let [users] = await connection.query(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        );

        if (users.length > 0) {
            generateError('Usuario ya registrado, te pille hahha', 403);
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await connection.query(
            `INSERT INTO users (username, password, createdAt) VALUES( ?, ?, ?)`,
            [username, hashedPass, new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;