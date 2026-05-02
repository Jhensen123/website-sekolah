import React, { useEffect, useState } from 'react';
import AdminLayout from '../pages/AdminLayout';

const AdminPenerimaan = () => {

  const BASE_URL = "http://localhost:5000";
  const [dataSiswa, setDataSiswa] = useState([]);

  // =========================
  // AMBIL DATA (FIX)
  // =========================
  useEffect(() => {
    fetch(`${BASE_URL}/api/ppdb`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch PPDB");
        return res.json();
      })
      .then(res => {
        const result = res.data || res; // 🔥 FIX UTAMA
        setDataSiswa(result);
      })
      .catch(err => console.log(err));
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = (id, status) => {
    fetch(`${BASE_URL}/api/ppdb/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal update");
      })
      .then(() => {
        setDataSiswa(prev =>
          prev.map(item =>
            item.id_pendaftaran === id
              ? { ...item, status }
              : item
          )
        );
      })
      .catch(err => console.log(err));
  };

  // =========================
  // DELETE
  // =========================
  const deleteData = (id) => {
    fetch(`${BASE_URL}/api/ppdb/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal hapus");
      })
      .then(() => {
        setDataSiswa(prev =>
          prev.filter(item => item.id_pendaftaran !== id)
        );
      })
      .catch(err => console.log(err));
  };

  // =========================
  // EDIT
  // =========================
  const editData = (item) => {
    const namaBaru = prompt("Edit Nama:", item.nama);

    if (!namaBaru) return;

    fetch(`${BASE_URL}/api/ppdb/edit/${item.id_calon_siswa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nama: namaBaru,
        asal_sekolah: item.asal_sekolah
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal edit");
      })
      .then(() => {
        setDataSiswa(prev =>
          prev.map(s =>
            s.id_calon_siswa === item.id_calon_siswa
              ? { ...s, nama: namaBaru }
              : s
          )
        );
      })
      .catch(err => console.log(err));
  };

  const getStatusColor = (status) => {
    if (status === "Diterima") return "#2ecc71";
    if (status === "Ditolak") return "#e74c3c";
    return "#f39c12";
  };

  return (
    <AdminLayout>

      <h2 style={{ marginBottom: '20px' }}>
        Penerimaan Siswa Baru
      </h2>

      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px'
      }}>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>

          <thead>
            <tr style={{ background: '#2f6fb3', color: 'white' }}>
              <th style={th}>NO</th>
              <th style={th}>Nama</th>
              <th style={th}>Tanggal Daftar</th>
              <th style={th}>Status</th>
              <th style={th}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {dataSiswa.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  Belum ada pendaftaran
                </td>
              </tr>
            ) : (
              dataSiswa.map((item, index) => (
                <tr key={item.id_pendaftaran} style={{
                  textAlign: 'center',
                  borderBottom: '1px solid #ddd'
                }}>

                  <td style={td}>{index + 1}</td>
                  <td style={td}>{item.nama}</td>
                  <td style={td}>{item.tanggal_daftar}</td>

                  <td style={td}>
                    <span style={{
                      background: getStatusColor(item.status),
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '10px'
                    }}>
                      {item.status}
                    </span>
                  </td>

                  <td style={td}>

                    <button
                      onClick={() => updateStatus(item.id_pendaftaran, "Diterima")}
                      style={btnHijau}
                    >
                      ✔
                    </button>

                    <button
                      onClick={() => updateStatus(item.id_pendaftaran, "Ditolak")}
                      style={btnMerah}
                    >
                      ✖
                    </button>

                    <button
                      onClick={() => editData(item)}
                      style={btnKuning}
                    >
                      ✏
                    </button>

                    <button
                      onClick={() => deleteData(item.id_pendaftaran)}
                      style={btnHitam}
                    >
                      🗑
                    </button>

                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

const th = { padding: '10px' };
const td = { padding: '10px' };

const btnHijau = {
  background: '#2ecc71',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  marginRight: '5px',
  cursor: 'pointer',
  color: 'white'
};

const btnMerah = {
  background: '#e74c3c',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  marginRight: '5px',
  cursor: 'pointer',
  color: 'white'
};

const btnKuning = {
  background: '#f1c40f',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  marginRight: '5px',
  cursor: 'pointer',
  color: 'white'
};

const btnHitam = {
  background: '#34495e',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  color: 'white'
};

export default AdminPenerimaan;