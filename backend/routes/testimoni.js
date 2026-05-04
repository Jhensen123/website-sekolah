const express = require("express");
const router = express.Router();
const db = require("../db");

// =====================
// 🔥 POST TESTIMONI
// =====================
router.post("/", (req, res) => {
  const { nama, isi_testimoni } = req.body;

  // VALIDASI
  if (!nama || !isi_testimoni) {
    return res.status(400).json({
      success: false,
      message: "Nama dan isi testimoni wajib diisi"
    });
  }

  const sql = `
    INSERT INTO testimoni (nama, isi_testimoni, tanggal, status_publish)
    VALUES (?, ?, CURDATE(), 0)
  `;

  db.query(sql, [nama, isi_testimoni], (err, result) => {
    if (err) {
      console.log("ERROR INSERT:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal kirim testimoni"
      });
    }

    return res.json({
      success: true,
      message: "Berhasil kirim testimoni",
      insertId: result.insertId
    });
  });
});

// =====================
// 🔥 GET ADMIN (SEMUA)
// =====================
router.get("/admin", (req, res) => {
  const sql = `
    SELECT 
      id_testimoni,
      nama,
      isi_testimoni,
      DATE_FORMAT(tanggal, '%Y-%m-%d') as tanggal,
      status_publish
    FROM testimoni
    ORDER BY id_testimoni DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("ERROR GET ADMIN:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal ambil data testimoni"
      });
    }

    return res.json({
      success: true,
      data: result || []
    });
  });
});

// =====================
// 🔥 GET USER (PUBLISHED)
// =====================
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      id_testimoni,
      nama,
      isi_testimoni,
      DATE_FORMAT(tanggal, '%Y-%m-%d') as tanggal
    FROM testimoni
    WHERE status_publish = 1
    ORDER BY id_testimoni DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("ERROR GET USER:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal ambil testimoni"
      });
    }

    return res.json({
      success: true,
      data: result || []
    });
  });
});

// =====================
// 🔥 UPDATE STATUS
// =====================
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const status = Number(req.body.status);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID tidak valid"
    });
  }

  const sql = `
    UPDATE testimoni 
    SET status_publish = ?
    WHERE id_testimoni = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log("ERROR UPDATE:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal update status"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan"
      });
    }

    return res.json({
      success: true,
      message: "Status berhasil diupdate",
      affectedRows: result.affectedRows
    });
  });
});

// =====================
// 🔥 DELETE
// =====================
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  db.query(
    "DELETE FROM testimoni WHERE id_testimoni = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log("ERROR DELETE:", err);
        return res.status(500).json({
          success: false,
          message: "Gagal hapus"
        });
      }

      return res.json({
        success: true,
        message: "Berhasil dihapus"
      });
    }
  );
});

module.exports = router;