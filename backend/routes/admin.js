const express = require("express");
const router = express.Router();
const db = require("../db");

// =======================
// LOGIN ADMIN
// =======================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password wajib diisi"
    });
  }

  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        message: "Login berhasil",
        admin: result[0]
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah"
      });
    }
  });
});

module.exports = router;