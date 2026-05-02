const express = require("express");
const router = express.Router();
const db = require("../db");

// =========================
// 🔥 POST (SUDAH PUNYA KAMU)
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

  // 1. INSERT CALON SISWA
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
      console.log("❌ ERROR SISWA:", err);
      return res.status(500).json({
        message: "Gagal simpan data siswa",
        error: err.message
      });
    }

    const id_calon_siswa = resultSiswa.insertId;

    // 2. INSERT ORANG TUA
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
        console.log("❌ ERROR ORTU:", err);
        return res.status(500).json({
          message: "Gagal simpan data orang tua",
          error: err.message
        });
      }

      const id_orang_tua = resultOrtu.insertId;

      // 3. INSERT PENDAFTARAN
      const sqlDaftar = `
        INSERT INTO pendaftaran 
        (id_calon_siswa, id_orang_tua, tanggal_daftar, dokumen_akta, dokumen_kk, dokumen_ijazah, foto, status)
        VALUES (?, ?, NOW(), ?, ?, ?, ?, 'Pending')
      `;

      db.query(sqlDaftar, [
        id_calon_siswa,
        id_orang_tua,
        null,
        null,
        null,
        null
      ], (err) => {

        if (err) {
          console.log("❌ ERROR DAFTAR:", err);
          return res.status(500).json({
            message: "Gagal simpan pendaftaran",
            error: err.message
          });
        }

        res.json({
          message: "Pendaftaran berhasil ✅"
        });
      });
    });
  });
});


// =========================
// 🔥 GET (AMBIL DATA UNTUK ADMIN)
// =========================
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      p.id_pendaftaran,
      p.tanggal_daftar,
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

    res.json({ data: result });
  });
});


// =========================
// 🔥 UPDATE STATUS (DITERIMA / DITOLAK)
// =========================
router.put("/:id", (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status kosong ❌" });
  }

  const sql = `
    UPDATE pendaftaran 
    SET status = ? 
    WHERE id_pendaftaran = ?
  `;

  db.query(sql, [status, req.params.id], (err) => {
    if (err) {
      console.log("❌ ERROR UPDATE:", err);
      return res.status(500).json({ message: "Gagal update status" });
    }

    res.json({ message: "Status berhasil diupdate ✅" });
  });
});

module.exports = router;