require('dotenv').config();
const mysql = require('mysql2/promise');

const createTables = async () => {
    const dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };

    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        console.log('Borrando tablas...');

        await connection.query('DROP TABLE IF EXISTS posts');
        await connection.query('DROP TABLE IF EXISTS comments');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

        await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        userId INT UNSIGNED NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

        await connection.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        content TEXT NOT NULL,
        postId INT UNSIGNED NOT NULL,
        userId INT UNSIGNED NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (postId) REFERENCES posts(id),
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

        console.log('¡Tablas creadas!');
    } catch (error) {
        console.error('Error al crear las tablas:', error);
    } finally {
        if (connection) {
            connection.end();
        }

        process.exit();
    }
};

createTables();
