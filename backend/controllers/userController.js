const db = require('../config/db');

const normalizeRole = (role) => {
    if (role === 'admin' || role === 'nasabah') return role;
    return 'nasabah';
};

const mapUserRow = (row) => ({
    id: row.id_user ?? row.id ?? null,
    name: row.nama ?? row.name ?? '',
    email: row.email ?? '',
    role: row.role ?? 'nasabah',
    phone: row.phone ?? row.telepon ?? null,
    address: row.address ?? row.alamat ?? null,
    roomNumber: row.room_number ?? row.roomNumber ?? row.no_kamar ?? null,
    points: Number(row.points ?? row.poin ?? 0)
});

exports.getUsers = (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result.map(mapUserRow));
    });
};

exports.createUser = (req, res) => {
    const nama = req.body.nama || req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = normalizeRole(req.body.role);

    if (!nama || !email || !password) {
        return res.status(400).json({
            message: "Field wajib: name/nama, email, password"
        });
    }

    const checkEmailSql = "SELECT id_user FROM user WHERE email = ? LIMIT 1";
    db.query(checkEmailSql, [email], (checkErr, existingUsers) => {
        if (checkErr) return res.status(500).json(checkErr);

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: "Email sudah terdaftar"
            });
        }

        const insertSql = "INSERT INTO user (nama, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(insertSql, [nama, email, password, role], (insertErr, insertResult) => {
            if (insertErr) return res.status(500).json(insertErr);

            res.status(201).json({
                message: "User berhasil ditambahkan",
                user: {
                    id: insertResult.insertId,
                    name: nama,
                    email,
                    role,
                    phone: req.body.phone || null,
                    address: req.body.address || null,
                    points: role === 'nasabah' ? 0 : null
                }
            });
        });
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
        if (err) return res.status(500).json(err);
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
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const role = normalizeRole(req.body.role);

    if (!email || !password) {
        return res.status(400).json({
            message: "Field wajib: email, password"
        });
    }

    const sql = "SELECT * FROM user WHERE email = ? AND role = ? LIMIT 1";
    db.query(sql, [email, role], (err, result) => {
        if (err) return res.status(500).json(err);
        if (!result || result.length === 0) {
            return res.status(401).json({
                message: "Email atau role tidak sesuai"
            });
        }

        const user = result[0];
        if (user.password !== password) {
            return res.status(401).json({
                message: "Password salah"
            });
        }

        return res.json({
            message: "Login berhasil",
            user: mapUserRow(user)
        });
    });
};
