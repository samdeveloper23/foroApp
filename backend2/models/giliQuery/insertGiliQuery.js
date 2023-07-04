const getDB = require("../../db/getDB");

const insertGiliQuery = async (gili, userId) => {
    let connection;

    try {
        connection = await getDB();

        const createdAt = new Date();

        await connection.query(
            `INSERT INTO gilipolleces( gili, createdAt, userId) VALUES( ?, ?, ?)`,
            [gili, createdAt, userId]
        );


        return {
            gili,
            userId,
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertGiliQuery;
