const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// LOGIN ADMIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password wajib diisi"
    });
  }

  const sql = "SELECT * FROM admin WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) {
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

    const user = result[0];

    // 🔥 CEK PASSWORD HASH
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Password salah"
      });
    }

    // 🔥 BUAT TOKEN
    const token = jwt.sign(
      { id: user.id_admin, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id_admin: user.id_admin,
        username: user.username
      }
    });
  });
});

module.exports = router;