import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PPDBForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    asal_sekolah: "",
    alamat: "",
    nama_ayah: "",
    pekerjaan_ayah: "",
    alamat_ayah: "",
    agama_ayah: "",
    nama_ibu: "",
    pekerjaan_ibu: "",
    alamat_ibu: "",
    agama_ibu: "",
    no_hp: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!form.nama || !form.tanggal_lahir) {
      alert("Data siswa wajib diisi!");
      return false;
    }
    if (!form.no_hp || !form.email) {
      alert("Kontak wajib diisi!");
      return false;
    }
    return true;
  };

  // 🔥 HANYA GANTI handleSubmit KAMU DENGAN INI
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {
    console.log("DATA DIKIRIM:", form);

    const res = await fetch("http://localhost:5000/api/ppdb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const result = await res.json();
    console.log("RESPON:", result);

    if (res.ok) {
      navigate("/ppdb/sukses", {
        state: { status: "success", data: form }
      });
    } else {
      alert(result.message);
      navigate("/ppdb/sukses", {
        state: { status: "error" }
      });
    }

  } catch (err) {
    console.log(err);
    alert("Gagal koneksi ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={card}>

        <h2 style={title}>Pendaftaran Online</h2>

        {/* IDENTITAS */}
        <Section title="Identitas Siswa">
          <Row>
            <Input label="Nama Lengkap" name="nama" onChange={handleChange} required />
            <Input label="Tempat Lahir" name="tempat_lahir" onChange={handleChange} />
          </Row>

          <Row>
            <Input label="tanggal lahir" type="date" name="tanggal_lahir" onChange={handleChange} required />
            <Select name="jenis_kelamin" onChange={handleChange} />
          </Row>
        </Section>

        {/* ORANG TUA */}
        <Section title="Data Orang Tua">
          <Row>
            <Input label="Nama Ayah" name="nama_ayah" onChange={handleChange} />
            <Input label="Nama Ibu" name="nama_ibu" onChange={handleChange} />
          </Row>

          <Row>
            <Input label="Pekerjaan Ayah" name="pekerjaan_ayah" onChange={handleChange} />
            <Input label="Pekerjaan Ibu" name="pekerjaan_ibu" onChange={handleChange} />
          </Row>

          <Row>
            <Input label="Alamat Ayah" name="alamat_ayah" onChange={handleChange} />
            <Input label="Alamat Ibu" name="alamat_ibu" onChange={handleChange} />
          </Row>

          <Row>
            <Input label="Agama Ayah" name="agama_ayah" onChange={handleChange} />
            <Input label="Agama Ibu" name="agama_ibu" onChange={handleChange} />
          </Row>
        </Section>

        {/* SEKOLAH */}
        <Section title="Sekolah & Kontak">
          <Row>
            <Input label="Asal Sekolah" name="asal_sekolah" onChange={handleChange} />
            <Input label="No HP" name="no_hp" onChange={handleChange} required />
          </Row>

          <Input label="Email" name="email" onChange={handleChange} required />
        </Section>

        {/* UPLOAD (UI SAJA) */}
        <Section title="Upload Dokumen">
          <div style={uploadGrid}>
            <Upload label="Akta Kelahiran" />
            <Upload label="Kartu Keluarga" />
            <Upload label="Ijazah TK" />
            <Upload label="Foto 3x4" />
          </div>
        </Section>

        <button type="submit" disabled={loading} style={button}>
          {loading ? "Mengirim..." : "Kirim Pendaftaran"}
        </button>

      </form>
    </div>
  );
};

export default PPDBForm;

/* ================= COMPONENT ================= */

const Section = ({ title, children }) => (
  <div style={section}>
    <h4>{title}</h4>
    {children}
  </div>
);

const Row = ({ children }) => (
  <div style={row}>{children}</div>
);

const Input = ({ label, name, onChange, type = "text", required }) => (
  <div style={inputGroup}>
    <label>{label}</label>
    <input name={name} type={type} onChange={onChange} required={required} style={inputStyle} />
  </div>
);

const Select = ({ name, onChange }) => (
  <div style={inputGroup}>
    <label>Jenis Kelamin</label>
    <select name={name} onChange={onChange} style={inputStyle}>
      <option value="">Pilih</option>
      <option>Laki-laki</option>
      <option>Perempuan</option>
    </select>
  </div>
);

const Upload = ({ label }) => (
  <div style={{
    border: '1px dashed #aaa',
    padding: '15px',
    textAlign: 'center',
    borderRadius: '8px'
  }}>
    {label}
    <br />
    <input type="file" />
  </div>
);

/* ================= STYLE ================= */

const container = { display: 'flex', justifyContent: 'center', padding: '40px' };
const card = { width: '700px', padding: '30px', background: '#fff' };
const title = { textAlign: 'center' };
const section = { marginTop: '20px', border: '1px solid #ddd', padding: '15px' };
const row = { display: 'flex', gap: '15px' };
const inputGroup = { flex: 1, display: 'flex', flexDirection: 'column' };
const inputStyle = { padding: '8px' };
const uploadGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' };
const button = { marginTop: '20px', padding: '10px', width: '100%' };