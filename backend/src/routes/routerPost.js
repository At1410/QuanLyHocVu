const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/dang-ky', (req, res) => {
    const { Ho_ten, Ngay_sinh_tre, Sdt, Dia_chi, Ngay_den_tham, Buoi } = req.body;
    const query = 'INSERT INTO phieudk (Ho_ten, Ngay_sinh_tre, Sdt, Dia_chi, Ngay_den_tham, Buoi) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [Ho_ten, Ngay_sinh_tre, Sdt, Dia_chi, Ngay_den_tham, Buoi], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

router.post('/thong-tin', (req, res) => {
    const { TenDM, NoiDung } = req.body;
    const query = 'INSERT INTO thongtin (TenDM, NoiDung) VALUES (?, ?)';

    db.query(query, [TenDM, NoiDung], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

router.post('/nhan-vien', (req, res) => {
    const { Ten_Nhan_Vien, Ngay_sinh, Dia_chi, Gioi_tinh, Que_quan, Sdt, CMND, Chuc_vu_id, trang_thai } = req.body;

    const payload = [Ten_Nhan_Vien, Ngay_sinh, Dia_chi, Gioi_tinh, Que_quan, Sdt, CMND, Chuc_vu_id, trang_thai];

    const query = 'INSERT INTO nhanvien (Ten_Nhan_Vien, Ngay_sinh, Dia_chi, Gioi_tinh, Que_quan, Sdt, CMND, Chuc_vu_id, trang_thai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, payload, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

router.post('/treem-phuhuynh', (req, res) => {
    const { Ten_PH, Sdt, Dia_chi, Quan_he, Ten_tre, Ngay_sinh, Gioi_tinh, Suc_khoe } = req.body;

    const queryTree = `INSERT INTO treem (Ten_tre, Ngay_sinh, Gioi_tinh, Suc_khoe) VALUES (?, ?, ?, ?)`;
    const queryphuhuynh = `INSERT INTO phuhuynh (Ten_PH, Sdt, Dia_chi, Quan_he) VALUES (?, ?, ?, ?)`;

    db.query(queryphuhuynh, [Ten_PH, Sdt, Dia_chi, Quan_he], (err, resultphuhuynh) => {
        if (err) {
            return res.status(500).send('Database queryphuhuynh error:', err);
        }

        const PH_id = resultphuhuynh.insertId;

        db.query(queryTree, [Ten_tre, Ngay_sinh, Gioi_tinh, Suc_khoe], (err, resultTree) => {
            if (err) {
                return res.status(500).send('Database queryTree error:', err);
            }

            const treemId = resultTree.insertId;

            const updateQuery = `UPDATE treem SET PH_id = ? WHERE id = ?`;

            db.query(updateQuery, [PH_id, treemId], (err, resultUpdate) => {
                if (err) {
                    return res.status(500).send('Database update error:', err);
                }

                res.json({
                    success: true,
                    data: {
                        treemResult: resultTree,
                        phuhuynhResult: resultphuhuynh,
                        updatedTreem: resultUpdate
                    }
                });
            });
        });
    });
});


router.post('/lop', (req, res) => {
    const { Ten_lop, Ngay_DB, Ngay_KT, Loai_id } = req.body;

    const payload = [Ten_lop, Ngay_DB, Ngay_KT, Loai_id];

    const query = 'INSERT INTO lop (Ten_lop, Ngay_DB, Ngay_KT, Loai_id) VALUES (?, ?, ?, ?)';

    db.query(query, payload, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

router.post('/them-tre/:id_lop/:id_treem', (req, res) => {
    const { id_lop, id_treem } = req.params;

    const payload = [id_lop, id_treem];

    const query = 'INSERT INTO thamgia (id_lop, id_treem) VALUES (?, ?)';

    db.query(query, payload, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

router.post('/giang-day/:id_Lop/:id_GV', (req, res) => {
    const { id_Lop, id_GV } = req.params;

    const payload = [id_Lop, id_GV];

    const query = 'INSERT INTO giangday (id_Lop, id_GV) VALUES (?, ?)';

    db.query(query, payload, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

router.post('/dk-nghi-hoc/:id_tre', (req, res) => {
    const { id_tre } = req.params;
    const { ngay_nghi, ngay_hoc_lai, ly_do } = req.body;

    const payload = [ngay_nghi, ngay_hoc_lai, ly_do, id_tre];

    const query = 'INSERT INTO donnh (ngay_nghi, ngay_hoc_lai, ly_do, id_tre) VALUES (?, ?, ?, ?)';

    db.query(query, payload, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

module.exports = router;
