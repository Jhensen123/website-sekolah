const express = require("express");
const router = express.Router();
const db = require("../db");

// ===== GET KOMENTAR =====
router.get("/", (req, res) => {
  const sql = "SELECT * FROM komentar_saran ORDER BY id_komentar DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("ERROR GET:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal ambil data komentar"
      });
    }

    res.json({
      success: true,
      data: result || []
    });
  });
});

// ===== POST KOMENTAR =====
router.post("/", (req, res) => {
  const { nama_pengirim, isi_komentar } = req.body;

  // VALIDASI SEDERHANA
  if (!nama_pengirim || !isi_komentar) {
    return res.status(400).json({
      success: false,
      message: "Nama dan komentar wajib diisi"
    });
  }

  const sql = `
    INSERT INTO komentar_saran 
    (nama_pengirim, isi_komentar, tanggal_kirim, status_baca)
    VALUES (?, ?, NOW(), 0)
  `;

  db.query(sql, [nama_pengirim, isi_komentar], (err, result) => {
    if (err) {
      console.log("ERROR DB:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal kirim komentar"
      });
    }

    res.json({
      success: true,
      message: "Komentar berhasil dikirim",
      id: result.insertId
    });
  });
});

// ===== DELETE KOMENTAR =====
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM komentar_saran WHERE id_komentar = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log("ERROR DELETE:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal hapus komentar"
      });
    }

    res.json({
      success: true,
      message: "Komentar berhasil dihapus"
    });
  });
});

module.exports = router;