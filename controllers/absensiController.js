const db = require('../models/db'); // ✅ BENAR (relatif dari controller)


exports.getAllAbsensi = (req, res) => {
  db.query(`
    SELECT a.*, s.name AS student_name FROM absensi a
    JOIN students s ON a.student_id = s.id
    ORDER BY tanggal DESC
  `, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createAbsensi = (req, res) => {
  const { student_id, tanggal, jam } = req.body;
  const foto_bukti = req.file ? req.file.filename : null;

  if (!student_id || !tanggal || !jam || !foto_bukti) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  db.query('INSERT INTO absensi SET ?', {
    student_id,
    tanggal,
    jam,
    foto_bukti
  }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Absensi berhasil disimpan', id: result.insertId });
  });
};

exports.getAbsensiByParent = (req, res) => {
  const { parentId } = req.params;

  const query = `
    SELECT a.*, s.name AS student_name 
    FROM absensi a
    JOIN students s ON a.student_id = s.id
    WHERE s.parent_id = ?
    ORDER BY a.tanggal DESC
  `;

  db.query(query, [parentId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
