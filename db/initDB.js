require('dotenv').config();

const {getConnection} = require('./db');

async function main() {
let connection;

try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query ('DROP TABLE IF EXIST tweets');
    await connection.query ('DROP TABLE IF EXIST users ');

    console.log('Creando tablas');

    await connection.query(`
    CREATE TABLE users (
        id INTEGET PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `);

    await connection.query(`
    CREATE TABLE tweets (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        text VARCHAR(250) NOT NULL,
        image VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREING KEY (user_id) REFERENCES user(id)
    );
    `);
} catch(error){
    console.error(error);
} finally {
    if (connection) connection.release();
    process.exit();
    }
}


main();