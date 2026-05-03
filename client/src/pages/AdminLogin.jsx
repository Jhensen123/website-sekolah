import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://website-sekolah-production-8f69.up.railway.app";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    if (!form.username || !form.password) {
      alert("Username dan password wajib diisi ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      if (data.success) {
        localStorage.setItem("adminLogin", "true");
        localStorage.setItem("adminData", JSON.stringify(data.data));

        alert("Login berhasil ✅");
        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Login gagal ❌");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert(err.message || "Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>

        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg"
          alt="logo"
          style={logo}
        />

        <h2 style={title}>Login Admin</h2>
        <p style={subtitle}>SD Negeri 103 Manado</p>

        <div style={inputGroup}>
          <label style={label}>Username</label>
          <input
            name="username"
            placeholder="Masukkan username"
            value={form.username}
            onChange={handleChange}
            style={input}
          />
        </div>

        <div style={inputGroup}>
          <label style={label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Masukkan password"
            value={form.password}
            onChange={handleChange}
            style={input}
          />
        </div>

        <button
          onClick={handleLogin}
          style={button}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </div>
    </div>
  );
};

export default AdminLogin;

/* ===== STYLE ===== */

const container = {
  height: '100vh',
  background: 'linear-gradient(135deg, #1976d2, #0d47a1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const card = {
  background: 'white',
  padding: '40px',
  borderRadius: '15px',
  textAlign: 'center',
  width: '360px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
};

const logo = {
  width: '70px',
  marginBottom: '10px'
};

const title = {
  margin: '10px 0 5px',
  color: '#1976d2'
};

const subtitle = {
  fontSize: '13px',
  color: 'gray',
  marginBottom: '20px'
};

const inputGroup = {
  textAlign: 'left',
  marginBottom: '15px'
};

const label = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#555'
};

const input = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  outline: 'none',
  boxSizing: 'border-box'
};

const button = {
  marginTop: '20px',
  padding: '12px',
  width: '100%',
  borderRadius: '8px',
  border: 'none',
  background: '#1976d2',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: '0.3s'
};