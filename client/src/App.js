import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';

// USER
import Home from './pages/Home';
import PPDB from './pages/PPDB';
import PPDBForm from './pages/PPDBForm';
import PPDBSukses from "./pages/PPDBSukses";
import PPDBCek from "./pages/PPDBCek";

// ADMIN
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfil from './pages/AdminProfil';
import AdminBerita from './pages/AdminBerita';
import AdminKegiatan from './pages/AdminKegiatan';
import AdminGaleri from './pages/AdminGaleri';
import AdminPenerimaan from './pages/AdminPenerimaan';
import AdminTestimoni from "./pages/AdminTestimoni";
import AdminKomentar from "./pages/AdminKomentar";

// 🔥 Navbar hanya tampil di user, bukan admin
const Layout = ({ children }) => {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* USER */}
          <Route path="/" element={<Home />} />
          <Route path="/ppdb" element={<PPDB />} />
          <Route path="/ppdb/form" element={<PPDBForm />} />
          <Route path="/ppdb/sukses" element={<PPDBSukses />} />
          <Route path="/ppdb/cek" element={<PPDBCek />} />

          {/* 🔥 ADMIN */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profil" element={<AdminProfil />} />
          <Route path="/admin/berita" element={<AdminBerita />} />
          <Route path="/admin/kegiatan" element={<AdminKegiatan />} />
          <Route path="/admin/galeri" element={<AdminGaleri />} />
          <Route path="/admin/penerimaan" element={<AdminPenerimaan />} />
          <Route path="/admin/testimoni" element={<AdminTestimoni />} />
          <Route path="/admin/komentar" element={<AdminKomentar />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;