export interface Peminjaman {
  id: number;
  namaPeminjam: string;
  nrp: string;
  namaRuangan: string;
  tanggalPinjam: string;
  tanggalSelesai: string;
  keperluan: string;
  status: string;
}

export interface Ruangan {
  id: number;
  namaRuangan: string;
  kapasitas: number;
  lokasi: string;
  fasilitas: string;
  isAktif: boolean;
}

export interface RuanganTersediaResponse {
  tanggalPinjam: string;
  tanggalSelesai: string;
  jumlahRuanganTersedia: number;
  ruanganTersedia: Ruangan[];
}
