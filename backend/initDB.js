require('dotenv').config();
const mysql = require('mysql2/promise');

const createTables = async () => {
  const dbConfig = {
    host: "aws.connect.psdb.cloud",
    user: "orj0wm5sgb2jbcr49qm9",
    password: "pscale_pw_qz3852S93fQoPTEZYO1ubKG612c5jJFjF7WNVp0Uzy0",
    database: "developersam23",
    ssl: {
      rejectUnauthorized: false
    }
  };

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    console.log('Borrando tablas...');

    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS publications');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas...');

    // Resto del código para crear las tablas...
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
    CREATE TABLE IF NOT EXISTS publications (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) DEFAULT NULL,
      content TEXT,
      userId INT UNSIGNED NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      content TEXT NOT NULL,
      postId INT UNSIGNED NOT NULL,
      userId INT UNSIGNED NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
