import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Beranda', icon: '🏠' },
    { to: '/peminjaman', label: 'Peminjaman', icon: '📋' },
    { to: '/ruangan', label: 'Ruangan', icon: '🚪' },
    { to: '/cari-ruang', label: 'Cari Ruang', icon: '🔍' },
  ];

  return (
    <div className="app-layout">
      <nav className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">🏫</span>
            <div className="logo-text">
              <span className="logo-name">PinTaR</span>
              <span className="logo-sub">Peminjaman Ruangan</span>
            </div>
          </Link>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link ${isActive(to) ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-icon">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 PinTaR &mdash; Sistem Peminjaman Ruangan Terintegrasi</p>
      </footer>
    </div>
  );
}
