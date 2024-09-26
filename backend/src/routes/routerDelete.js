const express = require('express');
const router = express.Router();
const db = require('../db/db');

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
    const sql = 'DELETE FROM nhanvien WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Deleted record with ID: ${id}`);
    });
});

router.delete('/phieudk/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM phieudk WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Deleted record with ID: ${id}`);
    });
});

router.delete('/lop/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM lop WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Deleted record with ID: ${id}`);
    });
});

router.delete('/tre-em/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM treem WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Deleted record with ID: ${id}`);
    });
});

router.delete('/phu-huynh/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM phuhuynh WHERE id_PH = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Deleted record with ID: ${id}`);
    });
});

router.delete('/tham-gia/:id_lop/:id_treem', (req, res) => {
    const { id_lop, id_treem } = req.params;

    const sql = 'DELETE FROM thamgia WHERE id_lop = ? AND id_treem = ?';

    db.query(sql, [id_lop, id_treem], (err, result) => {

        if (err) {
            console.error('Có lỗi xảy ra:', err);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa dữ liệu', error: err });
        }

        res.status(200).json({ message: 'Xóa thành công!' });
    });
});

router.delete('/giang-day/:id_Lop/:id_GV', (req, res) => {
    const { id_Lop, id_GV } = req.params;

    const sql = 'DELETE FROM giangday WHERE id_Lop = ? AND id_GV = ?';

    db.query(sql, [id_Lop, id_GV], (err, result) => {

        if (err) {
            console.error('Có lỗi xảy ra:', err);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa dữ liệu', error: err });
        }

        res.status(200).json({ message: 'Xóa thành công!' });
    });
});

module.exports = router;