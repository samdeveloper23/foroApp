
const intro = async (req, res, next) => {
    try {
        res.send({
            status: 'ok',
            data: 'Bienvenido',
        })
    } catch (err) {
        next(err);
    }
};

module.exports = intro;