const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Route GET 
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

router.get('/giao-vien', (req, res) => {
    db.query('SELECT * FROM `nhanvien` nv JOIN chucvu cv ON nv.Chuc_vu_id = cv.id WHERE cv.id = 1', (err, result) => {
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
        'select nv.* , cv.Ten_chuc_vu from babyhouse.nhanvien nv join babyhouse.chucvu cv on nv.Chuc_vu_id = cv.id',
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

//Route DELETE
router.delete('/thong-tin/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM thongtin WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Deleted record with ID: ${id}`);
    });
});

router.delete('/nhan-vien/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const sql = 'DELETE FROM nhanvien WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Deleted record with ID: ${id}`);
    });
});

//Route POST
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
    const { Ten_Nhan_Vien, Ngay_sinh, Dia_chi, Gioi_tinh, Que_quan, Sdt, CMND, Chuc_vu_id, Lop_id, trang_thai } = req.body;

    const payload = [Ten_Nhan_Vien, Ngay_sinh, Dia_chi, Gioi_tinh, Que_quan, Sdt, CMND, Chuc_vu_id, Lop_id, trang_thai];

    const query = 'INSERT INTO nhanvien (Ten_Nhan_Vien, Ngay_sinh, Dia_chi, Gioi_tinh, Que_quan, Sdt, CMND, Chuc_vu_id, Lop_id, trang_thai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, payload, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

//Route PUT
router.put('/thong-tin/:id', (req, res) => {
    const { id } = req.params;
    const { TenDM, NoiDung } = req.body;
    const query = 'UPDATE thongtin SET TenDM =?, NoiDung =? WHERE id =?';

    db.query(query, [TenDM, NoiDung, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Updated record with ID: ${id}`);
    });
});

router.put('/nhan-vien/:id', (req, res) => {
    const { id } = req.params;
    const { Ten_Nhan_Vien, Ngay_sinh, Dia_chi, Gioi_tinh, Que_quan, Sdt, CMND, Chuc_vu_id } = req.body;
    const query = 'UPDATE nhanvien SET Ten_Nhan_Vien = ?, Ngay_sinh = ?, Dia_chi = ?, Gioi_tinh = ?, Que_quan = ?, Sdt = ?, CMND = ?, Chuc_vu_id = ? WHERE id = ?';

    db.query(query, [Ten_Nhan_Vien, Ngay_sinh, Dia_chi, Gioi_tinh, Que_quan, Sdt, CMND, Chuc_vu_id, id], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: result });
    });
});

router.put('/trang-thai/:id', (req, res) => {
    const { id } = req.params;
    const { trang_thai } = req.body;

    const query = 'UPDATE nhanvien SET trang_thai = ? WHERE id = ?';
    db.query(query, [trang_thai, id], (error, results) => {
        if (error) {
            console.error('Error updating status:', error);
            return res.status(500).send('Error updating status');
        }

        res.send('Status updated successfully');
    });
});

module.exports = router;
