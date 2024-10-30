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

router.get('/tai-khoan/:idTre', (req, res) => {
    const { idTre } = req.params;
    const query = `
        select em.id, ph.Sdt
        from babyhouse.treem em 
        join babyhouse.phuhuynh ph on em.PH_id = ph.id_PH
        where em.id = ?;
    `;

    db.query(query, [idTre], (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/dk-nghi-hoc', (req, res) => {
    const query = `
        SELECT donnh.*, treem.Ten_tre, treem.Ngay_sinh
        FROM babyhouse.donnh
        JOIN babyhouse.treem ON donnh.id_tre = treem.id;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/thong-ke', (req, res) => {
    const query = `
        select l.Ten_lop, l.Ngay_DB, l.Ngay_KT, tg.id_lop, tg.id_treem
        from babyhouse.lop l
        join babyhouse.thamgia tg on l.id = tg.id_lop
        where l.trang_thai = 1; 
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/Max-tre-lop/:idLop', (req, res) => {
    const { idLop } = req.params;
    const query = `
        SELECT l.id AS id_lop, COALESCE(COUNT(tg.id_lop), 0) AS SL_HT, loai.So_luong
        FROM babyhouse.lop l
        LEFT JOIN babyhouse.thamgia tg ON l.id = tg.id_lop
        LEFT JOIN babyhouse.treem em ON em.id = tg.id_treem
        JOIN babyhouse.loai loai ON l.Loai_id = loai.id
        WHERE l.trang_thai = 1 AND l.id = ?
        GROUP BY l.id, loai.So_luong;
    `;
    db.query(query, [idLop], (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/Max-GV-lop/:idLop', (req, res) => {
    const { idLop } = req.params;
    const query = `
        SELECT l.id AS id_Lop, COALESCE(COUNT(gd.id_Lop), 0) AS SL_GV, loai.SL_giaovien
        FROM babyhouse.lop l
        LEFT JOIN babyhouse.giangday gd ON l.id = gd.id_Lop
        LEFT JOIN babyhouse.nhanvien nv ON nv.id = gd.id_GV
        JOIN babyhouse.loai loai ON l.Loai_id = loai.id
        WHERE l.trang_thai = 1 AND l.id = ?
        GROUP BY l.id, loai.SL_giaovien;
    `;
    db.query(query, [idLop], (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send('Có lỗi xảy ra!');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});


module.exports = router;
