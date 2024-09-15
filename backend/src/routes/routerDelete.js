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

router.delete('/suc-khoe/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM suckhoe WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Deleted record with ID: ${id}`);
    });
});

module.exports = router;