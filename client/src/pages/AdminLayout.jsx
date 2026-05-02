import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const menuItem = {
    padding: '12px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '5px'
  };

  return (
    <div style={{ display: 'flex' }}>

      {/* SIDEBAR */}
      <div style={{
        width: '250px',
        background: '#2f4f88',
        color: 'white',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <h3>SD NEGERI 103 MANADO</h3>

        <div onClick={() => navigate('/admin/dashboard')} style={menuItem}>🏠 Dashboard</div>
        <div onClick={() => navigate('/admin/profil')} style={menuItem}>📄 Profil Sekolah</div>
        <div onClick={() => navigate('/admin/berita')} style={menuItem}>📰 Manajemen Berita</div>
        <div onClick={() => navigate('/admin/kegiatan')} style={menuItem}>📅 Manajemen Kegiatan</div>
        <div onClick={() => navigate('/admin/galeri')} style={menuItem}>🖼️ Pengelolaan Galeri</div>
        <div onClick={() => navigate('/admin/penerimaan')} style={menuItem}>🧑‍🎓 Penerimaan Siswa Baru</div>
        <div onClick={() => navigate('/admin/komentar')} style={menuItem}>💬 Komentar & Saran</div>
        <div onClick={() => navigate('/admin/testimoni')} style={menuItem}>⭐ Testimoni</div>
      </div>

      {/* CONTENT */}
      <div style={{
        flex: 1,
        background: '#f5f5f5',
        padding: '20px'
      }}>
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;