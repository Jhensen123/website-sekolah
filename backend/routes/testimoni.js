const express = require("express");
const router = express.Router(); // 🔥 INI WAJIB
const db = require("../db");

// =====================
// KIRIM TESTIMONI
// =====================
router.post("/", (req, res) => {
  const { nama, isi_testimoni } = req.body;

  const sql = `
    INSERT INTO testimoni (nama, isi_testimoni, tanggal, status_publish)
    VALUES (?, ?, NOW(), 0)
  `;

  db.query(sql, [nama, isi_testimoni], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "OK" });
  });
});

// =====================
// GET ADMIN
// =====================
router.get("/admin", (req, res) => {
  db.query("SELECT * FROM testimoni ORDER BY id_testimoni DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// =====================
// GET USER (published)
// =====================
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM testimoni WHERE status_publish = 1",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// =====================
// UPDATE STATUS (PUBLISH / BATAL)
// =====================
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const status = Number(req.body.status);

  const sql = `
    UPDATE testimoni 
    SET status_publish = ?
    WHERE id_testimoni = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "OK",
      affectedRows: result.affectedRows
    });
  });
});

module.exports = router;