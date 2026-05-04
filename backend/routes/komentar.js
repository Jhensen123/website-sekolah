const express = require("express");
const router = express.Router();
const db = require("../db");

// =====================
// 🔥 GET KOMENTAR
// =====================
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      id_komentar,
      nama_pengirim,
      isi_komentar,
      DATE_FORMAT(tanggal_kirim, '%Y-%m-%d') as tanggal_kirim,
      status_baca
    FROM komentar_saran
    ORDER BY id_komentar DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("ERROR GET:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal ambil data komentar"
      });
    }

    return res.json({
      success: true,
      data: result || []
    });
  });
});

// =====================
// 🔥 POST KOMENTAR
// =====================
router.post("/", (req, res) => {
  const { nama_pengirim, isi_komentar } = req.body;

  // VALIDASI
  if (!nama_pengirim || !isi_komentar) {
    return res.status(400).json({
      success: false,
      message: "Nama dan komentar wajib diisi"
    });
  }

  const sql = `
    INSERT INTO komentar_saran 
    (nama_pengirim, isi_komentar, tanggal_kirim, status_baca)
    VALUES (?, ?, CURDATE(), 0)
  `;

  db.query(sql, [nama_pengirim, isi_komentar], (err, result) => {
    if (err) {
      console.log("ERROR INSERT:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal kirim komentar"
      });
    }

    return res.json({
      success: true,
      message: "Komentar berhasil dikirim",
      insertId: result.insertId
    });
  });
});

// =====================
// 🔥 UPDATE STATUS (DIBACA)
// =====================
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID tidak valid"
    });
  }

  const sql = `
    UPDATE komentar_saran
    SET status_baca = 1
    WHERE id_komentar = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("ERROR UPDATE:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal update status"
      });
    }

    return res.json({
      success: true,
      message: "Komentar ditandai sudah dibaca"
    });
  });
});

// =====================
// 🔥 DELETE KOMENTAR
// =====================
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID tidak valid"
    });
  }

  const sql = "DELETE FROM komentar_saran WHERE id_komentar = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log("ERROR DELETE:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal hapus komentar"
      });
    }

    return res.json({
      success: true,
      message: "Komentar berhasil dihapus"
    });
  });
});

module.exports = router;