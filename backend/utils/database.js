const { Sequelize } = require('sequelize');

// Configuración de la conexión con la base de datos
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

// Probar la conexión a la base de datos
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    } finally {
        sequelize.close();
    }
})();

module.exports = sequelize;


// Prueba de conexión con la base de datos
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión con la base de datos establecida correctamente');
    } catch (error) {
        console.error('No se pudo conectar con la base de datos:', error);
    }
})();

module.exports = sequelize;
