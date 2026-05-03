const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔐 SECRET KEY (WAJIB ADA DI ENV)
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// =======================
// LOGIN ADMIN
// =======================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // VALIDASI
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password wajib diisi"
    });
  }

  const sql = "SELECT * FROM admin WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }

    if (!result || result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Username tidak ditemukan"
      });
    }

    const admin = result[0];

    // 🔥 CEK PASSWORD HASH
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
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

    res.json({
      success: true,
      message: "Login berhasil",
      token: token,
      data: {
        id_admin: admin.id_admin,
        username: admin.username
      }
    });
  });
});

module.exports = router;