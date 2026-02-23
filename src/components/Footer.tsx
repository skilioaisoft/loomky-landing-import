import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">
                <span className="material-icons" style={{ fontSize: '24px', color: 'white' }}>apartment</span>
              </div>
              <span className="footer__logo-text">LOOMKY</span>
            </Link>
            <p className="footer__desc">
              L'OS intelligent des conciergeries qui scalent. Une seule plateforme pour tout piloter.
            </p>
            <div className="footer__rating">
              <div className="footer__stars">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="material-icons" style={{ fontSize: '16px', color: '#FFD700' }}>star</span>
                ))}
              </div>
              <span>4.97/5 sur Trustpilot</span>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Plateforme</h4>
            <ul className="footer__col-list">
              <li><Link to="/fonctionnalites">Fonctionnalités</Link></li>
              <li><Link to="/tarifs">Tarifs</Link></li>
              <li><Link to="/proprietaires">Propriétaires</Link></li>
              <li><a href="#integrations">Intégrations</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Entreprise</h4>
            <ul className="footer__col-list">
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Carrières</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Presse</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Légal</h4>
            <ul className="footer__col-list">
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">CGU</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Loomky. Tous droits réservés.</p>
          <div className="footer__socials">
            <a href="#" aria-label="LinkedIn"><span className="material-icons">groups</span></a>
            <a href="#" aria-label="Twitter"><span className="material-icons">tag</span></a>
            <a href="#" aria-label="Instagram"><span className="material-icons">photo_camera</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
