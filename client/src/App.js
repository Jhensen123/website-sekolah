import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

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

// =======================
// 🔥 PROTECT ADMIN ROUTE
// =======================
const ProtectedRoute = ({ children }) => {
  const isLogin = localStorage.getItem("adminLogin");

  if (!isLogin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// =======================
// 🔥 LAYOUT (NAVBAR CONTROL)
// =======================
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

// =======================
// 🔥 APP
// =======================
function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* ================= USER ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/ppdb" element={<PPDB />} />
          <Route path="/ppdb/form" element={<PPDBForm />} />
          <Route path="/ppdb/sukses" element={<PPDBSukses />} />
          <Route path="/ppdb/cek" element={<PPDBCek />} />

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ================= ADMIN PROTECTED ================= */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/profil" element={
            <ProtectedRoute>
              <AdminProfil />
            </ProtectedRoute>
          } />

          <Route path="/admin/berita" element={
            <ProtectedRoute>
              <AdminBerita />
            </ProtectedRoute>
          } />

          <Route path="/admin/kegiatan" element={
            <ProtectedRoute>
              <AdminKegiatan />
            </ProtectedRoute>
          } />

          <Route path="/admin/galeri" element={
            <ProtectedRoute>
              <AdminGaleri />
            </ProtectedRoute>
          } />

          <Route path="/admin/penerimaan" element={
            <ProtectedRoute>
              <AdminPenerimaan />
            </ProtectedRoute>
          } />

          <Route path="/admin/testimoni" element={
            <ProtectedRoute>
              <AdminTestimoni />
            </ProtectedRoute>
          } />

          <Route path="/admin/komentar" element={
            <ProtectedRoute>
              <AdminKomentar />
            </ProtectedRoute>
          } />

          {/* ================= 404 ================= */}
          <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Halaman tidak ditemukan</h2>} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;