const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET (INI WAJIB ADA)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM komentar_saran ORDER BY id_komentar DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("ERROR GET:", err);
      return res.status(500).json(err);
    }

    console.log("DATA DB:", result); // 🔥 DEBUG
    res.json(result);
  });
});

// ✅ POST
router.post("/", (req, res) => {
  console.log("DATA MASUK:", req.body);

  const { nama_pengirim, isi_komentar } = req.body;

  const sql = `
    INSERT INTO komentar_saran 
    (nama_pengirim, isi_komentar, tanggal_kirim, status_baca)
    VALUES (?, ?, NOW(), 0)
  `;

  db.query(sql, [nama_pengirim, isi_komentar], (err, result) => {
    if (err) {
      console.log("ERROR DB:", err);
      return res.status(500).json(err);
    }

    console.log("BERHASIL INSERT:", result.insertId); // 🔥 penting
    res.json({ message: "OK" });
  });
});

// ✅ DELETE (biar tombol hapus jalan)
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM komentar_saran WHERE id_komentar = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.log("ERROR DELETE:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Deleted" });
  });
});

module.exports = router;