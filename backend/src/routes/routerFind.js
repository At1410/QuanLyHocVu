const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/tim-kiem/nhan-vien', (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Thiếu từ khóa tìm kiếm' });
    }

    const sql = 'SELECT * FROM nhanvien WHERE Ten_Nhan_Vien LIKE ?';
    const values = [`%${query}%`];

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Server error: ', details: err.message });
        }

        res.json(results);
    });
});


router.get('/tim-kiem/thong-tin', (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Thiếu từ khóa tìm kiếm' });
    }

    const sql = 'SELECT * FROM thongtin WHERE TenDM LIKE ?';
    const values = [`%${query}%`];

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Server error: ', details: err.message });
        }

        res.json(results);
    });
});

module.exports = router;