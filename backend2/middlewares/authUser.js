const jwt = require('jsonwebtoken');
const { generateError } = require('../services/errors');

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            generateError('Ha donde vas tan rapido? y la autorización?', 401);
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch {
            generateError('Token invalido, anda pirate', 401);
        }

        req.user = tokenInfo;
        next()
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;