import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PPDBCek = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  return (
    <div style={container}>
      <div style={card}>
        <h2>Data Pendaftaran</h2>

        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <p><b>Nama:</b> {data?.nama}</p>
          <p><b>Tempat Lahir:</b> {data?.tempat_lahir}</p>
          <p><b>Tanggal Lahir:</b> {data?.tanggal_lahir}</p>
          <p><b>Jenis Kelamin:</b> {data?.jenis_kelamin}</p>
          <p><b>Asal Sekolah:</b> {data?.asal_sekolah}</p>
          <p><b>No HP:</b> {data?.no_hp}</p>
          <p><b>Email:</b> {data?.email}</p>

          <hr />

          <p><b>Nama Ayah:</b> {data?.nama_ayah}</p>
          <p><b>Nama Ibu:</b> {data?.nama_ibu}</p>
        </div>

        <button style={btn}
          onClick={() => navigate("/")}>
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default PPDBCek;

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
  padding: "30px",
  borderRadius: "10px",
  width: "400px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const btn = {
  marginTop: "20px",
  padding: "10px",
  width: "100%",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "5px"
};