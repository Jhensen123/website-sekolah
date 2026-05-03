const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ===== PATH UPLOAD =====
const uploadPath = path.join(__dirname, "../uploads");

// AUTO CREATE FOLDER
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ===== STORAGE =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const safeName = Date.now() + "-" + file.originalname.replace(/\s/g, "_");
    cb(null, safeName);
  }
});

const upload = multer({ storage });

// ===== VALIDASI TANGGAL =====
const isValidDate = (date) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

// ===== GET GALERI =====
router.get("/", (req, res) => {
  db.query(
    `SELECT 
      id_galeri,
      judul_foto,
      file_foto,
      DATE_FORMAT(tanggal, '%Y-%m-%d') as tanggal
     FROM galeri 
     ORDER BY tanggal DESC, id_galeri DESC`,
    (err, result) => {
      if (err) {
        console.log("GET ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Gagal ambil data galeri"
        });
      }

      res.json({
        success: true,
        data: result || []
      });
    }
  );
});

// ===== POST GALERI =====
router.post("/", upload.single("file_foto"), (req, res) => {
  const judul = req.body.judul_foto;
  const tanggal = req.body.tanggal;
  const file = req.file ? req.file.filename : null;

  if (!judul || !file || !tanggal) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap"
    });
  }

  if (!isValidDate(tanggal)) {
    return res.status(400).json({
      success: false,
      message: "Format tanggal harus YYYY-MM-DD"
    });
  }

  db.query(
    "INSERT INTO galeri (judul_foto, file_foto, tanggal) VALUES (?, ?, ?)",
    [judul, file, tanggal],
    (err, result) => {
      if (err) {
        console.log("ERROR DB:", err);
        return res.status(500).json({
          success: false,
          message: "Gagal tambah galeri"
        });
      }

      res.json({
        success: true,
        message: "Galeri berhasil ditambahkan",
        id: result.insertId
      });
    }
  );
});

// ===== UPDATE GALERI =====
router.put("/:id", upload.single("file_foto"), (req, res) => {
  const judul = req.body.judul_foto;
  const tanggal = req.body.tanggal;
  const file = req.file?.filename;

  if (!judul || !tanggal) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap"
    });
  }

  if (!isValidDate(tanggal)) {
    return res.status(400).json({
      success: false,
      message: "Format tanggal salah"
    });
  }

  // TANPA GANTI GAMBAR
  if (!file) {
    db.query(
      "UPDATE galeri SET judul_foto=?, tanggal=? WHERE id_galeri=?",
      [judul, tanggal, req.params.id],
      (err) => {
        if (err) {
          console.log("UPDATE ERROR:", err);
          return res.status(500).json({
            success: false,
            message: "Gagal update galeri"
          });
        }

        res.json({
          success: true,
          message: "Galeri berhasil diupdate"
        });
      }
    );
  } 
  // DENGAN GANTI GAMBAR
  else {
    db.query(
      "UPDATE galeri SET judul_foto=?, file_foto=?, tanggal=? WHERE id_galeri=?",
      [judul, file, tanggal, req.params.id],
      (err) => {
        if (err) {
          console.log("UPDATE ERROR:", err);
          return res.status(500).json({
            success: false,
            message: "Gagal update galeri"
          });
        }

        res.json({
          success: true,
          message: "Galeri berhasil diupdate"
        });
      }
    );
  }
});

// ===== DELETE GALERI =====
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM galeri WHERE id_galeri=?",
    [req.params.id],
    (err) => {
      if (err) {
        console.log("DELETE ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Gagal hapus galeri"
        });
      }

      res.json({
        success: true,
        message: "Galeri berhasil dihapus"
      });
    }
  );
});

module.exports = router;