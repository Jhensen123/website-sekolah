import React from 'react';
import { useNavigate } from 'react-router-dom';

const PPDB = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      <div style={{
        background: '#2f6fb3',
        padding: '20px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2>Penerimaan Peserta Didik Baru</h2>
      </div>

      <div style={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        <div style={{ display: 'flex', gap: '20px' }}>

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

        <div style={{
          width: '60%',
          background: '#dfe6ee',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '30px'
        }}>
          <h3 style={{ color: '#1976d2' }}>📌 Syarat Pendaftaran</h3>

          <ul>
            <li>Fotokopi Akta Kelahiran</li>
            <li>Fotokopi Kartu Keluarga</li>
            <li>Pas Foto 3x4</li>
            <li>Surat Keterangan Lulus/Ijazah TK</li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/ppdb/form')}
          style={{
            marginTop: '30px',
            padding: '12px 30px',
            background: '#2f6fb3',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          Daftar
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
  width: '200px'
};

export default PPDB;