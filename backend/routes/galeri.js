const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");

// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 🔥 VALIDASI FORMAT TANGGAL
const isValidDate = (date) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

// GET
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
        return res.json(err);
      }
      res.json(result);
    }
  );
});

// 🔥 POST FIX TOTAL
router.post("/", upload.single("file_foto"), (req, res) => {
  const judul = req.body.judul_foto;
  const tanggal = req.body.tanggal;
  const file = req.file ? req.file.filename : null;

  console.log("RAW BODY:", req.body);

  // VALIDASI
  if (!judul || !file || !tanggal) {
    return res.status(400).json({
      message: "Data tidak lengkap"
    });
  }

  if (!isValidDate(tanggal)) {
    return res.status(400).json({
      message: "Format tanggal harus YYYY-MM-DD"
    });
  }

  db.query(
    "INSERT INTO galeri (judul_foto, file_foto, tanggal) VALUES (?, ?, ?)",
    [judul, file, tanggal],
    (err, result) => {
      if (err) {
        console.log("ERROR DB:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Berhasil tambah",
        insertId: result.insertId
      });
    }
  );
});

// 🔥 UPDATE FIX TOTAL
router.put("/:id", upload.single("file_foto"), (req, res) => {
  const judul = req.body.judul_foto;
  const tanggal = req.body.tanggal;
  const file = req.file?.filename;

  console.log("UPDATE BODY:", req.body);

  if (!judul || !tanggal) {
    return res.json({ message: "Data tidak lengkap" });
  }

  if (!isValidDate(tanggal)) {
    return res.json({ message: "Format tanggal salah" });
  }

  if (!file) {
    db.query(
      "UPDATE galeri SET judul_foto=?, tanggal=? WHERE id_galeri=?",
      [judul, tanggal, req.params.id],
      (err) => {
        if (err) {
          console.log("UPDATE ERROR:", err);
          return res.json(err);
        }
        res.json({ message: "Galeri diupdate" });
      }
    );
  } else {
    db.query(
      "UPDATE galeri SET judul_foto=?, file_foto=?, tanggal=? WHERE id_galeri=?",
      [judul, file, tanggal, req.params.id],
      (err) => {
        if (err) {
          console.log("UPDATE ERROR:", err);
          return res.json(err);
        }
        res.json({ message: "Galeri diupdate" });
      }
    );
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM galeri WHERE id_galeri=?",
    [req.params.id],
    (err) => {
      if (err) {
        console.log("DELETE ERROR:", err);
        return res.json(err);
      }
      res.json({ message: "Dihapus" });
    }
  );
});

module.exports = router;