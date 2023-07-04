require('dotenv').config();
const mysql = require('mysql2/promise');

const createTables = async () => {
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false
    }
  };

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    console.log('Borrando tablas...');

    await connection.query('DROP TABLE IF EXISTS gilipolleces');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas...');

    // Resto del código para crear las tablas...
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS gilipolleces (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      gili VARCHAR(250) NOT NULL,
      userId INT UNSIGNED NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
