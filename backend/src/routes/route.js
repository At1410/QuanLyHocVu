// routes.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Route GET /
router.get('/', (req, res) => {
    db.query('SELECT * FROM thongtin', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/teacher', (req, res) => {
    db.query('SELECT * FROM `nhanvien` nv JOIN chucvu cv ON nv.Chuc_vu_id = cv.id', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/loai', (req, res) => {
    db.query('SELECT * FROM loai', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

module.exports = router;
