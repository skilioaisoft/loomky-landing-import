import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/proprietaires', label: 'Propriétaires' },
    { path: '/fonctionnalites', label: 'Fonctionnalités' },
    { path: '/tarifs', label: 'Tarifs' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleDemoClick = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));
    setIsLoading(false);
    navigate('/contact');
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <span className="material-icons" style={{ fontSize: '28px', color: 'var(--primary)' }}>apartment</span>
          </div>
          <span className="header__logo-text">LOOMKY</span>
        </Link>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`header__nav-link ${location.pathname === link.path ? 'header__nav-link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="header__cta-mobile"
            onClick={handleDemoClick}
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : (
              <>
                <span className="material-icons" style={{ fontSize: '18px' }}>play_circle</span>
                Demander une démo
              </>
            )}
          </button>
        </nav>

        <button
          className="header__cta"
          onClick={handleDemoClick}
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner"></span> : (
            <>
              <span className="material-icons" style={{ fontSize: '18px' }}>play_circle</span>
              Demander une démo
            </>
          )}
        </button>

        <button
          className="header__hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-icons" style={{ fontSize: '28px' }}>
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
      {isMenuOpen && <div className="header__overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  );
};

export default Header;
