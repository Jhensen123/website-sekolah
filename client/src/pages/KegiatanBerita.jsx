import React from 'react';

const KegiatanBerita = () => {
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

        {/* CARD 1 */}
        <div style={{
          width: '300px',
          background: 'white',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1588072432836-e10032774350"
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            alt=""
          />

          <div style={{ padding: '15px' }}>
            <span style={{
              fontSize: '12px',
              color: 'gray'
            }}>
              12 Oktober 2026
            </span>

            <h4 style={{ margin: '10px 0' }}>
              Kegiatan ANBK Siswa
            </h4>

            <p style={{ fontSize: '14px' }}>
              Siswa mengikuti kegiatan ANBK sebagai bagian dari evaluasi pendidikan nasional.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div style={{
          width: '300px',
          background: 'white',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1601933470928-c9c3e0b19b0b"
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            alt=""
          />

          <div style={{ padding: '15px' }}>
            <span style={{
              fontSize: '12px',
              color: 'gray'
            }}>
              5 Oktober 2026
            </span>

            <h4 style={{ margin: '10px 0' }}>
              Lomba Sekolah Sehat
            </h4>

            <p style={{ fontSize: '14px' }}>
              Sekolah mengikuti lomba kebersihan dan kesehatan lingkungan antar sekolah.
            </p>
          </div>
        </div>

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

        {/* BERITA 1 */}
        <div style={{
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
            10 Oktober 2026
          </span>

          <h4 style={{ margin: '10px 0' }}>
            Siswa Raih Juara Cerdas Cermat
          </h4>

          <p style={{ fontSize: '14px' }}>
            Siswa SD Negeri 103 Manado berhasil meraih juara dalam lomba cerdas cermat tingkat kota.
          </p>
        </div>

        {/* BERITA 2 */}
        <div style={{
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
            8 Oktober 2026
          </span>

          <h4 style={{ margin: '10px 0' }}>
            Pembukaan PPDB 2026
          </h4>

          <p style={{ fontSize: '14px' }}>
            Sekolah membuka pendaftaran siswa baru untuk tahun ajaran 2026/2027.
          </p>
        </div>

      </div>

    </div>
  );
};

export default KegiatanBerita;