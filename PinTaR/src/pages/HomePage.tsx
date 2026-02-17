import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { peminjamanApi, ruanganApi } from '../services/api';
import './HomePage.css';

export default function HomePage() {
  const [stats, setStats] = useState({
    totalPeminjaman: 0,
    totalRuangan: 0,
    menunggu: 0,
    disetujui: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const peminjaman = await peminjamanApi.getAll();
      const ruangan = await ruanganApi.getAll();

      setStats({
        totalPeminjaman: peminjaman.length,
        totalRuangan: ruangan.length,
        menunggu: peminjaman.filter(p => p.status === 'Menunggu').length,
        disetujui: peminjaman.filter(p => p.status === 'Disetujui').length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Selamat Datang di PinTaR</h1>
        <p>Sistem Peminjaman Ruangan Terintegrasi</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card card-purple">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.totalPeminjaman}</h3>
            <p>Total Peminjaman</p>
          </div>
        </div>

        <div className="stat-card card-blue">
          <div className="stat-icon">🚪</div>
          <div className="stat-info">
            <h3>{stats.totalRuangan}</h3>
            <p>Ruangan Tersedia</p>
          </div>
        </div>

        <div className="stat-card card-orange">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.menunggu}</h3>
            <p>Menunggu Persetujuan</p>
          </div>
        </div>

        <div className="stat-card card-green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.disetujui}</h3>
            <p>Disetujui</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Aksi Cepat</h2>
        <div className="action-grid">
          <Link to="/peminjaman" className="action-card">
            <span className="action-icon">📝</span>
            <h3>Tambah Peminjaman</h3>
            <p>Buat pengajuan peminjaman ruangan baru</p>
          </Link>

          <Link to="/cari-ruang" className="action-card">
            <span className="action-icon">🔍</span>
            <h3>Cari Ruang Kosong</h3>
            <p>Cek ketersediaan ruangan berdasarkan tanggal</p>
          </Link>

          <Link to="/ruangan" className="action-card">
            <span className="action-icon">🏢</span>
            <h3>Lihat Ruangan</h3>
            <p>Daftar semua ruangan dan fasilitasnya</p>
          </Link>

          <Link to="/peminjaman" className="action-card">
            <span className="action-icon">📊</span>
            <h3>Kelola Peminjaman</h3>
            <p>Lihat dan kelola semua peminjaman</p>
          </Link>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h3>🎯 Tentang PinTaR</h3>
          <p>
            PinTaR adalah sistem peminjaman ruangan yang memudahkan Anda untuk mengajukan,
            mengelola, dan memantau peminjaman ruangan secara real-time.
          </p>
        </div>

        <div className="info-card">
          <h3>⚡ Fitur Utama</h3>
          <ul>
            <li>Manajemen peminjaman ruangan yang mudah</li>
            <li>Pencarian ruangan kosong berdasarkan jadwal</li>
            <li>Tracking status peminjaman real-time</li>
            <li>Informasi lengkap fasilitas ruangan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
