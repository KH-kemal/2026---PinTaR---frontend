import type { Peminjaman, Ruangan, RuanganTersediaResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

// Peminjaman API
export const peminjamanApi = {
  getAll: async (): Promise<Peminjaman[]> => {
    const response = await fetch(`${API_BASE_URL}/peminjaman`);
    return response.json();
  },

  getById: async (id: number): Promise<Peminjaman> => {
    const response = await fetch(`${API_BASE_URL}/peminjaman/${id}`);
    return response.json();
  },

  search: async (keyword: string): Promise<Peminjaman[]> => {
    const response = await fetch(`${API_BASE_URL}/peminjaman/search?keyword=${keyword}`);
    return response.json();
  },

  create: async (data: Omit<Peminjaman, 'id'>): Promise<Peminjaman> => {
    const response = await fetch(`${API_BASE_URL}/peminjaman`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: Partial<Peminjaman>): Promise<Peminjaman> => {
    const response = await fetch(`${API_BASE_URL}/peminjaman/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_BASE_URL}/peminjaman/${id}`, {
      method: 'DELETE',
    });
  },
};

// Ruangan API
export const ruanganApi = {
  getAll: async (): Promise<Ruangan[]> => {
    const response = await fetch(`${API_BASE_URL}/ruangan`);
    return response.json();
  },

  getById: async (id: number): Promise<Ruangan> => {
    const response = await fetch(`${API_BASE_URL}/ruangan/${id}`);
    return response.json();
  },

  getTersedia: async (tanggalPinjam: string, tanggalSelesai: string): Promise<RuanganTersediaResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/ruangan/tersedia?tanggalPinjam=${tanggalPinjam}&tanggalSelesai=${tanggalSelesai}`
    );
    return response.json();
  },

  create: async (data: Omit<Ruangan, 'id'>): Promise<Ruangan> => {
    const response = await fetch(`${API_BASE_URL}/ruangan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: Partial<Ruangan>): Promise<Ruangan> => {
    const response = await fetch(`${API_BASE_URL}/ruangan/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_BASE_URL}/ruangan/${id}`, {
      method: 'DELETE',
    });
  },
};
