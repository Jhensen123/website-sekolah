import React, { useEffect, useState } from "react";
import AdminLayout from "../pages/AdminLayout";

const AdminKomentar = () => {
  const BASE_URL = "http://localhost:5000";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);

    fetch(`${BASE_URL}/api/komentar`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch komentar");
        return res.json();
      })
      .then(res => {
        const result = res.data || res; // 🔥 FIX UTAMA
        console.log("DATA API:", result);
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error fetch komentar:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const fixedId = Number(id);

    if (!window.confirm("Yakin ingin menghapus komentar ini?")) return;

    try {
      const res = await fetch(
        `${BASE_URL}/api/komentar/${fixedId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete gagal");

      fetchData();
    } catch (err) {
      console.log(err);
      alert("Gagal menghapus komentar");
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
          marginBottom: "20px",
          color: "#1976d2"
        }}>
          Manajemen Komentar & Saran
        </h2>

        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : (
            <table style={{
              width: "100%",
              borderCollapse: "collapse"
            }}>
              <thead>
                <tr style={{
                  background: "#1976d2",
                  color: "white"
                }}>
                  <th style={thStyle}>No</th>
                  <th style={thStyle}>Nama</th>
                  <th style={thStyle}>Komentar/saran</th>
                  <th style={thStyle}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "gray"
                    }}>
                      Tidak ada komentar
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id_komentar} style={{
                      borderBottom: "1px solid #eee"
                    }}>
                      <td style={tdStyle}>{index + 1}</td>

                      <td style={tdStyle}>
                        <div style={{ fontWeight: "bold" }}>
                          {item.nama_pengirim || "-"}
                        </div>
                      </td>

                      <td style={{
                        ...tdStyle,
                        maxWidth: "400px",
                        wordWrap: "break-word",
                        color: "#555"
                      }}>
                        {item.isi_komentar || "-"}
                      </td>

                      <td style={tdStyle}>
                        <button
                          onClick={() => handleDelete(item.id_komentar)}
                          style={{
                            background: "#e53935",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "0.2s"
                          }}
                          onMouseOver={e => e.target.style.opacity = "0.8"}
                          onMouseOut={e => e.target.style.opacity = "1"}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </AdminLayout>
  );
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "14px"
};

const tdStyle = {
  padding: "12px",
  fontSize: "14px"
};

export default AdminKomentar;