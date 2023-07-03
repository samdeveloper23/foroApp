const Publication = require('../models/publicationsModel');
const User = require('../models/userModel');

const getPublications = async (req, res, next) => {
    try {
        // Realiza una consulta para obtener las publicaciones con la información del usuario
        const publications = await Publication.findAll({
            include: [{ model: User, attributes: ['username'] }], // Incluye el modelo User en la consulta y selecciona solo la columna 'name'
        });

        // Verifica si hay publicaciones
        if (publications.length === 0) {
            // No hay publicaciones disponibles, devuelve una respuesta vacía o un mensaje apropiado
            return res.status(200).json([]);
        }

        // Hay publicaciones, devuelve las publicaciones con la información del usuario
        return res.status(200).json(publications);
    } catch (error) {
        // Maneja el error de forma adecuada
        next(error);
    }
};

module.exports = {
    getPublications,
};
