import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Proprietaires.css';

const Proprietaires: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDemo = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setLoading(false);
    navigate('/contact');
  };

  const features = [
    { icon: 'sync', title: 'Synchronisation automatique', desc: 'Vos calendriers Airbnb, Booking, Vrbo unifiés. Zéro double réservation.' },
    { icon: 'smart_toy', title: 'Check-in/out automatisés', desc: 'Accueil automatique via serrures connectées. Fini le déplacement.' },
    { icon: 'bar_chart', title: 'Pricing dynamique', desc: 'Optimisation tarifaire basée sur l\'IA pour maximiser vos revenus.' },
    { icon: 'account_balance_wallet', title: 'Suivi financier clair', desc: 'Dashboard de revenus, charges et marges en temps réel.' },
    { icon: 'cleaning_services', title: 'Gestion des ménages', desc: 'Planification et suivi automatiques avec preuves photo.' },
    { icon: 'support_agent', title: 'Communication voyageurs', desc: 'L\'IA répond 24/7 à vos voyageurs dans leur langue.' },
  ];

  return (
    <div className="proprietaires-page">
      {/* Hero */}
      <section className="propri-hero">
        <div className="container propri-hero__container">
          <div className="propri-hero__content">
            <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>person</span> Propriétaires & Investisseurs</div>
            <h1>Reprenez le contrôle de<br /><span className="gradient-text">votre location saisonnière</span></h1>
            <p>Gérez votre bien en toute autonomie avec un outil professionnel. Plus besoin de jongler entre les plateformes.</p>
            <button className="btn btn--primary btn--lg" onClick={handleDemo} disabled={loading}>
              {loading ? <span className="spinner"></span> : (<><span className="material-icons" style={{ fontSize: '20px' }}>play_circle</span> Demander une démo</>)}
            </button>
          </div>
          <div className="propri-hero__visual">
            <img src="/assets/images/loomky-dashboard.jpg" alt="Dashboard propriétaire Loomky" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="propri-features">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Tout ce qu'il vous faut<br /><span className="gradient-text">en une seule plateforme</span></h2>
          <div className="propri-features__grid">
            {features.map((f, i) => (
              <div key={i} className="propri-feature-card">
                <div className="propri-feature-card__icon">
                  <span className="material-icons">{f.icon}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="propri-benefits">
        <div className="container">
          <div className="propri-benefits__inner">
            <div className="propri-benefits__content">
              <h2>Des revenus sans<br /><span className="gradient-text">la charge mentale</span></h2>
              <ul className="propri-benefits__list">
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Revenus optimisés grâce au pricing dynamique</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Réservations directes via votre site IA</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Reporting automatique envoyé par email</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Dashboard accessible 24/7</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Aucune compétence technique requise</li>
              </ul>
              <button className="btn btn--primary" onClick={handleDemo} disabled={loading}>
                {loading ? <span className="spinner"></span> : (<><span className="material-icons" style={{ fontSize: '18px' }}>arrow_forward</span> Commencer maintenant</>)}
              </button>
            </div>
            <div className="propri-benefits__visual">
              <img src="/assets/images/loomky-property.jpg" alt="Propriété gérée avec Loomky" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="propri-cta">
        <div className="container">
          <h2>Prêt à simplifier<br /><span className="gradient-text">votre gestion locative ?</span></h2>
          <p>30 minutes de démo suffisent pour comprendre comment Loomky transforme votre quotidien.</p>
          <button className="btn btn--white btn--lg" onClick={handleDemo} disabled={loading}>
            {loading ? <span className="spinner" style={{ borderTopColor: 'var(--primary)' }}></span> : (<><span className="material-icons" style={{ fontSize: '20px' }}>play_circle</span> Demander une démo gratuite</>)}
          </button>
          <p className="propri-cta__disclaimer">Aucune installation • Aucun engagement</p>
        </div>
      </section>
    </div>
  );
};

export default Proprietaires;
