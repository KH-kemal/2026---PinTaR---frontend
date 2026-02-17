import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PeminjamanPage from './pages/PeminjamanPage'
import RuanganPage from './pages/RuanganPage'
import CariRuangPage from './pages/CariRuangPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="peminjaman" element={<PeminjamanPage />} />
          <Route path="ruangan" element={<RuanganPage />} />
          <Route path="cari-ruang" element={<CariRuangPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
