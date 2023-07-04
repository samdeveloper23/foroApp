const getDB = require("../db/getDB");
const { generateError } = require("../services/errors");

const userExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [req.user.id]
        );

        if (users.length < 1) {
            generateError('anda, si resulta que no existes, yo me prantearia la existencia la verdad', 404);
        }

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;