import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        navigate("/admin/dashboard");
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>

      <div style={card}>

        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg"
          alt=""
          style={logo}
        />

        <h2>Login</h2>
        <p>Selamat datang di SD Negeri 103 Manado</p>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
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

/* ===== STYLE (BALIK KE FIGMA) ===== */

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