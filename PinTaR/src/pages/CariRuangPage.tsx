import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ruanganApi } from '../services/api';
import type { Ruangan } from '../types';
import './CariRuangPage.css';

export default function CariRuangPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tanggalPinjam: '',
    tanggalSelesai: '',
  });
  const [ruanganTersedia, setRuanganTersedia] = useState<Ruangan[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.tanggalPinjam || !form.tanggalSelesai) {
      alert('Mohon isi kedua tanggal');
      return;
    }

    if (form.tanggalPinjam >= form.tanggalSelesai) {
      alert('Tanggal selesai harus lebih besar dari tanggal pinjam');
      return;
    }

    setIsLoading(true);
    try {
      const response = await ruanganApi.getTersedia(form.tanggalPinjam, form.tanggalSelesai);
      setRuanganTersedia(response.ruanganTersedia);
      setIsSearched(true);
    } catch (error) {
      console.error('Error searching ruangan:', error);
      alert('Gagal mencari ruangan. Pastikan backend berjalan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      tanggalPinjam: '',
      tanggalSelesai: '',
    });
    setRuanganTersedia([]);
    setIsSearched(false);
  };

  return (
    <div className="cari-ruang-page">
      <div className="page-header">
        <h1>🔍 Cari Ruang Kosong</h1>
        <p>Temukan ruangan yang tersedia berdasarkan jadwal Anda</p>
      </div>

      <div className="search-form-section">
        <h2>📅 Pilih Tanggal</h2>
        <form onSubmit={handleSearch} className="date-form">
          <div className="date-inputs">
            <div className="form-group">
              <label>Tanggal Mulai</label>
              <input
                type="date"
                required
                value={form.tanggalPinjam}
                onChange={(e) => setForm({ ...form, tanggalPinjam: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Tanggal Selesai</label>
              <input
                type="date"
                required
                value={form.tanggalSelesai}
                onChange={(e) => setForm({ ...form, tanggalSelesai: e.target.value })}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-search" disabled={isLoading}>
              {isLoading ? '⏳ Mencari...' : '🔍 Cari Ruangan Tersedia'}
            </button>
            <button type="button" onClick={handleReset} className="btn-reset">
              🔄 Reset
            </button>
          </div>
        </form>
      </div>

      {isSearched && (
        <div className="results-section">
          {ruanganTersedia.length > 0 ? (
            <>
              <div className="results-header">
                <h2>✅ Ruangan Tersedia ({ruanganTersedia.length})</h2>
                <p>
                  Periode: {new Date(form.tanggalPinjam).toLocaleDateString('id-ID')} 
                  {' - '}
                  {new Date(form.tanggalSelesai).toLocaleDateString('id-ID')}
                </p>
              </div>

              <div className="ruangan-grid">
                {ruanganTersedia.map((r) => (
                  <div key={r.id} className="ruangan-card">
                    <div className="card-icon">🚪</div>
                    <h3>{r.namaRuangan}</h3>
                    
                    <div className="card-details">
                      <div className="detail-item">
                        <span className="icon">📍</span>
                        <p>{r.lokasi}</p>
                      </div>

                      <div className="detail-item">
                        <span className="icon">👥</span>
                        <p>Kapasitas: {r.kapasitas} orang</p>
                      </div>

                      <div className="detail-item">
                        <span className="icon">🛠️</span>
                        <p>{r.fasilitas}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/peminjaman')}
                      className="btn-book"
                    >
                      📝 Ajukan Peminjaman
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">❌</div>
              <h3>Tidak Ada Ruangan Tersedia</h3>
              <p>
                Maaf, tidak ada ruangan yang tersedia pada tanggal yang Anda pilih.
                <br />
                Silakan coba tanggal lain.
              </p>
            </div>
          )}
        </div>
      )}

      {!isSearched && (
        <div className="info-section">
          <div className="info-card">
            <h3>ℹ️ Cara Menggunakan</h3>
            <ol>
              <li>Pilih tanggal mulai peminjaman</li>
              <li>Pilih tanggal selesai peminjaman</li>
              <li>Klik tombol "Cari Ruangan Tersedia"</li>
              <li>Sistem akan menampilkan ruangan yang tidak sedang dipinjam</li>
              <li>Klik "Ajukan Peminjaman" untuk melanjutkan</li>
            </ol>
          </div>

          <div className="info-card">
            <h3>💡 Tips</h3>
            <ul>
              <li>Pastikan tanggal selesai lebih besar dari tanggal mulai</li>
              <li>Ruangan yang ditampilkan dijamin kosong pada periode tersebut</li>
              <li>Ajukan peminjaman sesegera mungkin agar tidak kehabisan</li>
              <li>Cek detail fasilitas sebelum mengajukan peminjaman</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
