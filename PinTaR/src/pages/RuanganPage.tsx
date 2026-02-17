import { useState, useEffect } from 'react';
import { ruanganApi } from '../services/api';
import type { Ruangan } from '../types';
import './RuanganPage.css';

export default function RuanganPage() {
  const [ruangan, setRuangan] = useState<Ruangan[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await ruanganApi.getAll();
      setRuangan(data);
    } catch (error) {
      console.error('Error loading ruangan:', error);
    }
  };

  return (
    <div className="ruangan-page">
      <div className="page-header">
        <h1>🚪 Daftar Ruangan</h1>
        <p>Informasi lengkap ruangan yang tersedia</p>
      </div>

      <div className="ruangan-grid">
        {ruangan.length === 0 ? (
          <div className="no-data">
            📭 Belum ada data ruangan
          </div>
        ) : (
          ruangan.map((item) => (
            <div key={item.id} className="ruangan-card">
              <div className="card-header">
                <h2>{item.namaRuangan}</h2>
                <span className={`badge ${item.isAktif ? 'badge-active' : 'badge-inactive'}`}>
                  {item.isAktif ? '✓ Aktif' : '✗ Tidak Aktif'}
                </span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <span className="icon">📍</span>
                  <div>
                    <strong>Lokasi</strong>
                    <p>{item.lokasi}</p>
                  </div>
                </div>

                <div className="info-row">
                  <span className="icon">👥</span>
                  <div>
                    <strong>Kapasitas</strong>
                    <p>{item.kapasitas} orang</p>
                  </div>
                </div>

                <div className="info-row">
                  <span className="icon">🛠️</span>
                  <div>
                    <strong>Fasilitas</strong>
                    <p>{item.fasilitas || 'Tidak ada informasi fasilitas'}</p>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <span className="room-id">ID: {item.id}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="info-banner">
        <div className="banner-content">
          <h3>💡 Informasi</h3>
          <p>
            Untuk melihat ketersediaan ruangan berdasarkan tanggal tertentu,
            gunakan fitur <strong>"Cari Ruang Kosong"</strong> di menu navigasi.
          </p>
        </div>
      </div>
    </div>
  );
}
