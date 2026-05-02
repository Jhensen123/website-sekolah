import React, { useEffect, useState } from "react";
import AdminLayout from "../pages/AdminLayout";

const AdminTestimoni = () => {

  const BASE_URL = "http://localhost:5000";
  const [data, setData] = useState([]);

  // =====================
  // AMBIL DATA (FIX)
  // =====================
  const fetchData = () => {
    fetch(`${BASE_URL}/api/testimoni/admin`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch testimoni");
        return res.json();
      })
      .then(res => {
        const result = res.data || res; // 🔥 FIX UTAMA
        setData(result);
      })
      .catch(err => console.log("FETCH ERROR:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =====================
  // UPDATE STATUS (FIX)
  // =====================
  const updateStatus = (id, currentStatus) => {
    const newStatus = Number(currentStatus) === 1 ? 0 : 1;

    fetch(`${BASE_URL}/api/testimoni/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: newStatus
      })
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
      })
      .then(() => {
        fetchData(); // refresh
      })
      .catch(err => {
        console.log("UPDATE ERROR:", err);
        alert("Gagal update status testimoni");
      });
  };

  return (
    <AdminLayout>
      <div style={{ padding: "20px" }}>

        <h2 style={{ marginBottom: 20, color: "#1976d2" }}>
          ⭐ Manajemen Testimoni
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>

          {data.length === 0 ? (
            <p style={{ textAlign: "center" }}>Tidak ada testimoni</p>
          ) : (
            data.map(item => (
              <div
                key={item.id_testimoni}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              >

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>

                  <h3 style={{ margin: 0 }}>{item.nama}</h3>

                  <span style={{
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    color: "white",
                    background: Number(item.status_publish) === 1 ? "green" : "gray"
                  }}>
                    {Number(item.status_publish) === 1 ? "Published" : "Draft"}
                  </span>

                </div>

                <p style={{
                  marginTop: 10,
                  color: "#444",
                  lineHeight: "1.5"
                }}>
                  {item.isi_testimoni}
                </p>

                <p style={{
                  fontSize: "12px",
                  color: "gray"
                }}>
                  {item.tanggal}
                </p>

                <div style={{ marginTop: 15 }}>

                  <button
                    onClick={() => updateStatus(item.id_testimoni, item.status_publish)}
                    style={{
                      background: Number(item.status_publish) === 1 ? "#7f8c8d" : "#2ecc71",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    {Number(item.status_publish) === 1
                      ? "✖ Batal Publish"
                      : "✔ Publish"}
                  </button>

                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTestimoni;