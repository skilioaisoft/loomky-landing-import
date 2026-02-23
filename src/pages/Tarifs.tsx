import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tarifs.css';

interface Plan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
  icon: string;
}

const Tarifs: React.FC = () => {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePlanClick = async (planName: string) => {
    setLoadingPlan(planName);
    await new Promise(r => setTimeout(r, 500));
    setLoadingPlan(null);
    navigate('/contact');
  };

  const plans: Plan[] = [
    {
      name: 'Starter',
      price: '49€',
      period: '/mois',
      desc: 'Idéal pour débuter. Jusqu\'à 10 biens.',
      icon: 'rocket_launch',
      features: [
        'Synchronisation multi-plateformes',
        'Check-in/out automatisés',
        'Messagerie IA basique',
        'Gestion des ménages',
        'Dashboard propriétaire',
        'Support email',
      ],
      cta: 'Commencer',
    },
    {
      name: 'Pro',
      price: '99€',
      period: '/mois',
      desc: 'Pour les conciergeries en croissance. Jusqu\'à 50 biens.',
      icon: 'star',
      popular: true,
      features: [
        'Tout Starter, plus :',
        'IA avancée (réponses + pricing)',
        'Site web IA généré',
        'Split paiement Stripe',
        'Upsells automatisés',
        'Reporting propriétaires',
        'Intégrations serrures',
        'Support prioritaire',
      ],
      cta: 'Choisir Pro',
    },
    {
      name: 'Scale',
      price: '199€',
      period: '/mois',
      desc: 'Pour les conciergeries qui scalent. Biens illimités.',
      icon: 'workspace_premium',
      features: [
        'Tout Pro, plus :',
        'Biens illimités',
        'Multi-sites & multi-équipes',
        'API personnalisée',
        'Account manager dédié',
        'Onboarding VIP',
        'SLA garanti',
        'Support premium 7j/7',
      ],
      cta: 'Contacter l\'équipe',
    },
  ];

  return (
    <div className="tarifs-page">
      <section className="tarifs-hero">
        <div className="container">
          <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>payments</span> Tarifs</div>
          <h1>Des tarifs simples et<br /><span className="gradient-text">transparents</span></h1>
          <p>Pas de frais cachés. Pas de surprises. Juste la puissance Loomky.</p>
        </div>
      </section>

      <section className="tarifs-plans">
        <div className="container">
          <div className="tarifs-plans__grid">
            {plans.map((plan) => (
              <div key={plan.name} className={`plan-card ${plan.popular ? 'plan-card--popular' : ''}`}>
                {plan.popular && <div className="plan-card__badge">Le plus populaire</div>}
                <div className="plan-card__icon" style={{ background: plan.popular ? 'var(--primary)' : 'var(--primary-ultra-light)' }}>
                  <span className="material-icons" style={{ fontSize: '28px', color: plan.popular ? 'white' : 'var(--primary)' }}>{plan.icon}</span>
                </div>
                <h3>{plan.name}</h3>
                <div className="plan-card__price">
                  <span className="plan-card__amount">{plan.price}</span>
                  <span className="plan-card__period">{plan.period}</span>
                </div>
                <p className="plan-card__desc">{plan.desc}</p>
                <ul className="plan-card__features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <span className="material-icons" style={{ fontSize: '18px', color: 'var(--secondary)' }}>check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn ${plan.popular ? 'btn--primary' : 'btn--outline'} plan-card__btn`}
                  onClick={() => handlePlanClick(plan.name)}
                  disabled={loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name ? <span className="spinner"></span> : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tarifs-faq">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Questions <span className="gradient-text">fréquentes</span></h2>
          <div className="faq-grid">
            {[
              { q: 'Puis-je changer de plan à tout moment ?', a: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement est immédiat.' },
              { q: 'Y a-t-il une période d\'essai ?', a: 'Nous proposons une démo personnalisée gratuite de 30 minutes. Aucun engagement requis.' },
              { q: 'Les mises à jour sont-elles incluses ?', a: 'Absolument. Toutes les nouvelles fonctionnalités et mises à jour sont incluses dans votre abonnement.' },
              { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Carte bancaire via Stripe. Virement bancaire pour les plans annuels Scale.' },
            ].map((faq, i) => (
              <div key={i} className="faq-card">
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarifs;
