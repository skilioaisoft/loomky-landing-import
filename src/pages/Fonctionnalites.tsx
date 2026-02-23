import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fonctionnalites.css';

const Fonctionnalites: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDemo = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setLoading(false);
    navigate('/contact');
  };

  const categories = [
    {
      title: 'Opérations',
      icon: 'settings',
      color: '#6C5CE7',
      bg: '#EDE9FE',
      features: [
        'Synchronisation multi-plateformes',
        'Check-in & check-out automatisés',
        'Planification ménages intelligente',
        'Coordination prestataires',
        'Clés connectées & accès',
        'Checklists terrain & preuves photo',
      ],
    },
    {
      title: 'Intelligence Artificielle',
      icon: 'smart_toy',
      color: '#7C3AED',
      bg: '#F3E8FF',
      features: [
        'Réponses voyageurs automatiques',
        'Génération de site web IA',
        'Anticipation des incidents',
        'Optimisation tarifaire',
        'Suggestions business',
        'Traduction multilingue',
      ],
    },
    {
      title: 'Revenus',
      icon: 'payments',
      color: '#F97316',
      bg: '#FFF7ED',
      features: [
        'Réservations directes',
        'Pricing dynamique',
        'Upsells automatisés',
        'Boutique digitale',
        'Réactivation clients',
        'Split paiement Stripe',
      ],
    },
    {
      title: 'Expérience voyageur',
      icon: 'luggage',
      color: '#F43F5E',
      bg: '#FFF1F2',
      features: [
        'Check-in autonome',
        'Livret d\'accueil digital',
        'Assistance IA 24/7',
        'Recommandations locales',
        'Services additionnels',
        'Collecte d\'avis',
      ],
    },
    {
      title: 'Scale & Multi-sites',
      icon: 'expand',
      color: '#3B82F6',
      bg: '#EFF6FF',
      features: [
        'Process automatisés',
        'Pilotage multi-sites',
        'Dashboards temps réel',
        'Gestion multi-équipes',
        'Reporting investisseurs',
        'API ouverte',
      ],
    },
    {
      title: 'Propriétaires',
      icon: 'handshake',
      color: '#10B981',
      bg: '#ECFDF5',
      features: [
        'Dashboard dédié',
        'Reporting financier auto',
        'Revenus temps réel',
        'Suivi opérations',
        'Split paiement',
        'Alertes personnalisées',
      ],
    },
  ];

  return (
    <div className="features-page">
      <section className="features-hero">
        <div className="container">
          <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>auto_awesome</span> Fonctionnalités</div>
          <h1>Tout ce dont vous avez besoin<br /><span className="gradient-text">pour scaler votre conciergerie</span></h1>
          <p>Découvrez les 7 piliers Loomky, une plateforme complète pensée pour l'excellence opérationnelle.</p>
        </div>
      </section>

      <section className="features-grid-section">
        <div className="container">
          <div className="features-categories">
            {categories.map((cat, i) => (
              <div key={i} className="feature-category">
                <div className="feature-category__header">
                  <div className="feature-category__icon" style={{ background: cat.bg }}>
                    <span className="material-icons" style={{ color: cat.color }}>{cat.icon}</span>
                  </div>
                  <h3>{cat.title}</h3>
                </div>
                <ul className="feature-category__list">
                  {cat.features.map((f, j) => (
                    <li key={j}>
                      <span className="material-icons" style={{ fontSize: '18px', color: cat.color }}>check</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-image">
        <div className="container">
          <img src="/assets/images/loomky-hero.jpg" alt="Plateforme Loomky complète" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', width: '100%' }} />
        </div>
      </section>

      <section className="features-cta">
        <div className="container">
          <h2>Prêt à découvrir Loomky<br /><span className="gradient-text">en action ?</span></h2>
          <button className="btn btn--white btn--lg" onClick={handleDemo} disabled={loading}>
            {loading ? <span className="spinner" style={{ borderTopColor: 'var(--primary)' }}></span> : (<><span className="material-icons" style={{ fontSize: '20px' }}>play_circle</span> Demander une démo</>)}
          </button>
          <p style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '12px' }}>Sans engagement • Résultats concrets</p>
        </div>
      </section>
    </div>
  );
};

export default Fonctionnalites;
