const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ===== PATH UPLOAD =====
const uploadPath = path.join(__dirname, "../uploads");

// auto create folder
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ===== MULTER =====
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

// ===== GET PROFIL =====
router.get("/", (req, res) => {
  db.query("SELECT * FROM profil_sekolah LIMIT 1", (err, result) => {
    if (err) {
      console.log("GET ERROR:", err);
      return res.status(500).json({ message: "Gagal ambil profil" });
    }

    if (!result || result.length === 0) {
      return res.json({
        id_profil: 1,
        deskripsi: "",
        sejarah: "",
        logo: ""
      });
    }

    res.json(result[0]);
  });
});

// ===== UPDATE PROFIL =====
router.put("/", (req, res) => {
  upload.single("logo")(req, res, (err) => {

    if (err) {
      console.log("UPLOAD ERROR:", err);
      return res.status(500).json({ message: "Upload gagal" });
    }

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { deskripsi, sejarah } = req.body;
    const logoBaru = req.file ? req.file.filename : null;

    db.query("SELECT * FROM profil_sekolah LIMIT 1", (err, result) => {
      if (err) {
        console.log("SELECT ERROR:", err);
        return res.status(500).json({ message: "Error database" });
      }

      // ===== INSERT =====
      if (!result || result.length === 0) {
        db.query(
          "INSERT INTO profil_sekolah (deskripsi, sejarah, logo) VALUES (?, ?, ?)",
          [deskripsi || "", sejarah || "", logoBaru || ""],
          (err) => {
            if (err) {
              console.log("INSERT ERROR:", err);
              return res.status(500).json({ message: "Gagal insert" });
            }

            return res.json({ message: "Profil berhasil ditambahkan ✅" });
          }
        );
      } else {
        // ===== UPDATE (FIX UTAMA) =====
        const dataLama = result[0];
        const logoFinal = logoBaru ? logoBaru : dataLama.logo;

        db.query(
          "UPDATE profil_sekolah SET deskripsi=?, sejarah=?, logo=? WHERE id_profil=?",
          [
            deskripsi ?? dataLama.deskripsi,
            sejarah ?? dataLama.sejarah,
            logoFinal,
            dataLama.id_profil
          ],
          (err) => {
            if (err) {
              console.log("UPDATE ERROR:", err);
              return res.status(500).json({ message: "Gagal update profil" });
            }

            res.json({ message: "Profil berhasil diupdate ✅" });
          }
        );
      }
    });
  });
});

module.exports = router;