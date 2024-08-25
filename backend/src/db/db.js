const MySQL = require('mysql2');

const connection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '14102003',
    database: 'babyhouse'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = connection;