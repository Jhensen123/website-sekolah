const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ===== PATH UPLOAD =====
const uploadPath = path.join(__dirname, "../uploads");

// AUTO CREATE FOLDER (WAJIB UNTUK RAILWAY)
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ===== MULTER =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s/g, "_");
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ===== VALIDASI TANGGAL =====
const isValidDate = (date) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

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
      console.error("GET ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data"
      });
    }

    res.json({
      success: true,
      data: result || []
    });
  });
});

// =====================
// POST
// =====================
router.post("/", upload.single("gambar"), (req, res) => {
  let { judul, isi, kategori, tanggal } = req.body;

  if (!judul || !isi || !kategori || !tanggal) {
    return res.status(400).json({
      success: false,
      message: "Semua field wajib diisi"
    });
  }

  if (!isValidDate(tanggal)) {
    return res.status(400).json({
      success: false,
      message: "Format tanggal harus YYYY-MM-DD"
    });
  }

  kategori = kategori.toLowerCase();
  const gambar = req.file ? req.file.filename : "";

  const sql = `
    INSERT INTO berita_dan_kegiatan 
    (judul, isi, gambar, kategori, tanggal)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [judul, isi, gambar, kategori, tanggal], (err, result) => {
    if (err) {
      console.error("INSERT ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal tambah data"
      });
    }

    res.json({
      success: true,
      message: "Berhasil ditambahkan",
      id: result.insertId
    });
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
        console.error("DELETE ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Gagal hapus"
        });
      }

      res.json({
        success: true,
        message: "Berhasil dihapus"
      });
    }
  );
});

module.exports = router;