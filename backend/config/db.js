const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'milos_db'
});

db.connect((err) => {
    if (err) {
        console.log('Database gagal konek:', err);
    } else {
        console.log('Database terkoneksi!');
    }
});

module.exports = db;