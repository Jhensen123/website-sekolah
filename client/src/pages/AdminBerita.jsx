import React, { useState, useEffect } from "react";
import AdminLayout from "../pages/AdminLayout";

const BASE_URL = "https://website-sekolah-production-8f69.up.railway.app";

const AdminBerita = () => {

  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    judul: "",
    isi: "",
    tanggal: ""
  });

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/berita`);

      if (!res.ok) throw new Error("Gagal fetch berita");

      const data = await res.json();

      const list = Array.isArray(data) ? data : (data.data || []);

      const beritaOnly = list.filter(
        item => item.kategori?.toLowerCase().trim() === "berita"
      );

      setBerita(beritaOnly);
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (!form.judul || !form.isi || !form.tanggal) {
      alert("Lengkapi semua data!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/berita`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          judul: form.judul,
          isi: form.isi,
          kategori: "berita",
          tanggal: form.tanggal
        })
      });

      if (!res.ok) throw new Error("Gagal tambah berita");

      alert("Berita berhasil ditambahkan ✅");
      setForm({ judul: "", isi: "", tanggal: "" });

      fetchData();

    } catch (err) {
      console.log(err);
      alert("Gagal tambah berita ❌");
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/berita/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Gagal hapus");

      fetchData();

    } catch (err) {
      console.log(err);
      alert("Gagal hapus ❌");
    }
  };

  return (
    <AdminLayout>
      <div style={{
        padding: "20px",
        background: "#f4f6f9",
        minHeight: "100vh"
      }}>

        <h2 style={{
          color: "#1976d2",
          marginBottom: "20px"
        }}>
          Manajemen Berita
        </h2>

        {/* FORM */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "30px"
        }}>
          <h3 style={{ marginBottom: "15px" }}>Tambah Berita</h3>

          <input
            name="judul"
            placeholder="Judul"
            value={form.judul}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="isi"
            placeholder="Isi berita"
            value={form.isi}
            onChange={handleChange}
            style={{ ...inputStyle, height: "100px", resize: "none" }}
          />

          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            style={inputStyle}
          />

          <button onClick={handleSubmit} style={btnTambah}>
            + Tambah Berita
          </button>
        </div>

        {/* LIST */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <div style={{
            display: "grid",
            gap: "20px"
          }}>
            {berita.length === 0 ? (
              <p style={{ textAlign: "center", color: "gray" }}>
                Belum ada berita
              </p>
            ) : (
              berita.map((item) => (
                <div key={item.id_konten} style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "20px"
                }}>

                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: "0 0 8px",
                      color: "#1976d2"
                    }}>
                      {item.judul}
                    </h4>

                    <p style={{
                      fontSize: "12px",
                      color: "gray",
                      marginBottom: "10px"
                    }}>
                      {item.tanggal}
                    </p>

                    <p style={{
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.5"
                    }}>
                      {(item.isi || "").length > 120
                        ? item.isi.substring(0, 120) + "..."
                        : item.isi}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id_konten)}
                    style={btnHapus}
                  >
                    Hapus
                  </button>

                </div>
              ))
            )}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

// STYLE
const inputStyle = {
  width: "98%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none"
};

const btnTambah = {
  padding: "10px 15px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const btnHapus = {
  background: "#e53935",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  height: "fit-content"
};

export default AdminBerita;