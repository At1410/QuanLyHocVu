const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Route GET 
router.get('/giao-vien', (req, res) => {
    db.query('SELECT nv.*, cv.Ten_chuc_vu FROM nhanvien nv JOIN chucvu cv ON nv.Chuc_vu_id = cv.id WHERE cv.id = 1', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/nhan-vien', (req, res) => {
    db.query(
        'SELECT nv.* , cv.Ten_chuc_vu FROM nhanvien nv JOIN chucvu cv ON nv.Chuc_vu_id = cv.id',
        (err, result) => {
            if (err) {
                console.log(err);
                console.log(result);
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

router.get('/lop', (req, res) => {
    db.query('SELECT * FROM lop', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/lop/:classId', (req, res) => {
    const classId = req.params.classId;

    const query = `SELECT lop.*, loai.So_luong, loai.SL_giaovien FROM lop JOIN loai ON lop.loai_id = loai.id WHERE lop.id = ?`;

    db.query(query, [classId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});


router.get('/thong-tin', (req, res) => {
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

router.get('/phu-huynh', (req, res) => {

    const query = `
        SELECT ph.*, em.id
        FROM phuhuynh ph 
        JOIN treem em ON ph.id_PH = em.PH_id
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/phieuDK', (req, res) => {
    db.query('SELECT * FROM phieudk', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/tre-em', (req, res) => {
    const query = `
        SELECT *
        FROM treem
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/lop-loai', (req, res) => {
    const query = `
        SELECT lop.*, loai.Loai_lop, loai.So_luong, loai.SL_giaovien, loai.Hoc_phi
        FROM lop
        JOIN loai ON lop.loai_id = loai.id
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/tham-gia', (req, res) => {
    const query = 'SELECT * FROM thamgia';

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        }
        console.log(result);
        res.json(result);
    });
});

router.get('/giang-day', (req, res) => {
    const query = 'SELECT * FROM giangday';

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Có lỗi xảy ra!');
        }
        console.log(result);
        res.json(result);
    });
});

module.exports = router;
