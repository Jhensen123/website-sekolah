import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../pages/AdminLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/ppdb")
      .then(res => res.json())
      .then(res => {
        setData(res.data || []);
      })
      .catch(err => console.log(err));
  }, []);

  const total = data.length;
  const diterima = data.filter(d => d.status === "Diterima").length;
  const menunggu = data.filter(d => d.status === "Pending").length;
  const ditolak = data.filter(d => d.status === "Ditolak").length;

  return (
    <AdminLayout>
      <h2>Dashboard Admin</h2>

      {/* ================= CARD ATAS ================= */}
      <div style={topGrid}>
        <Card title="Profil Sekolah" onClick={() => navigate("/admin/profil")} />
        <Card title="Manajemen Berita" onClick={() => navigate("/admin/berita")} />
        <Card title="Manajemen Kegiatan" onClick={() => navigate("/admin/kegiatan")} />
        <Card title="Pengelolaan Galeri" onClick={() => navigate("/admin/galeri")} />
      </div>

      {/* ================= STATISTIK ================= */}
      <h3 style={{ marginTop: "30px" }}>Penerimaan Siswa Baru</h3>

      <div style={statGrid}>
        <StatCard title="Total Pendaftar" value={total} color="#5c85d6" />
        <StatCard title="Diterima" value={diterima} color="#00cc44" />
        <StatCard title="Menunggu" value={menunggu} color="#f39c12" />
        <StatCard title="Ditolak" value={ditolak} color="#e74c3c" />
      </div>

      {/* ================= TABEL ================= */}
      <h3 style={{ marginTop: "30px" }}>Data Pendaftaran Terbaru</h3>

      <table style={table}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th style={th}>Nama</th>
            <th style={th}>Tanggal</th>
            <th style={th}>Status</th>
            <th style={th}>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id_pendaftaran}>
              <td style={td}>{item.nama}</td>
              <td style={td}>{item.tanggal_daftar}</td>

              <td style={td}>
                <span style={{
                  padding: "5px 10px",
                  borderRadius: "10px",
                  color: "white",
                  background:
                    item.status === "Diterima"
                      ? "green"
                      : item.status === "Ditolak"
                      ? "red"
                      : "orange"
                }}>
                  {item.status}
                </span>
              </td>

              <td style={td}>
                <button onClick={() => updateStatus(item.id_pendaftaran, "Diterima")} style={btnHijau}>
                  ✔
                </button>
                <button onClick={() => updateStatus(item.id_pendaftaran, "Ditolak")} style={btnMerah}>
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </AdminLayout>
  );

  // 🔥 UPDATE STATUS
  function updateStatus(id, status) {
    fetch(`http://localhost:5000/api/ppdb/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(() => {
        // refresh data
        setData(prev =>
          prev.map(item =>
            item.id_pendaftaran === id ? { ...item, status } : item
          )
        );
      })
      .catch(err => console.log(err));
  }
};

export default AdminDashboard;

const topGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  marginTop: "20px"
};

const statGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  marginTop: "10px"
};

const Card = ({ title, onClick }) => (
  <div
    onClick={onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.border = "2px solid #1976d2";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.border = "2px solid #eee";
    }}
    style={card}
  >
    <h4>{title}</h4>
  </div>
);

const StatCard = ({ title, value, color }) => (
  <div style={{ ...statCard, background: color }}>
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  cursor: "pointer",
  textAlign: "center",
  fontWeight: "bold",
  border: "2px solid #eee",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  transition: "0.2s"
};

const statCard = {
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center"
};

const table = {
  width: "100%",
  marginTop: "15px",
  borderCollapse: "collapse"
};

const th = { padding: "10px" };
const td = { padding: "10px", textAlign: "center" };

const btnHijau = {
  background: "green",
  color: "white",
  border: "none",
  padding: "5px 10px",
  marginRight: "5px",
  cursor: "pointer"
};

const btnMerah = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer"
};