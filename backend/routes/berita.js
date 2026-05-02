const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// =====================
// MULTER (UPLOAD FOTO)
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// =====================
// GET (URUT TERBARU)
// =====================
router.get("/", (req, res) => {
  const sql = `
    SELECT * FROM berita_dan_kegiatan
    ORDER BY tanggal DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data" });
    }
    res.json(result);
  });
});

// =====================
// POST (PAKAI TANGGAL MANUAL)
// =====================
router.post("/", upload.single("gambar"), (req, res) => {
  let { judul, isi, kategori, tanggal } = req.body;

  if (!judul || !isi || !kategori || !tanggal) {
    return res.status(400).json({ error: "Semua field wajib diisi!" });
  }

  kategori = kategori.toLowerCase();
  const gambar = req.file ? req.file.filename : "";

  const sql = `
    INSERT INTO berita_dan_kegiatan 
    (judul, isi, gambar, kategori, tanggal)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [judul, isi, gambar, kategori, tanggal], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal tambah data" });
    }
    res.json({ message: "Berhasil ditambahkan" });
  });
});

// =====================
// DELETE
// =====================
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM berita_dan_kegiatan WHERE id_konten = ?",
    [id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Gagal hapus" });
      }
      res.json({ message: "Berhasil dihapus" });
    }
  );
});

module.exports = router;