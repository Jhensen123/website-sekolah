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

  // =======================
  // VALIDASI INPUT
  // =======================
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password wajib diisi"
    });
  }

  console.log("LOGIN REQUEST:", username);

  const sql = "SELECT * FROM admin WHERE username = ?";

  db.query(sql, [username], (err, result) => {

    // =======================
    // ERROR DATABASE
    // =======================
    if (err) {
      console.error("❌ DB ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    // =======================
    // USER TIDAK ADA
    // =======================
    if (!result || result.length === 0) {
      console.log("❌ USER TIDAK DITEMUKAN");
      return res.status(401).json({
        success: false,
        message: "Username tidak ditemukan"
      });
    }

    const admin = result[0];

    console.log("DB USER:", admin.username);
    console.log("DB PASS:", admin.password);

    // =======================
    // NORMALISASI PASSWORD
    // =======================
    const inputPassword = String(password).trim();
    const dbPassword = String(admin.password).trim();

    // =======================
    // CEK PASSWORD
    // =======================
    if (inputPassword !== dbPassword) {
      console.log("❌ PASSWORD SALAH");
      return res.status(401).json({
        success: false,
        message: "Password salah"
      });
    }

    // =======================
    // TOKEN
    // =======================
    const token = jwt.sign(
      {
        id: admin.id_admin,
        username: admin.username
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ LOGIN BERHASIL");

    // =======================
    // RESPONSE
    // =======================
    return res.status(200).json({
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