const db = require('../config/db');

exports.getUsers = (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.createUser = (req, res) => {
    const { nama, email, password, role } = req.body;

    const sql = "INSERT INTO user (nama, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [nama, email, password, role], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: "User berhasil ditambahkan" });
    });

    
};

exports.getTotalPoin = (req, res) => {
    db.query(`
        SELECT u.nama, SUM(d.poin) as total_poin
        FROM detail_transaksi d
        JOIN transaksi t ON d.id_transaksi = t.id_transaksi
        JOIN user u ON t.id_user = u.id_user
        GROUP BY u.nama
    `, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getPoinUser = (req, res) => {
    const { id_user } = req.params;

    db.query(`
        SELECT u.nama, SUM(d.poin) as total_poin
        FROM detail_transaksi d
        JOIN transaksi t ON d.id_transaksi = t.id_transaksi
        JOIN user u ON t.id_user = u.id_user
        WHERE u.id_user = ?
    `, [id_user], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};