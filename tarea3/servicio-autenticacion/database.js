const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const dotenv = require('dotenv');

dotenv.config();

const initDatabase = async () => {
  try {
    const db = await open({
      filename: ':memory:',
      driver: sqlite3.Database,
    });

    // Configuración de la base de datos, como la creación de tablas
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT UNIQUE,
        phoneNumber TEXT
      );
    `);

    console.log('Base de datos en memoria inicializada correctamente');
    
    return db;
  } catch (error) {
    console.error('Error al inicializar la base de datos en memoria:', error.message);
    throw error;
  }
};

module.exports = { initDatabase };
