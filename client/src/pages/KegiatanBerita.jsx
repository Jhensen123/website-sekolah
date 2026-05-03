import React, { useEffect, useState } from 'react';

const KegiatanBerita = () => {

  const BASE_URL = "https://website-sekolah-production-8f69.up.railway.app";

  const [data, setData] = useState([]);

  // 🔥 FETCH DATA
  useEffect(() => {
    fetch(`${BASE_URL}/api/berita`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then(res => {
        const result = Array.isArray(res) ? res : (res.data || []);
        setData(result);
      })
      .catch(err => console.log(err));
  }, []);

  // 🔥 FILTER DATA
  const kegiatan = data
    .filter(item => item.kategori?.toLowerCase() === "kegiatan")
    .slice(0, 4);

  const berita = data
    .filter(item => item.kategori?.toLowerCase() === "berita")
    .slice(0, 4);

  return (
    <div style={{ padding: '60px 80px', background: '#f5f5f5' }}>

      {/* ===== KEGIATAN ===== */}
      <h2 style={{ color: '#1976d2', marginBottom: '20px' }}>
        Kegiatan Sekolah
      </h2>

      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

        {kegiatan.length === 0 ? (
          <p>Tidak ada kegiatan</p>
        ) : (
          kegiatan.map(item => (
            <div key={item.id_konten} style={{
              width: '300px',
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>

              <img 
                src={
                  item.gambar
                    ? `${BASE_URL}/uploads/${item.gambar}`
                    : "/images/bg1.jpeg"
                }
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                alt=""
              />

              <div style={{ padding: '15px' }}>
                <span style={{ fontSize: '12px', color: 'gray' }}>
                  {item.tanggal
                    ? item.tanggal.split("T")[0].split("-").reverse().join("/")
                    : "-"}
                </span>

                <h4 style={{ margin: '10px 0' }}>
                  {item.judul}
                </h4>

                <p style={{ fontSize: '14px' }}>
                  {(item.isi || "").length > 100
                    ? item.isi.substring(0, 100) + "..."
                    : item.isi}
                </p>
              </div>
            </div>
          ))
        )}

      </div>

      {/* ===== BERITA ===== */}
      <h2 style={{
        color: '#1976d2',
        marginTop: '60px',
        marginBottom: '20px'
      }}>
        Berita Terbaru
      </h2>

      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

        {berita.length === 0 ? (
          <p>Tidak ada berita</p>
        ) : (
          berita.map(item => (
            <div key={item.id_konten} style={{
              width: '300px',
              background: 'white',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>

              <span style={{
                background: '#1976d2',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '10px',
                fontSize: '12px'
              }}>
                {item.tanggal
                  ? item.tanggal.split("T")[0].split("-").reverse().join("/")
                  : "-"}
              </span>

              <h4 style={{ margin: '10px 0' }}>
                {item.judul}
              </h4>

              <p style={{ fontSize: '14px' }}>
                {(item.isi || "").length > 100
                  ? item.isi.substring(0, 100) + "..."
                  : item.isi}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default KegiatanBerita;