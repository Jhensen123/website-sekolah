const express = require("express");
const router = express.Router();
const db = require("../db");

// =========================
// 🔥 POST (TRANSACTION SAFE)
// =========================
router.post("/", (req, res) => {

  if (!req.body) {
    return res.status(400).json({ message: "Request body kosong ❌" });
  }

  const {
    nama,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    asal_sekolah,
    alamat,
    nama_ayah,
    pekerjaan_ayah,
    alamat_ayah,
    agama_ayah,
    nama_ibu,
    pekerjaan_ibu,
    alamat_ibu,
    agama_ibu,
    no_hp,
    email
  } = req.body;

  if (!nama || !tanggal_lahir || !no_hp || !email) {
    return res.status(400).json({
      message: "Data wajib belum lengkap ❌"
    });
  }

  // 🔥 START TRANSACTION
  db.beginTransaction(err => {
    if (err) {
      console.log("❌ TRANSACTION ERROR:", err);
      return res.status(500).json({ message: "Gagal mulai transaksi" });
    }

    // 1️⃣ INSERT CALON SISWA
    const sqlSiswa = `
      INSERT INTO calon_siswa 
      (nama, tempat_lahir, tanggal_lahir, jenis_kelamin, asal_sekolah, alamat)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sqlSiswa, [
      nama,
      tempat_lahir || "",
      tanggal_lahir,
      jenis_kelamin || "",
      asal_sekolah || "",
      alamat || ""
    ], (err, resultSiswa) => {

      if (err) {
        return db.rollback(() => {
          console.log("❌ ERROR SISWA:", err);
          res.status(500).json({ message: "Gagal simpan siswa" });
        });
      }

      const id_calon_siswa = resultSiswa.insertId;

      // 2️⃣ INSERT ORANG TUA
      const sqlOrtu = `
        INSERT INTO orang_tua 
        (nama_ayah, pekerjaan_ayah, alamat_ayah, agama_ayah,
         nama_ibu, pekerjaan_ibu, alamat_ibu, agama_ibu, no_hp, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(sqlOrtu, [
        nama_ayah || "",
        pekerjaan_ayah || "",
        alamat_ayah || "",
        agama_ayah || "",
        nama_ibu || "",
        pekerjaan_ibu || "",
        alamat_ibu || "",
        agama_ibu || "",
        no_hp,
        email
      ], (err, resultOrtu) => {

        if (err) {
          return db.rollback(() => {
            console.log("❌ ERROR ORTU:", err);
            res.status(500).json({ message: "Gagal simpan orang tua" });
          });
        }

        const id_orang_tua = resultOrtu.insertId;

        // 3️⃣ INSERT PENDAFTARAN
        const sqlDaftar = `
          INSERT INTO pendaftaran 
          (id_calon_siswa, id_orang_tua, tanggal_daftar, status)
          VALUES (?, ?, NOW(), 'Pending')
        `;

        db.query(sqlDaftar, [
          id_calon_siswa,
          id_orang_tua
        ], (err, resultDaftar) => {

          if (err) {
            return db.rollback(() => {
              console.log("❌ ERROR DAFTAR:", err);
              res.status(500).json({ message: "Gagal simpan pendaftaran" });
            });
          }

          // 🔥 COMMIT
          db.commit(err => {
            if (err) {
              return db.rollback(() => {
                console.log("❌ COMMIT ERROR:", err);
                res.status(500).json({ message: "Gagal commit" });
              });
            }

            res.json({
              message: "Pendaftaran berhasil ✅",
              id_pendaftaran: resultDaftar.insertId
            });
          });
        });
      });
    });
  });
});


// =========================
// 🔥 GET DATA ADMIN
// =========================
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      p.id_pendaftaran,
      DATE_FORMAT(p.tanggal_daftar, '%Y-%m-%d') as tanggal_daftar,
      p.status,
      c.nama
    FROM pendaftaran p
    JOIN calon_siswa c 
      ON p.id_calon_siswa = c.id_calon_siswa
    ORDER BY p.id_pendaftaran DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ ERROR GET:", err);
      return res.status(500).json({ message: "Gagal ambil data" });
    }

    res.json({
      data: result
    });
  });
});


// =========================
// 🔥 UPDATE STATUS
// =========================
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status kosong ❌" });
  }

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID tidak valid ❌" });
  }

  const sql = `
    UPDATE pendaftaran 
    SET status = ? 
    WHERE id_pendaftaran = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log("❌ ERROR UPDATE:", err);
      return res.status(500).json({ message: "Gagal update status" });
    }

    res.json({
      message: "Status berhasil diupdate ✅",
      affectedRows: result.affectedRows
    });
  });
});


// =========================
// 🔥 DELETE (WAJIB UNTUK ADMIN)
// =========================
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  db.query(
    "DELETE FROM pendaftaran WHERE id_pendaftaran = ?",
    [id],
    (err) => {
      if (err) {
        console.log("❌ ERROR DELETE:", err);
        return res.status(500).json({ message: "Gagal hapus" });
      }

      res.json({ message: "Berhasil dihapus ✅" });
    }
  );
});

module.exports = router;