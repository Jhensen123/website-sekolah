const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// 🔥 MIDDLEWARE
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// 🔥 STATIC FOLDER (UPLOADS)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server OK 🚀");
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
// 🔥 ERROR HANDLER
// =====================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// =====================
// 🔥 RUN SERVER (FIX RAILWAY)
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running di port ${PORT}`);
});