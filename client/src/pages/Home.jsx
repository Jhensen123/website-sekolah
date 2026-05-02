import React, { useEffect, useState } from 'react';

const Home = () => {

  const BASE_URL = "http://localhost:5000"; // 🔥 GANTI INI

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🔥 SLIDER IMAGE
  const images = [
    '/images/bg1.jpeg',
    '/images/bg2.jpeg',
    '/images/bg3.jpeg',
    '/images/bg4.jpeg',
    '/images/bg5.jpeg'
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const [komentar, setKomentar] = useState({
    nama_pengirim: "",
    isi_komentar: ""
  });

  // 🔥 GET TESTIMONI
  useEffect(() => {
    const getTestimoni = () => {
      fetch(`${BASE_URL}/api/testimoni`)
        .then(res => {
          if (!res.ok) throw new Error("Gagal ambil testimoni");
          return res.json();
        })
        .then(res => setTestimoni(res.data || res))
        .catch(err => console.log(err));
    };

    getTestimoni();
  }, []);

  const handleKomentarChange = (e) => {
    setKomentar({
      ...komentar,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 KIRIM KOMENTAR
  const handleKomentarSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/api/komentar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nama_pengirim: komentar.nama_pengirim,
        isi_komentar: komentar.isi_komentar
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal kirim komentar");
        return res.json();
      })
      .then(() => {
        alert("Komentar berhasil dikirim ✅");
        setKomentar({ nama_pengirim: "", isi_komentar: "" });
      })
      .catch(() => alert("Gagal kirim ❌"));
  };

  // 🔥 SLIDER AUTO
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 STATE
  const [testimoni, setTestimoni] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    isi_testimoni: ""
  });

  const [profil, setProfil] = useState({
    deskripsi: "",
    sejarah: "",
    logo: ""
  });

  const [konten, setKonten] = useState([]);
  const [galeri, setGaleri] = useState([]);

  const [showAllKegiatan, setShowAllKegiatan] = useState(false);
  const [showAllGaleri, setShowAllGaleri] = useState(false);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 KIRIM TESTIMONI
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/api/testimoni`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal kirim testimoni");
      })
      .then(() => {
        alert("Testimoni dikirim, menunggu persetujuan admin");
        setForm({ nama: "", isi_testimoni: "" });
      })
      .catch(() => alert("Gagal kirim"));
  };

 useEffect(() => {
  fetch(`${BASE_URL}/api/profil`)
    .then(res => res.json())
    .then(res => setProfil(res.data || res))
    .catch(err => console.log("ERROR PROFIL:", err));

  fetch(`${BASE_URL}/api/galeri`)
    .then(res => res.json())
    .then(res => setGaleri(res.data || res))
    .catch(err => console.log("ERROR GALERI:", err));

  fetch(`${BASE_URL}/api/berita`)
    .then(res => res.json())
    .then(res => setKonten(res.data || res))
    .catch(err => console.log("ERROR BERITA:", err));

}, []);

  return (
    <div>

      {/* HERO */}
      <div id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        color: 'white',
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'all 1s ease-in-out',
        position: 'relative'
      }}>

        {/* OVERLAY */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.4)'
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            SELAMAT DATANG DI SD NEGERI 103 MANADO
          </h1>

          <p style={{
            fontSize: '16px',
            maxWidth: '500px',
            marginBottom: '20px'
          }}>
            Tempat dimana karakter anak-anak dibentuk dengan ilmu Pengetahuan dan budi pekerti.
          </p>

          {/* 🔥 2 TOMBOL */}
          <div style={{ display: 'flex', gap: '15px' }}>

            <button
              onClick={() => scrollTo('ppdb')}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                background: 'white',
                color: '#1976d2',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              DAFTAR SEKARANG
            </button>

            <button
              onClick={() => scrollTo('profil')}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: '1px solid white',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Lihat Profil Kami
            </button>

          </div>
        </div>
      </div>

{/* TENTANG KAMI */}
<div id="profil" style={{
  padding: '40px 20px',
  background: 'white'
}}>
  <h2 style={{
    textAlign: 'center',
    marginBottom: '40px',
    color: '#1976d2'
  }}>
    Tentang Kami
  </h2>

  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '40px'
  }}>

    {/* DESKRIPSI (KIRI) */}
    <div style={{ flex: 1 }}>
      <p style={{
        lineHeight: '1.8',
        textAlign: 'justify'
      }}>
        {profil?.deskripsi || "Profil belum diisi"}
      </p>
    </div>

    {/* GAMBAR (KANAN) */}
    <img 
      src={
        profil.logo
        ? `${BASE_URL}/uploads/${profil.logo}?t=${new Date().getTime()}`
        : "/images/bg4.jpeg"
      }
      alt=""
      style={{
        width: '350px',
        height: '220px',
        objectFit: 'cover',
        borderRadius: '12px',
        flexShrink: 0
      }}
    />

  </div>
</div>

      {/* CTA / PPDB */}
      <div id="ppdb" style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '60px 0',
        background: '#f5f5f5'
      }}>
        <div style={{
          background: '#2f6fb3',
          width: '70%',
          padding: '30px 40px',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}> 
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Ayo bergabung dengan SD Negeri 103 Manado <br />
            Raih masa depan yang lebih cerah!
          </div>

          <button style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: '1px solid white',
            background: 'transparent',
            color: 'white',
            cursor: 'pointer'
          }}>
            Pendaftaran Online
          </button>
        </div>
      </div>

<div id="kegiatanBerita" style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '60px 0',
  background: '#f5f5f5'
}}>
  <div style={{
    width: '80%',
    maxWidth: '1000px'
  }}>

    {/* 🔥 JUDUL */}
    <h2 style={{
      textAlign: 'center',
      color: '#1976d2',
      marginBottom: '40px'
    }}>
      Kegiatan
    </h2>

    {[...konten]
    .filter(item => item.kategori?.toLowerCase().trim() === "kegiatan")
    .sort((a, b) => (b.tanggal || "").localeCompare(a.tanggal || ""))
    .slice(0, showAllKegiatan ? 
    konten.filter(item => item.kategori?.toLowerCase().trim() === "kegiatan").length 
    : 5
    )
    .map((item) => (
 <div key={item.id_konten} style={{
  display: "flex",
  gap: "20px",
  marginBottom: "30px",
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  alignItems: "center" // 🔥 TAMBAH INI
}}>

  {/* GAMBAR */}
  <img
    src={
      item.gambar
        ? `${BASE_URL}/uploads/${item.gambar}`
        : "/images/bg1.jpeg"
    }
    alt=""
    style={{
      width: "250px",        // 🔥 GANTI (JANGAN 100%)
      height: "160px",
      objectFit: "cover",
      borderRadius: "10px",
      flexShrink: 0
    }}
  />

  {/* TEXT */}
  <div style={{ flex: 1 }}>

    <p style={{
      fontSize: "12px",
      color: "gray",
      marginBottom: "8px"
    }}>
      {item.tanggal
        ? item.tanggal.split("T")[0].split("-").reverse().join("/")
        : "-"}
    </p>

    <h3 style={{ margin: "0 0 8px 0" }}>
      {item.judul}
    </h3>

    <p style={{
      fontSize: "14px",
      lineHeight: "1.6",
      color: "#555"
    }}>
      {(item.isi || "").length > 120
        ? item.isi.substring(0, 120) + "..."
        : item.isi}
    </p>

  </div>

</div>
  ))}

    {/* 🔥 BUTTON */}
  {konten.filter(item => item.kategori?.toLowerCase().trim() === "kegiatan").length > 5 && (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <button
      onClick={() => setShowAllKegiatan(!showAllKegiatan)}
      style={{
        padding: "10px 20px",
        background: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      {showAllKegiatan ? "Lihat Sedikit" : "Lihat Lebih Banyak"}
    </button>
  </div>
)}

  </div>
</div>

{/* ===== BERITA LANJUTAN ===== */}
<div style={{
  background: '#f5f5f5',
  padding: '60px 0',
  display: 'flex',
  justifyContent: 'center'
}}>

  <div style={{ width: '80%', maxWidth: '1000px' }}>

    <h3 style={{
      color: '#1976d2',
      marginBottom: '20px',
      borderBottom: '3px solid #1976d2',
      display: 'inline-block',
      paddingBottom: '5px'
    }}>
      Berita
    </h3>

    {/* CONTAINER BIRU */}
    <div style={{
      background: '#2f6fb3',
      borderRadius: '15px',
      padding: '30px',
      marginTop: '20px'
    }}>

      {/* GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px'
      }}>

        {konten
        .filter(item => item.kategori?.toLowerCase().trim() === "berita")
        .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
        .slice(0, 4)
        .map((item, index) => (
        <div key={item.id_konten || index}style={{
            background: 'white',
            padding: '15px',
            borderRadius: '10px',
            position: 'relative'
          }}>

            {/* TANGGAL */}
            <span style={{
              position: 'absolute',
              top: '-10px',
              left: '10px',
              background: '#1976d2',
              color: 'white',
              fontSize: '10px',
              padding: '3px 8px',
              borderRadius: '10px'
            }}>
              {new Date(item.tanggal + "T00:00:00").toLocaleDateString("id-ID")}
            </span>

            <h4 style={{ marginTop: '10px', color: '#1976d2' }}>
               {item.judul}
            </h4>

            <p style={{ fontSize: '13px', lineHeight: '1.5' }}>
               {item.isi}
            </p>
          </div>
        ))}

      </div>

    </div>

  </div>
</div>

{/* GALERI */}
<div id="galeri" style={{
  padding: '60px 80px',
  background: '#f5f5f5'
}}>

  <h2 style={{
    textAlign: 'center',
    color: '#1976d2',
    marginBottom: '10px'
  }}>
    Galeri Dokumentasi
  </h2>

  <p style={{
    textAlign: 'center',
    marginBottom: '40px',
    color: 'gray'
  }}>
    Momen-momen berharga siswa siswi dan para tenaga pengajar di SD Negeri 103 Manado
  </p>

  {/* GRID */}
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px'
  }}>

    {[...galeri]
      .sort((a, b) => (b.tanggal || "").localeCompare(a.tanggal || ""))
      .slice(0, showAllGaleri ? galeri.length : 6)
      .map((item) => (
      <div key={item.id_galeri} style={{
        background: 'white',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
      }}>

        <img
          src={`${BASE_URL}/uploads/${item.file_foto}`}
          alt=""
          style={{
            width: '100%',
            height: '160px', // 🔥 lebih kecil & rapi
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />

        <h3 style={{ 
          marginTop: '10px',
          fontSize: '14px'
        }}>
          {item.judul_foto}
        </h3>

        <p style={{ 
          color: 'gray', 
          fontSize: '12px',
          marginTop: '5px'
        }}>
          {item.tanggal
            ? item.tanggal.split("T")[0].split("-").reverse().join("/")
            : "-"
          }
        </p>

      </div>
    ))}

  </div>

  {/* 🔥 BUTTON */}
  {galeri.length > 6 && (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <button
        onClick={() => setShowAllGaleri(!showAllGaleri)}
        style={{
          padding: '10px 20px',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        {showAllGaleri ? "Lihat Sedikit" : "Lihat Lebih Banyak"}
      </button>
    </div>
  )}

</div>

{/* KOMENTAR & SARAN */}
<div id="komentar" style={{
  padding: '60px 20px',
  background: '#e6edf5',
  display: 'flex',
  justifyContent: 'center'
}}>

  <div style={{
    width: '100%',
    maxWidth: '800px'
  }}>

    <h2 style={{
      textAlign: 'center',
      color: '#1976d2',
      marginBottom: '10px'
    }}>
      Komentar & Saran
    </h2>

    <div style={{
      width: '80px',
      height: '4px',
      background: '#1976d2',
      margin: '10px auto 20px',
      borderRadius: '2px'
    }} />

    <p style={{
      textAlign: 'center',
      marginBottom: '40px',
      color: '#555'
    }}>
      Kami sangat menghargai masukan dari Orang Tua, Murid, dan Masyarakat
    </p>

    <form onSubmit={handleKomentarSubmit} style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    }}>

      {/* NAMA */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Nama</label>
        <input
          type="text"
          name="nama_pengirim"
          value={komentar.nama_pengirim}
          onChange={(e) => {
            setKomentar({
              ...komentar,
              nama_pengirim: e.target.value
            });
          }}
          placeholder="Masukkan nama Anda"
          required
          style={{
            boxSizing: 'border-box',
            width: '100%',
            padding: '12px',
            marginTop: '8px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none'
          }}
        />
      </div>

      {/* KOMENTAR */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Komentar / Saran</label>
        <textarea
          name="isi_komentar"
          value={komentar.isi_komentar}
          onChange={(e) => {
            setKomentar({
              ...komentar,
              isi_komentar: e.target.value
            });
          }}
          placeholder="Tuliskan saran atau komentar Anda..."
          required
          style={{
            boxSizing: 'border-box',
            width: '100%',
            padding: '12px',
            height: '120px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginTop: '8px',
            resize: 'none',
            outline: 'none'
          }}
        />
      </div>

      {/* BUTTON */}
      <button type="submit" style={{
        width: '100%',
        padding: '12px',
        background: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: '0.3s'
      }}>
        Kirim Komentar
      </button>

    </form>

  </div>
</div>

{/* TESTIMONI */}
<div id="testimoni" style={{
  padding: '60px 80px',
  background: '#f5f5f5'
}}>

  <h2 style={{
    textAlign: 'center',
    color: '#1976d2'
  }}>
    Testimoni
  </h2>

  <div style={{
    width: '100px',
    height: '3px',
    background: '#1976d2',
    margin: '10px auto 30px'
  }} />

  {/* 🔥 FORM TESTIMONI */}
  <form onSubmit={handleSubmit} style={{
    maxWidth: '600px',
    margin: '0 auto 40px',
    background: 'white',
    padding: '20px',
    borderRadius: '10px'
  }}>
    <input
      name="nama"
      placeholder="Nama"
      value={form.nama}
      onChange={handleChange}
      required
      style={{
          width: '100%',
          padding: '12px',
          height: '50px',
          marginBottom: '15px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxSizing: 'border-box' // 🔥 WAJIB
      }}
    />

    <textarea
      name="isi_testimoni"
      placeholder="Tulis testimoni..."
      value={form.isi_testimoni}
      onChange={handleChange}
      required
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '10px',
        height: '100px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        resize: 'none' // 🔥 TAMBAHKAN INI
      }}
    />

    <button type="submit" style={{
      width: '100%',
      padding: '10px',
      background: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      Kirim Testimoni
    </button>
  </form>

 {/* 🔥 DATA TESTIMONI */}
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '30px'
}}>

{(testimoni || []).map((item) => (
  <div key={item.id_testimoni} style={{
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start'
  }}>

    {/* AVATAR */}
    <div style={{
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: '#1976d2',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
      flexShrink: 0 // 🔥 WAJIB
    }}>
      {item.nama ? item.nama.charAt(0).toUpperCase() : "?"}
    </div>

    {/* TEXT */}
    <div>
      <strong>{item.nama}</strong>

      <p style={{ fontSize: '12px', color: 'gray' }}>
        {item.tanggal
          ? item.tanggal.split("T")[0].split("-").reverse().join("/")
          : "-"
        }
      </p>

      <p style={{ marginTop: '10px' }}>
        {item.isi_testimoni}
      </p>
        </div>
      </div>
      ))}
    </div>
  </div> {/* tutup section testimoni */}
</div>
  );
};

export default Home;