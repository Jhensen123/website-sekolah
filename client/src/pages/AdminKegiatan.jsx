import React, { useState, useEffect } from "react";
import AdminLayout from "../pages/AdminLayout";

const AdminKegiatan = () => {

  const [kegiatan, setKegiatan] = useState([]);
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    tanggal: "" // ✅ TAMBAH
  });

  const [file, setFile] = useState(null);

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/berita");
      const data = await res.json();

      const kegiatanOnly = data.filter(
        item => item.kategori?.toLowerCase().trim() === "kegiatan"
      );

      setKegiatan(kegiatanOnly);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE FILE
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (!form.judul || !form.deskripsi || !form.tanggal) {
      alert("Semua field wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("isi", form.deskripsi);
    formData.append("kategori", "kegiatan");
    formData.append("tanggal", form.tanggal); // ✅ KIRIM TANGGAL

    if (file) {
      formData.append("gambar", file);
    }

    try {
      const res = await fetch("http://localhost:5000/api/berita", {
        method: "POST",
        body: formData
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Gagal simpan ❌");
        return;
      }

      alert("Kegiatan berhasil ditambahkan ✅");

      fetchData();

      // RESET FORM
      setForm({
        judul: "",
        deskripsi: "",
        tanggal: ""
      });

      setFile(null);

    } catch (err) {
      console.log(err);
      alert("Gagal tambah kegiatan ❌");
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id_konten) => {
    if (!window.confirm("Yakin mau hapus?")) return;

    try {
      await fetch(
        `http://localhost:5000/api/berita/${id_konten}`,
        { method: "DELETE" }
      );

      alert("Data berhasil dihapus ✅");
      fetchData();

    } catch (err) {
      console.log(err);
      alert("Gagal hapus ❌");
    }
  };

  return (
    <AdminLayout>
      <h2>Manajemen Kegiatan</h2>

      {/* FORM */}
      <div style={{
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <input
          type="text"
          name="judul"
          placeholder="Judul kegiatan"
          value={form.judul}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          name="deskripsi"
          placeholder="Deskripsi kegiatan"
          value={form.deskripsi}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* ✅ INPUT TANGGAL */}
        <input
          type="date"
          name="tanggal"
          value={form.tanggal}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input type="file" onChange={handleFileChange} />

        <br /><br />

        <button
          onClick={handleSubmit}
          style={{
            background: "#1976d2",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          + Tambah Kegiatan
        </button>
      </div>

      {/* TABEL */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px"
      }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr 2fr 1fr",
          fontWeight: "bold",
          marginBottom: "10px"
        }}>
          <div>Foto</div>
          <div>Judul</div>
          <div>Tanggal</div>
          <div>Deskripsi</div>
          <div>Aksi</div>
        </div>

        {kegiatan.length === 0 ? (
          <p>Tidak ada data kegiatan</p>
        ) : (
          kegiatan.map((item) => (
            <div
              key={item.id_konten}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr 2fr 1fr",
                alignItems: "center",
                padding: "10px 0",
                borderTop: "1px solid #ddd"
              }}
            >

              <img
                src={
                  item.gambar
                    ? `http://localhost:5000/uploads/${item.gambar}`
                    : "/images/bg1.jpeg"
                }
                alt=""
                style={{ width: "80px", borderRadius: "5px" }}
              />

              <div>{item.judul}</div>
              <div>{item.tanggal}</div>
              <div>{item.isi}</div>

              <div>
                <button
                  onClick={() => handleDelete(item.id_konten)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Hapus
                </button>
              </div>

            </div>
          ))
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminKegiatan;