const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// =====================
// 🔥 CONFIG
// =====================
const PORT = process.env.PORT || 5000;

// 🔥 GANTI DOMAIN FRONTEND KAMU SAAT DEPLOY
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

// =====================
// 🔥 MIDDLEWARE
// =====================

// CORS (lebih aman)
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// JSON parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =====================
// 🔥 STATIC FILE (UPLOAD)
// =====================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =====================
// 🔥 HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// =====================
// 🔥 ROUTES API
// =====================
app.use("/api/ppdb", require("./routes/ppdb"));
app.use("/api/profil", require("./routes/profil"));
app.use("/api/berita", require("./routes/berita"));
app.use("/api/galeri", require("./routes/galeri"));
app.use("/api/komentar", require("./routes/komentar"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/testimoni", require("./routes/testimoni"));

// =====================
// 🔥 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({
    message: "Route tidak ditemukan"
  });
});

// =====================
// 🔥 ERROR HANDLER
// =====================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// =====================
// 🔥 RUN SERVER
// =====================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});