import React from 'react';
import { useNavigate } from 'react-router-dom';

const PPDB = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{
        background: '#2f6fb3',
        padding: '25px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0 }}>
          Penerimaan Peserta Didik Baru
        </h2>
      </div>

      <div style={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        {/* INFO BOX */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>

          <div style={box}>
            📅 <br />
            <strong>Pendaftaran Dibuka</strong><br />
            Juli 2026
          </div>

          <div style={box}>
            📢 <br />
            <strong>Pengumuman Hasil</strong><br />
            Juli 2026
          </div>

        </div>

        {/* SYARAT */}
        <div style={{
          width: '100%',
          maxWidth: '600px',
          background: '#dfe6ee',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '30px'
        }}>
          <h3 style={{ color: '#1976d2', marginBottom: '10px' }}>
            📌 Syarat Pendaftaran
          </h3>

          <ul style={{ lineHeight: '1.8' }}>
            <li>Fotokopi Akta Kelahiran</li>
            <li>Fotokopi Kartu Keluarga</li>
            <li>Pas Foto 3x4</li>
            <li>Surat Keterangan Lulus/Ijazah TK</li>
          </ul>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate('/ppdb/form')}
          style={{
            marginTop: '30px',
            padding: '12px 30px',
            background: '#2f6fb3',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = "0.8"}
          onMouseLeave={(e) => e.target.style.opacity = "1"}
        >
          Daftar Sekarang
        </button>

      </div>
    </div>
  );
};

const box = {
  background: 'white',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  width: '200px',
  boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
};

export default PPDB;