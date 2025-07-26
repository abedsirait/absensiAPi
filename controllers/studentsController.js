const db = require('../models/db'); // ✅ BENAR (relatif dari controller)

// GET all students
exports.getAllStudents = (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET student by ID
exports.getStudentById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Student not found' });
    res.json(results[0]);
  });
};

// POST create student
exports.createStudent = (req, res) => {
  const { name, nis, kelas, parent_id } = req.body;
  db.query(
    'INSERT INTO students (name, nis,kelas, parent_id) VALUES (?, ?,?, ?)',
    [name, nis, kelas, parent_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Student created', studentId: result.insertId });
    }
  );
};

// DELETE student by ID
exports.deleteStudent = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  });
};

