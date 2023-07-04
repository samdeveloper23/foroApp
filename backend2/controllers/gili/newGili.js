const insertGiliQuery = require("../../models/giliQuery/insertGiliQuery");
const { generateError } = require("../../services/errors");

const newGili = async (req, res, next) => {
    try {
        const { gili } = req.body;

        if (!gili) {
            generateError('Hey, no vas ha decir ninguna? anímate', 400);
        }

        const gilipollez = await insertGiliQuery(gili, req.user.id);

        res.send({
            gilipollez,
        })
    } catch (err) {
        next(err);
    }
};

module.exports = newGili;