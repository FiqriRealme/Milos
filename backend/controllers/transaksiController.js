const db = require('../config/db');

const mapMetode = (metode) => {
    if (!metode) return 'Drop-off';
    const normalized = String(metode).toLowerCase();
    if (normalized === 'pickup') return 'Pickup';
    return 'Drop-off';
};

const formatTransaksiRow = (row) => ({
    id: `TRX-${String(row.id_transaksi).padStart(3, '0')}`,
    rawId: row.id_transaksi,
    userId: row.id_user,
    customerName: row.nama,
    date: row.tanggal,
    weight: Number(row.total_berat || 0),
    points: Number(row.total_poin || 0),
    status: row.status,
    method: row.metode === 'Pickup' ? 'Pickup' : 'Drop-off'
});

// BUAT TRANSAKSI
exports.createTransaksi = (req, res) => {
    const id_user = req.body.id_user || req.body.userId;
    const id_pengurus = req.body.id_pengurus || req.body.adminId || null;
    const metode = mapMetode(req.body.metode || req.body.method);

    if (!id_user) {
        return res.status(400).json({
            message: 'Field wajib: id_user/userId'
        });
    }

    const sql = `
    INSERT INTO transaksi (id_user, id_pengurus, tanggal, status, metode)
    VALUES (?, ?, NOW(), 'pending', ?)
    `;

    db.query(sql, [id_user, id_pengurus, metode], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
            message: 'Transaksi berhasil dibuat',
            id_transaksi: result.insertId,
            transactionId: result.insertId
        });
    });
};

// TAMBAH DETAIL + HITUNG POIN
exports.tambahDetail = (req, res) => {
    const id_transaksi = req.body.id_transaksi || req.body.transactionId;
    const id_jenis = req.body.id_jenis || req.body.wasteTypeId;
    const berat = Number(req.body.berat || req.body.weight || 0);

    if (!id_transaksi || !id_jenis || !berat) {
        return res.status(400).json({
            message: 'Field wajib: id_transaksi/transactionId, id_jenis/wasteTypeId, berat/weight'
        });
    }

    const getPoin = 'SELECT poin_per_kg FROM jenis_sampah WHERE id_jenis = ?';

    db.query(getPoin, [id_jenis], (err, result) => {
        if (err) return res.status(500).json(err);

        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'Jenis sampah tidak ditemukan' });
        }

        const poin_per_kg = result[0].poin_per_kg;
        const total_poin = berat * poin_per_kg;

        const insert = `
        INSERT INTO detail_transaksi (id_transaksi, id_jenis, berat, poin)
        VALUES (?, ?, ?, ?)
        `;

        db.query(insert, [id_transaksi, id_jenis, berat, total_poin], (err2) => {
            if (err2) return res.status(500).json(err2);

            res.json({
                message: 'Detail berhasil ditambahkan',
                poin: total_poin,
                points: total_poin
            });
        });
    });
};

// LIHAT TRANSAKSI
exports.getTransaksi = (req, res) => {
    const { userId } = req.query;

    const whereClause = userId ? 'WHERE t.id_user = ?' : '';
    const params = userId ? [userId] : [];

    db.query(`
        SELECT 
            t.id_transaksi,
            t.id_user,
            u.nama,
            t.tanggal,
            t.status,
            t.metode,
            COALESCE(SUM(d.berat), 0) as total_berat,
            COALESCE(SUM(d.poin), 0) as total_poin
        FROM transaksi t
        JOIN user u ON t.id_user = u.id_user
        LEFT JOIN detail_transaksi d ON d.id_transaksi = t.id_transaksi
        ${whereClause}
        GROUP BY t.id_transaksi, t.id_user, u.nama, t.tanggal, t.status, t.metode
        ORDER BY t.tanggal DESC
    `, params, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result.map(formatTransaksiRow));
    });
};

exports.getWasteTypes = (_req, res) => {
    db.query(`
        SELECT id_jenis, poin_per_kg
        FROM jenis_sampah
        ORDER BY id_jenis ASC
    `, (err, result) => {
        if (err) return res.status(500).json(err);

        const rows = result.map((row) => ({
            id: row.id_jenis,
            value: String(row.id_jenis),
            label: `Jenis #${row.id_jenis}`,
            pointsPerKg: Number(row.poin_per_kg || 0)
        }));

        res.json(rows);
    });
};