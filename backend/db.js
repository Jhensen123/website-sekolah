const mysql = require("mysql2");

// 🔥 PRIORITAS: pakai DATABASE_URL (Railway)
let db;

if (process.env.DATABASE_URL) {
  db = mysql.createPool(process.env.DATABASE_URL);
} else {
  // 🔥 fallback (kalau jalan di local)
  db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "sekolah_db",
    port: process.env.DB_PORT || 3306,

    timezone: "+07:00",
    dateStrings: true,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

// 🔥 TEST CONNECTION
db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ DB Error:", err.message);
  } else {
    console.log("✅ MySQL Connected");
    connection.release();
  }
});

module.exports = db;