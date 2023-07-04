const selectUserQuery = require("../../models/usersQuery/selectUserQuery");
const { generateError } = require("../../services/errors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            generateError('No te olbidas de algo?', 400);
        }

        const user = await selectUserQuery(username);

        const validationPass = await bcrypt.compare(password, user.password);

        if (!validationPass) {
            generateError('Compi, contraseña incorrecta', 401);
        }

        const infoToken = {
            id: user.id,
            username
        };

        const token = jwt.sign(infoToken, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.send({
            status: 'ok',
            data: {
                token,
                infoToken,
            },
        });

    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;