const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// =======================
// LOGIN ADMIN
// =======================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 🔥 VALIDASI INPUT
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password wajib diisi"
    });
  }

  const sql = "SELECT * FROM admin WHERE username = ?";

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }

    // 🔥 USER TIDAK DITEMUKAN
    if (!result || result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Username tidak ditemukan"
      });
    }

    const admin = result[0];

    // 🔥 NORMALISASI (hindari error spasi / case)
    const inputPassword = String(password).trim();
    const dbPassword = String(admin.password).trim();

    // 🔥 CEK PASSWORD
    if (inputPassword !== dbPassword) {
      return res.status(401).json({
        success: false,
        message: "Password salah"
      });
    }

    // 🔥 BUAT TOKEN
    const token = jwt.sign(
      {
        id: admin.id_admin,
        username: admin.username
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 RESPONSE FINAL (rapi & konsisten)
    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
      data: {
        id_admin: admin.id_admin,
        username: admin.username
      }
    });
  });
});

module.exports = router;