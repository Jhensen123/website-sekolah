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

      // 🔥 HANDLE ERROR DENGAN BENAR
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

      // 🔥 ERROR JELAS
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

        <h2>Login Admin</h2>
        <p>Selamat datang di SD Negeri 103 Manado</p>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={input}
        />

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

/* STYLE */
const container = {
  height: '100vh',
  background: '#3b5998',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const card = {
  background: '#2f5597',
  padding: '40px',
  borderRadius: '10px',
  color: 'white',
  textAlign: 'center',
  width: '350px'
};

const logo = {
  width: '80px',
  marginBottom: '10px'
};

const input = {
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  borderRadius: '5px',
  border: 'none'
};

const button = {
  marginTop: '20px',
  padding: '10px',
  width: '100%',
  borderRadius: '20px',
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  cursor: 'pointer'
};