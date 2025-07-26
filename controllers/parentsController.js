const db = require('../models/db'); // ✅ BENAR (relatif dari controller)

// GET all parents
exports.getAllParents = (req, res) => {
  db.query('SELECT * FROM parents', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET parent by ID
exports.getParentById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM parents WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Parent not found' });
    res.json(results[0]);
  });
};

// CREATE parent
exports.createParent = (req, res) => {
  const { name, phone, address } = req.body;
  db.query(
    'INSERT INTO parents (name, phone, address) VALUES (?, ?, ?)',
    [name, phone, address],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Parent created', parentId: result.insertId });
    }
  );
};

// UPDATE parent
exports.updateParent = (req, res) => {
  const id = req.params.id;
  const { name, phone, address } = req.body;
  db.query(
    'UPDATE parents SET name = ?, phone = ?, address = ? WHERE id = ?',
    [name, phone, address, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Parent updated' });
    }
  );
};

// DELETE parent
exports.deleteParent = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM parents WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Parent deleted' });
  });
};
