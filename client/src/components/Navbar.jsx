import React from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onAdminClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname === '/') {
      // kalau di home → langsung scroll
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // kalau di halaman lain → pindah ke home dulu
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      background: '#1976d2',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>

      {/* LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Tut_Wuri_Handayani.png"
          style={{ height: '50px' }}
          alt=""
        />
        <div>
          <h2 style={{ margin: 0 }}>SD NEGERI 103 MANADO</h2>
          <p style={{ margin: 0, fontSize: '12px' }}>
            Membangun generasi unggul
          </p>
        </div>
      </div>

      {/* MENU */}
      <div style={{ display: 'flex', gap: '10px' }}>
        
        <Button onClick={() => handleScroll('home')} color="inherit">Home</Button>
        <Button onClick={() => handleScroll('profil')} color="inherit">Profil Sekolah</Button>
        <Button onClick={() => handleScroll('kegiatanBerita')} color="inherit">Kegiatan&Berita</Button>
        <Button onClick={() => handleScroll('galeri')} color="inherit">Galeri</Button>

        {/* PPDB tetap pindah halaman */}
        <Button onClick={() => navigate('/ppdb')} color="inherit">PPDB</Button>

        <Button onClick={() => handleScroll('komentar')} color="inherit">Komentar&Saran</Button>
        <Button onClick={() => handleScroll('testimoni')} color="inherit">Testimoni</Button>

      </div>
    </div>
  );
};

export default Navbar;