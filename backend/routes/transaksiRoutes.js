const express = require('express');
const router = express.Router();

const transaksiController = require('../controllers/transaksiController');

// endpoint
router.post('/transaksi', transaksiController.createTransaksi);
router.post('/detail', transaksiController.tambahDetail);
router.get('/transaksi', transaksiController.getTransaksi);
router.get('/waste-types', transaksiController.getWasteTypes);


module.exports = router;
