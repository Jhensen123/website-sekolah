import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // =====================
  // 🔒 CEK LOGIN (FIX)
  // =====================
  useEffect(() => {
    const isLogin = localStorage.getItem("adminLogin");

    if (!isLogin) {
      navigate("/admin"); // 🔥 FIX ROUTE
    }
  }, [navigate]);

  // =====================
  // 🔥 ACTIVE MENU
  // =====================
  const isActive = (path) => location.pathname === path;

  const menuItem = (path) => ({
    padding: '12px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '5px',
    background: isActive(path) ? '#1976d2' : 'transparent'
  });

  // =====================
  // 🔥 LOGOUT
  // =====================
  const logout = () => {
    localStorage.removeItem("adminLogin");
    localStorage.removeItem("adminData");

    navigate("/admin");
  };

  return (
    <div style={{ display: 'flex' }}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h3>SD NEGERI 103 MANADO</h3>

        <div onClick={() => navigate('/admin/dashboard')} style={menuItem('/admin/dashboard')}>
          🏠 Dashboard
        </div>

        <div onClick={() => navigate('/admin/profil')} style={menuItem('/admin/profil')}>
          📄 Profil Sekolah
        </div>

        <div onClick={() => navigate('/admin/berita')} style={menuItem('/admin/berita')}>
          📰 Manajemen Berita
        </div>

        <div onClick={() => navigate('/admin/kegiatan')} style={menuItem('/admin/kegiatan')}>
          📅 Manajemen Kegiatan
        </div>

        <div onClick={() => navigate('/admin/galeri')} style={menuItem('/admin/galeri')}>
          🖼️ Pengelolaan Galeri
        </div>

        <div onClick={() => navigate('/admin/penerimaan')} style={menuItem('/admin/penerimaan')}>
          🧑‍🎓 Penerimaan Siswa Baru
        </div>

        <div onClick={() => navigate('/admin/komentar')} style={menuItem('/admin/komentar')}>
          💬 Komentar & Saran
        </div>

        <div onClick={() => navigate('/admin/testimoni')} style={menuItem('/admin/testimoni')}>
          ⭐ Testimoni
        </div>

        {/* 🔥 LOGOUT */}
        <div 
          onClick={logout}
          style={logoutStyle}
        >
          🚪 Logout
        </div>

      </div>

      {/* CONTENT */}
      <div style={content}>
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;

/* ================= STYLE ================= */

const sidebar = {
  width: '250px',
  background: '#2f4f88',
  color: 'white',
  minHeight: '100vh',
  padding: '20px'
};

const content = {
  flex: 1,
  background: '#f5f5f5',
  padding: '20px'
};

const logoutStyle = {
  marginTop: '20px',
  padding: '12px',
  borderRadius: '5px',
  background: '#e74c3c',
  cursor: 'pointer'
};