require('dotenv').config();

const MySQL = require('mysql2');

const connection = MySQL.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '14102003',
    database: process.env.DB_NAME || 'babyhouse'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = connection;
