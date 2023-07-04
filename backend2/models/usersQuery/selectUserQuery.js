const getDB = require("../../db/getDB");
const { generateError } = require("../../services/errors");

const selectUserQuery = async (username) => {
    let connection;

    try {
        connection = await getDB();

        const [users] = await connection.query(
            `SELECT id, password FROM users WHERE username = ?`,
            [username]
        );

        if (users.length < 1) {
            generateError('Registrate primero anda', 404);
        }

        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserQuery;