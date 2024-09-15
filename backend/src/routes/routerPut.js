const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.put('/thong-tin/:id', (req, res) => {
    const { id } = req.params;
    const { TenDM, NoiDung } = req.body;
    const query = 'UPDATE thongtin SET TenDM =?, NoiDung =? WHERE id =?';

    db.query(query, [TenDM, NoiDung, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ success: true, data: result });
    });
});

router.put('/lop/:id', (req, res) => {
    const { id } = req.params;
    const { Ten_lop, Ngay_DB, Ngay_KT, Loai_id } = req.body;
    const query = 'UPDATE lop SET Ten_lop =?, Ngay_DB =?, Ngay_KT=?, Loai_id=?  WHERE id =?';

    db.query(query, [Ten_lop, Ngay_DB, Ngay_KT, Loai_id, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ success: true, data: result });
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


router.put('/tre-em/:id', (req, res) => {
    const { id } = req.params;
    const { Ten_tre, Gioi_tinh, Ngay_sinh, Lop_id, Suc_khoe } = req.body;
    const query = 'UPDATE treem SET Ten_tre = ?, Gioi_tinh = ?, Ngay_sinh = ?, Lop_id = ?, Suc_khoe = ? WHERE id = ?';

    db.query(query, [Ten_tre, Gioi_tinh, Ngay_sinh, Lop_id, Suc_khoe, id], (err, result) => {
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

router.put('/danh_dau/:id', (req, res) => {
    const { id } = req.params;
    const { Danh_dau } = req.body;

    const query = 'UPDATE phieuDK SET Danh_dau = ? WHERE id = ?';
    db.query(query, [Danh_dau, id], (error, results) => {
        if (error) {
            console.error('Error updating status:', error);
            return res.status(500).send('Error updating status');
        }

        res.send('Status updated successfully');
    });
});

router.put('/trang-thai-tre/:id', (req, res) => {
    const { id } = req.params;
    const { Trang_thai } = req.body;

    const query = 'UPDATE treem SET Trang_thai = ? WHERE id = ?';
    db.query(query, [Trang_thai, id], (error, results) => {
        if (error) {
            console.error('Error updating status:', error);
            return res.status(500).send('Error updating status');
        }

        res.send('Status updated successfully');
    });
});

router.put('/trang-thai-lop/:id', (req, res) => {
    const { id } = req.params;
    const { trang_thai } = req.body;

    const query = 'UPDATE lop SET trang_thai = ? WHERE id = ?';
    db.query(query, [trang_thai, id], (error, results) => {
        if (error) {
            console.error('Error updating status:', error);
            return res.status(500).send('Error updating status');
        }

        res.send('Status updated successfully');
    });
});

router.put('/ID-lop/:id', (req, res) => {
    const { id } = req.params;
    const { Lop_id } = req.body;

    const query = 'UPDATE treem SET Lop_id = ? WHERE id = ?';
    db.query(query, [Lop_id, id], (error, results) => {
        if (error) {
            console.error('Error updating status:', error);
            return res.status(500).send('Error updating status');
        }

        res.send('Status updated successfully');
    });
});

router.put('/cn-id-lop-trong-tre/:id', (req, res) => {
    const { id } = req.params;
    const { Lop_id } = req.body;
    const query = 'UPDATE treem SET Lop_id = NULL WHERE Lop_id = ?';
    db.query(query, [Lop_id, id], (error, results) => {
        if (error) {
            console.error('Error updating Lop_id:', error);
            return res.status(500).send('Error updating Lop_id');
        }
        res.send('Lop_id updated to NULL successfully');
    });
});

router.put('/cn-id-lop-trong-nv/:id', (req, res) => {
    const { id } = req.params;
    const { Lop_id } = req.body;
    const query = 'UPDATE nhanvien SET Lop_id = NULL WHERE Lop_id = ?';
    db.query(query, [Lop_id, id], (error, results) => {
        if (error) {
            console.error('Error updating Lop_id:', error);
            return res.status(500).send('Error updating Lop_id');
        }
        res.send('Lop_id updated to NULL successfully');
    });
});

module.exports = router;