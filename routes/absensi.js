const express = require('express');
const router = express.Router();
const absensiController = require('../controllers/absensiController');
const multer = require('multer');
const path = require('path');



// GET semua absensi
router.get('/', absensiController.getAllAbsensi);

const upload = require('../middlewares/upload'); // middleware multer
// POST absensi baru dengan upload foto
router.post('/', upload.single('foto_bukti'), absensiController.createAbsensi);
router.get('/parents/:parentId', absensiController.getAbsensiByParent);

module.exports = router;
