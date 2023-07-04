const { generateError } = require('../../services/errors');
const insertUserQuery = require('../../models/usersQuery/insertUserQuery');

const newUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            generateError('Ubs, falta campos haha', 400);
        }

        await insertUserQuery(
            username,
            password,
        );

        res.send({
            status: 'ok',
            message: 'usuario creado'
        });

    } catch (err) {
        next(err);
    }
};

module.exports = newUser;
