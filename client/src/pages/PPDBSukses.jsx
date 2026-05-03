import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PPDBSukses = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const status = location.state?.status;
  const data = location.state?.data;

  // 🔥 PROTEKSI (kalau refresh / direct access)
  useEffect(() => {
    if (!status) {
      navigate("/ppdb");
    }
  }, [status, navigate]);

  if (!status) return null;

  return (
    <div style={container}>
      <div style={card}>

        {status === "success" ? (
          <>
            <h2 style={{ color: "green" }}>Pendaftaran Berhasil ✅</h2>
            <p>Data Anda telah berhasil dikirim.</p>

            <button
              style={btnPrimary}
              onClick={() => navigate("/ppdb/cek", { state: data })}
              onMouseEnter={(e) => e.target.style.opacity = "0.8"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              Cek Data
            </button>

            <button
              style={btnSecondary}
              onClick={() => navigate("/ppdb")}
            >
              Kembali ke Form
            </button>
          </>
        ) : (
          <>
            <h2 style={{ color: "red" }}>Pendaftaran Gagal ❌</h2>
            <p>Terjadi kesalahan, silakan coba lagi.</p>

            <button
              style={btnPrimary}
              onClick={() => navigate("/ppdb")}
              onMouseEnter={(e) => e.target.style.opacity = "0.8"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              Coba Lagi
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default PPDBSukses;

/* STYLE */
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f5f5f5"
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "10px",
  textAlign: "center",
  width: "400px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const btnPrimary = {
  marginTop: "15px",
  padding: "10px",
  width: "100%",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const btnSecondary = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "#ccc",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};