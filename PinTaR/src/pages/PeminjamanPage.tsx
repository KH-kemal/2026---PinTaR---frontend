import { useState, useEffect } from 'react';
import { peminjamanApi, ruanganApi } from '../services/api';
import type { Peminjaman, Ruangan } from '../types';
import './PeminjamanPage.css';

export default function PeminjamanPage() {
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
  const [ruangan, setRuangan] = useState<Ruangan[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    namaPeminjam: '',
    nrp: '',
    namaRuangan: '',
    tanggalPinjam: '',
    tanggalSelesai: '',
    keperluan: '',
  });

  useEffect(() => {
    loadData();
    loadRuangan();
  }, []);

  const loadData = async () => {
    try {
      const data = await peminjamanApi.getAll();
      setPeminjaman(data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadRuangan = async () => {
    try {
      const data = await ruanganApi.getAll();
      setRuangan(data);
    } catch (error) {
      console.error('Error loading ruangan:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId) {
        await peminjamanApi.update(editId, { ...form, status: 'Menunggu' });
        setEditId(null);
      } else {
        await peminjamanApi.create({ ...form, status: 'Menunggu' });
      }

      setForm({
        namaPeminjam: '',
        nrp: '',
        namaRuangan: '',
        tanggalPinjam: '',
        tanggalSelesai: '',
        keperluan: '',
      });

      loadData();
      alert(editId ? 'Peminjaman berhasil diupdate!' : 'Peminjaman berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Gagal menyimpan data');
    }
  };

  const handleEdit = (item: Peminjaman) => {
    setForm({
      namaPeminjam: item.namaPeminjam,
      nrp: item.nrp,
      namaRuangan: item.namaRuangan,
      tanggalPinjam: item.tanggalPinjam.split('T')[0],
      tanggalSelesai: item.tanggalSelesai.split('T')[0],
      keperluan: item.keperluan,
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;

    try {
      await peminjamanApi.delete(id);
      loadData();
      alert('Data berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data');
    }
  };

  const handleSearch = async () => {
    if (searchKeyword.trim()) {
      try {
        const data = await peminjamanApi.search(searchKeyword);
        setPeminjaman(data);
      } catch (error) {
        console.error('Error searching:', error);
      }
    } else {
      loadData();
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    const item = peminjaman.find(p => p.id === id);
    if (item) {
      try {
        await peminjamanApi.update(id, { ...item, status: newStatus });
        loadData();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  return (
    <div className="peminjaman-page">
      <div className="page-header">
        <h1>📋 Manajemen Peminjaman</h1>
        <p>Kelola semua peminjaman ruangan</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Cari nama peminjam atau ruangan..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="btn-primary">Cari</button>
          <button onClick={loadData} className="btn-secondary">Reset</button>
        </div>
      </div>

      <div className="form-section">
        <h2>{editId ? '✏️ Edit Peminjaman' : '➕ Tambah Peminjaman Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Nama Peminjam</label>
              <input
                type="text"
                required
                value={form.namaPeminjam}
                onChange={(e) => setForm({ ...form, namaPeminjam: e.target.value })}
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div className="form-group">
              <label>NRP</label>
              <input
                type="text"
                required
                value={form.nrp}
                onChange={(e) => setForm({ ...form, nrp: e.target.value })}
                placeholder="Nomor Registrasi Pokok"
              />
            </div>

            <div className="form-group">
              <label>Nama Ruangan</label>
              <select
                required
                value={form.namaRuangan}
                onChange={(e) => setForm({ ...form, namaRuangan: e.target.value })}
              >
                <option value="">-- Pilih Ruangan --</option>
                {ruangan.map((r) => (
                  <option key={r.id} value={r.namaRuangan}>
                    {r.namaRuangan} - {r.lokasi} (Kapasitas: {r.kapasitas})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Tanggal Pinjam</label>
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

            <div className="form-group full-width">
              <label>Keperluan</label>
              <textarea
                required
                value={form.keperluan}
                onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
                rows={3}
                placeholder="Jelaskan keperluan peminjaman ruangan"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-success">
              {editId ? '💾 Update' : '➕ Tambah'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({
                    namaPeminjam: '',
                    nrp: '',
                    namaRuangan: '',
                    tanggalPinjam: '',
                    tanggalSelesai: '',
                    keperluan: '',
                  });
                }}
                className="btn-cancel"
              >
                ❌ Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-section">
        <h2>📊 Daftar Peminjaman</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>NRP</th>
                <th>Ruangan</th>
                <th>Tanggal Pinjam</th>
                <th>Tanggal Selesai</th>
                <th>Keperluan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {peminjaman.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '30px' }}>
                    📭 Belum ada data peminjaman
                  </td>
                </tr>
              ) : (
                peminjaman.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.namaPeminjam}</td>
                    <td>{item.nrp}</td>
                    <td>{item.namaRuangan}</td>
                    <td>{new Date(item.tanggalPinjam).toLocaleDateString('id-ID')}</td>
                    <td>{new Date(item.tanggalSelesai).toLocaleDateString('id-ID')}</td>
                    <td>{item.keperluan}</td>
                    <td>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`status-badge ${item.status.toLowerCase()}`}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Disetujui">Disetujui</option>
                        <option value="Ditolak">Ditolak</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(item)} className="btn-edit">
                          ✏️ Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="btn-delete">
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
