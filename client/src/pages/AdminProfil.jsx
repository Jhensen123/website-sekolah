import React, { useState, useEffect } from 'react';
import AdminLayout from '../pages/AdminLayout';

const AdminProfil = () => {

  const BASE_URL = "http://localhost:5000";

  const [deskripsi, setDeskripsi] = useState("");
  const [sejarah, setSejarah] = useState("");
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState("");

  // ===== GET DATA =====
  useEffect(() => {
    fetch(`${BASE_URL}/api/profil`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch profil");
        return res.json();
      })
      .then(res => {
        const data = res.data || res;

        setDeskripsi(data.deskripsi || "");
        setSejarah(data.sejarah || "");

        if (data.logo) {
          setPreviewFoto(`${BASE_URL}/uploads/${data.logo}`);
        }
      })
      .catch(err => console.log("FETCH ERROR:", err));
  }, []);

  // ===== SAVE =====
  const handleSave = async () => {
    const formData = new FormData();

    formData.append("deskripsi", deskripsi);
    formData.append("sejarah", sejarah); // 🔥 FIX

    if (foto) {
      formData.append("logo", foto);
    }

    try {
      const res = await fetch(`${BASE_URL}/api/profil`, {
        method: "PUT",
        body: formData
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("ERROR BACKEND:", text);
        alert(text);
        return;
      }

      await res.json();

      alert("Profil berhasil diupdate ✅");
      window.location.reload();

    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert("Gagal update ❌");
    }
  };

  return (
    <AdminLayout>

      <div style={container}>
        <h2 style={title}>Manajemen Profil Sekolah</h2>

        <div style={card}>

          {/* DESKRIPSI */}
          <div style={{ flex: 1 }}>
            <h4 style={label}>Deskripsi Sekolah</h4>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              style={textarea}
              placeholder="Masukkan deskripsi sekolah..."
            />

            <h4 style={label}>Sejarah Sekolah</h4>
            <textarea
              value={sejarah}
              onChange={(e) => setSejarah(e.target.value)}
              style={textarea}
              placeholder="Masukkan sejarah sekolah..."
            />
          </div>

          {/* FOTO */}
          <div style={{ flex: 1 }}>
            <h4 style={label}>Logo Sekolah</h4>

            <input
              type="file"
              style={inputFile}
              onChange={(e) => {
                const file = e.target.files[0];
                setFoto(file);

                if (file) {
                  setPreviewFoto(URL.createObjectURL(file));
                }
              }}
            />

            {previewFoto && (
              <img
                src={previewFoto}
                alt="preview"
                style={preview}
              />
            )}
          </div>

        </div>

        <button style={btn} onClick={handleSave}>
          Simpan Perubahan
        </button>
      </div>

    </AdminLayout>
  );
};

// ===== STYLE =====
const container = {
  padding: "20px",
  background: "#f4f6f9",
  minHeight: "100vh"
};

const title = {
  color: "#1976d2",
  marginBottom: "20px"
};

const card = {
  display: "flex",
  gap: "30px",
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  flexWrap: "wrap"
};

const label = {
  marginBottom: "8px",
  color: "#333"
};

const textarea = {
  width: "98%",
  height: "120px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  resize: "none",
  marginBottom: "15px"
};

const inputFile = {
  marginTop: "10px"
};

const preview = {
  width: "100%",
  marginTop: "15px",
  borderRadius: "10px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
};

const btn = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default AdminProfil;