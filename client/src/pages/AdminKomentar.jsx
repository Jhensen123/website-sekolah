import React, { useEffect, useState } from "react";
import AdminLayout from "../pages/AdminLayout";

const BASE_URL = "https://website-sekolah-production-8f69.up.railway.app";

const AdminKomentar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA FIX TOTAL
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/komentar`);
      const result = await res.json();

      console.log("API KOMENTAR:", result); // 🔥 DEBUG

      if (!res.ok) {
        throw new Error(result.message || "Gagal fetch komentar");
      }

      // 🔥 FIX PALING PENTING
      if (result.success) {
        setData(Array.isArray(result.data) ? result.data : []);
      } else {
        setData([]);
        console.warn("API gagal:", result.message);
      }

    } catch (err) {
      console.log("Error fetch komentar:", err);
      alert("Gagal ambil komentar ❌");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 DELETE FIX
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus komentar ini?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/komentar/${id}`, {
        method: "DELETE"
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Gagal hapus");
      }

      alert("Berhasil dihapus ✅");
      fetchData();

    } catch (err) {
      console.log(err);
      alert("Gagal menghapus komentar ❌");
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
                  <th style={thStyle}>Komentar / Saran</th>
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
                        wordBreak: "break-word",
                        color: "#555"
                      }}>
                        {item.isi_komentar || "-"}
                      </td>

                      <td style={tdStyle}>
                        <button
                          onClick={() => handleDelete(item.id_komentar)}
                          style={btnHapus}
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

// STYLE
const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "14px"
};

const tdStyle = {
  padding: "12px",
  fontSize: "14px"
};

const btnHapus = {
  background: "#e53935",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default AdminKomentar;