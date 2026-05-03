import React from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 HANDLE SCROLL + NAVIGATE
  const handleScroll = (id) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  // 🔥 STYLE ACTIVE MENU
  const isActive = (path) => location.pathname === path;

  return (
    <div style={container}>

      {/* LOGO */}
      <div style={logoWrapper}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Tut_Wuri_Handayani.png"
          style={{ height: '50px' }}
          alt="logo"
        />
        <div>
          <h2 style={{ margin: 0 }}>SD NEGERI 103 MANADO</h2>
          <p style={{ margin: 0, fontSize: '12px' }}>
            Membangun generasi unggul
          </p>
        </div>
      </div>

      {/* MENU */}
      <div style={menu}>
        
        <Button onClick={() => handleScroll('home')} color="inherit">Home</Button>

        <Button onClick={() => handleScroll('profil')} color="inherit">
          Profil
        </Button>

        <Button onClick={() => handleScroll('kegiatanBerita')} color="inherit">
          Kegiatan & Berita
        </Button>

        <Button onClick={() => handleScroll('galeri')} color="inherit">
          Galeri
        </Button>

        {/* 🔥 PPDB */}
        <Button
          onClick={() => navigate('/ppdb')}
          color="inherit"
          style={{
            borderBottom: isActive('/ppdb') ? '2px solid white' : 'none'
          }}
        >
          PPDB
        </Button>

        <Button onClick={() => handleScroll('komentar')} color="inherit">
          Komentar
        </Button>

        <Button onClick={() => handleScroll('testimoni')} color="inherit">
          Testimoni
        </Button>

      </div>
    </div>
  );
};

export default Navbar;

/* ================= STYLE ================= */

const container = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  background: '#1976d2',
  color: 'white',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const logoWrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const menu = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap'
};