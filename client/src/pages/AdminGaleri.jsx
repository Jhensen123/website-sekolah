import React, { useState, useEffect } from "react";
import AdminLayout from "../pages/AdminLayout";

const BASE_URL = "https://website-sekolah-production-8f69.up.railway.app";

const AdminGaleri = () => {

  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    judul: "",
    tanggal: "",
    foto: null
  });

  const [editId, setEditId] = useState(null);

  // 🔥 GET DATA (FIX)
  const getData = () => {
    setLoading(true);

    fetch(`${BASE_URL}/api/galeri`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch galeri");
        return res.json();
      })
      .then(res => {
        const data = Array.isArray(res) ? res : (res.data || []);
        setGaleri(data);
      })
      .catch(err => console.log("ERROR:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFoto = (e) => {
    setForm({ ...form, foto: e.target.files[0] });
  };

  // 🔥 SUBMIT
  const handleSubmit = () => {

    if (!form.judul || !form.tanggal) {
      alert("Judul dan tanggal wajib diisi");
      return;
    }

    if (!editId && !form.foto) {
      alert("Foto wajib diisi");
      return;
    }

    const formData = new FormData();
    formData.append("judul_foto", form.judul);
    formData.append("tanggal", form.tanggal);

    if (form.foto) {
      formData.append("file_foto", form.foto);
    }

    const url = editId
      ? `${BASE_URL}/api/galeri/${editId}`
      : `${BASE_URL}/api/galeri`;

    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal simpan");
        return res.json();
      })
      .then(() => {
        alert(editId ? "Berhasil update ✅" : "Berhasil tambah ✅");

        setForm({
          judul: "",
          tanggal: "",
          foto: null
        });

        setEditId(null);
        getData();
      })
      .catch(() => alert("Gagal ❌"));
  };

  const handleEdit = (item) => {
    setForm({
      judul: item.judul_foto || "",
      tanggal: item.tanggal || "",
      foto: null
    });

    setEditId(item.id_galeri);
  };

  // 🔥 DELETE (FIX)
  const handleDelete = (id) => {
    fetch(`${BASE_URL}/api/galeri/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal hapus");
        getData();
      })
      .catch(() => alert("Gagal hapus ❌"));
  };

  return (
    <AdminLayout>
      <h2>Manajemen Galeri Sekolah</h2>

      <div style={{
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        
        <input
          type="text"
          name="judul"
          placeholder="Judul foto"
          value={form.judul}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="date"
          name="tanggal"
          value={form.tanggal}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input type="file" onChange={handleFoto} key={editId || form.tanggal} />

        <br /><br />

        <button
          type="button"
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
          {editId ? "Update Foto" : "+ Tambah Foto"}
        </button>
      </div>

      {/* 🔥 LIST */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}>
          {[...(galeri || [])]
            .sort((a, b) => (b.tanggal || "").localeCompare(a.tanggal || ""))
            .map((item) => (
              <div key={item.id_galeri} style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}>

                <img
                  src={`${BASE_URL}/uploads/${item.file_foto}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />

                <h4>{item.judul_foto}</h4>

                <p style={{ fontSize: "13px", color: "gray" }}>
                  {item.tanggal
                    ? item.tanggal.split("T")[0].split("-").reverse().join("/")
                    : "-"}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id_galeri)}>Hapus</button>
                </div>

              </div>
            ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGaleri;