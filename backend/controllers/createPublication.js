const Publication = require('../models/publicationsModel')

const createPublication = async (req, res, next) => {
    try {
        const { content, userId } = req.body;

        // Crea una nueva publicación en la base de datos
        const publication = await Publication.create({ content, userId });

        // Devuelve la publicación creada en la respuesta
        return res.status(201).json(publication);
    } catch (error) {
        // Maneja el error de forma adecuada
        next(error);
    }
};
module.exports = {
    createPublication,
};  