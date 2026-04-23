const db = require('../config/db');

// 🔹 BUAT TRANSAKSI
exports.createTransaksi = (req, res) => {
    const { id_user, id_pengurus, metode } = req.body;

    const sql = `
    INSERT INTO transaksi (id_user, id_pengurus, tanggal, status, metode)
    VALUES (?, ?, NOW(), 'pending', ?)
    `;

    db.query(sql, [id_user, id_pengurus, metode], (err, result) => {
        if (err) return res.json(err);

        res.json({
            message: "Transaksi berhasil dibuat",
            id_transaksi: result.insertId
        });
    });
};

// 🔹 TAMBAH DETAIL + HITUNG POIN
exports.tambahDetail = (req, res) => {
    const { id_transaksi, id_jenis, berat } = req.body;

    const getPoin = "SELECT poin_per_kg FROM jenis_sampah WHERE id_jenis = ?";

    db.query(getPoin, [id_jenis], (err, result) => {
        if (err) return res.json(err);

        if (!result || result.length === 0) {
    return res.json({ error: "Jenis sampah tidak ditemukan" });
}

        const poin_per_kg = result[0].poin_per_kg;
        const total_poin = berat * poin_per_kg;

        const insert = `
        INSERT INTO detail_transaksi (id_transaksi, id_jenis, berat, poin)
        VALUES (?, ?, ?, ?)
        `;

        db.query(insert, [id_transaksi, id_jenis, berat, total_poin], (err2) => {
            if (err2) return res.json(err2);

            res.json({
                message: "Detail berhasil ditambahkan",
                poin: total_poin
            });
        });
    });
};


// 🔹 LIHAT TRANSAKSI
exports.getTransaksi = (req, res) => {
    db.query(`
        SELECT t.id_transaksi, u.nama, t.tanggal, t.status, t.metode
        FROM transaksi t
        JOIN user u ON t.id_user = u.id_user
    `, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};