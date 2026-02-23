import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

/* ───── Intersection Observer Hook ───── */
const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

/* ───── Animated Counter ───── */
const Counter: React.FC<{ end: number; suffix?: string; prefix?: string; duration?: number }> = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useInView(0.5);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

/* ───── Section Wrapper ───── */
const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string; bg?: string }> = ({ children, className = '', id, bg }) => {
  const { ref, isVisible } = useInView();
  return (
    <section ref={ref} id={id} className={`home-section ${className} ${isVisible ? 'section-visible' : ''}`} style={bg ? { background: bg } : undefined}>
      {children}
    </section>
  );
};

/* ═══════════════════════════ HOME ═══════════════════════════ */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [demoLoading, setDemoLoading] = useState(false);
  const [siteLoading, setSiteLoading] = useState(false);

  const handleDemo = async () => {
    setDemoLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setDemoLoading(false);
    navigate('/contact');
  };
  const handleSite = async () => {
    setSiteLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setSiteLoading(false);
    navigate('/fonctionnalites');
  };

  /* partners */
  const partners = ['Airbnb', 'Booking.com', 'Vrbo', 'Abritel', 'Expedia', 'Google'];

  return (
    <div className="home">
      {/* ──────── HERO ──────── */}
      <section className="hero">
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape--1"></div>
          <div className="hero__shape hero__shape--2"></div>
          <div className="hero__shape hero__shape--3"></div>
        </div>
        <div className="container hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="material-icons" style={{ fontSize: '16px' }}>auto_awesome</span>
              Plateforme IA — Location Courte Durée
            </div>
            <h1 className="hero__title">
              <span className="gradient-text">LOOMKY</span>
              <br />
              L'OS Intelligent des Conciergeries qui Scalent
            </h1>
            <p className="hero__subtitle">
              Pilotez votre croissance. Sans surcharge. Sans chaos.<br />
              <strong>Gagnez 15h par semaine</strong>, éliminez les doubles réservations et offrez une expérience 5★ à tous vos voyageurs.
            </p>
            <p className="hero__sub-text">
              Une seule plateforme pour tout piloter : <em>Synchronisation, IA, finances, voyageurs, équipes.</em>
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary btn--lg" onClick={handleDemo} disabled={demoLoading}>
                {demoLoading ? <span className="spinner"></span> : (
                  <><span className="material-icons" style={{ fontSize: '20px' }}>play_circle</span> Voir la démo express</>)}
              </button>
              <button className="btn btn--secondary btn--lg" onClick={handleSite} disabled={siteLoading}>
                {siteLoading ? <span className="spinner"></span> : (
                  <><span className="material-icons" style={{ fontSize: '20px' }}>rocket_launch</span> Créer mon site IA en 5 min</>)}
              </button>
            </div>
            <div className="hero__trust">
              <div className="hero__trust-item">
                <span className="material-icons" style={{ fontSize: '18px', color: 'var(--secondary)' }}>verified</span>
                Rejoignez <strong>+2 000</strong> professionnels
              </div>
              <div className="hero__trust-divider">•</div>
              <div className="hero__trust-item">
                <span className="hero__trust-stars">
                  {[1,2,3,4,5].map(i => <span key={i} className="material-icons" style={{ fontSize: '14px', color: '#FFD700' }}>star</span>)}
                </span>
                <strong>4,97/5</strong> sur Trustpilot
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-wrapper">
              <img src="/assets/images/loomky-hero.jpg" alt="Dashboard Loomky - gestion conciergerie intelligente" className="hero__image" />
              <div className="hero__float-card hero__float-card--1">
                <span className="material-icons" style={{ fontSize: '20px', color: 'var(--secondary)' }}>trending_up</span>
                <div><strong>+28%</strong><br /><small>Revenus</small></div>
              </div>
              <div className="hero__float-card hero__float-card--2">
                <span className="material-icons" style={{ fontSize: '20px', color: '#FFD700' }}>star</span>
                <div><strong>5.0</strong><br /><small>Rating</small></div>
              </div>
            </div>
          </div>
        </div>
        {/* Partners */}
        <div className="hero__partners">
          <div className="container">
            <p className="hero__partners-label">Ils nous font confiance</p>
            <div className="hero__partners-logos">
              {partners.map(p => (
                <div key={p} className="hero__partner-logo">{p}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────── PROPRIETAIRES ──────── */}
      <Section className="owners" id="owners">
        <div className="container owners__container">
          <div className="owners__content">
            <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>person</span> Propriétaires & Investisseurs</div>
            <h2 className="owners__title">Vous êtes propriétaire ?<br /><span className="gradient-text">Reprenez le contrôle</span> de votre location saisonnière.</h2>
            <p className="owners__desc">Gérez votre bien en toute autonomie avec un outil pro. Automatisez les check-in/out, synchronisez vos calendriers, et optimisez vos prix.</p>
            <p className="owners__highlight">
              <span className="material-icons" style={{ fontSize: '20px', color: 'var(--secondary)' }}>check_circle</span>
              Profitez de revenus locatifs sans la charge mentale.
            </p>
            <button className="btn btn--primary" onClick={() => navigate('/proprietaires')}>
              <span className="material-icons" style={{ fontSize: '18px' }}>arrow_forward</span>
              Découvrir Loomky pour les propriétaires
            </button>
          </div>
          <div className="owners__visual">
            <img src="/assets/images/loomky-dashboard.jpg" alt="Dashboard propriétaire Loomky" className="owners__image" />
          </div>
        </div>
      </Section>

      {/* ──────── STATS BANNER ──────── */}
      <section className="stats-banner">
        <div className="container stats-banner__container">
          <div className="stat-item">
            <div className="stat-item__number"><Counter end={15} prefix="+" suffix="h" /><span>/sem</span></div>
            <div className="stat-item__label">gagnées</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-item__number"><Counter end={35} prefix="+" suffix="%" /></div>
            <div className="stat-item__label">de revenus en moyenne</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-item__number"><Counter end={40} prefix="+" suffix="%" /></div>
            <div className="stat-item__label">d'avis 5★ en moyenne</div>
          </div>
        </div>
      </section>

      {/* ──────── PAIN POINTS ──────── */}
      <Section className="pain" id="pain">
        <div className="container">
          <div className="section-badge section-badge--red"><span className="material-icons" style={{ fontSize: '16px' }}>warning</span> Le constat</div>
          <h2 className="section-title">Le quotidien d'une conciergerie<br /><span className="gradient-text">qui grandit trop vite</span></h2>
          <div className="pain__grid">
            {[
              { icon: 'sync_problem', text: '12 calendriers à synchroniser manuellement' },
              { icon: 'chat_bubble', text: 'Messages voyageurs à 23h, les week-ends et jours fériés' },
              { icon: 'cleaning_services', text: 'Ménages oubliés, prestataires injoignables' },
              { icon: 'account_balance_wallet', text: 'Finances éclatées dans 5 outils différents' },
              { icon: 'sentiment_dissatisfied', text: 'Propriétaires anxieux qui réclament des comptes' },
              { icon: 'block', text: 'Zéro temps pour prospecter et signer de nouveaux biens' },
            ].map((item, i) => (
              <div key={i} className="pain__card">
                <span className="material-icons pain__card-icon">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="pain__result">
            <span className="material-icons" style={{ fontSize: '24px', color: '#ef4444' }}>error</span>
            <p><strong>Résultat :</strong> surcharge mentale, erreurs coûteuses, croissance bloquée, fatigue chronique.<br /><em>Ça vous parle ?</em></p>
          </div>
        </div>
      </Section>

      {/* ──────── SOLUTION ──────── */}
      <Section className="solution" id="solution">
        <div className="container">
          <div className="section-badge section-badge--green"><span className="material-icons" style={{ fontSize: '16px' }}>auto_awesome</span> La solution</div>
          <h2 className="section-title">LOOMKY : Passez du mode survie<br /><span className="gradient-text">au pilotage automatique</span></h2>
          <p className="section-subtitle">Loomky orchestre toute votre activité locative grâce à une <strong>IA métier</strong> entraînée exclusivement pour la location courte durée.</p>
          <div className="solution__highlights">
            <div className="solution__highlight">
              <span className="material-icons">hub</span>
              <span>Une seule plateforme</span>
            </div>
            <div className="solution__highlight">
              <span className="material-icons">speed</span>
              <span>Zéro friction</span>
            </div>
            <div className="solution__highlight">
              <span className="material-icons">trending_up</span>
              <span>Croissance sans limite</span>
            </div>
          </div>
          <div className="solution__cta-line">
            <span className="material-icons" style={{ color: 'var(--primary)' }}>arrow_forward</span>
            <strong>Vous pilotez. Loomky exécute.</strong>
          </div>
        </div>
      </Section>

      {/* ──────── 7 PILLARS ──────── */}
      <Section className="pillars" id="pillars">
        <div className="container">
          <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>view_module</span> Les 7 Piliers</div>
          <h2 className="section-title">LES 7 PILIERS LOOMKY<br /><span className="gradient-text">Une plateforme pensée pour scaler sans douleur</span></h2>

          {/* GROUP 1 — OPS + IA */}
          <div className="pillar-group">
            <div className="pillar-group__header">
              <span className="pillar-group__number">1</span>
              <div>
                <h3>LE MOTEUR OPÉRATIONS + IA</h3>
                <p>La puissance d'exécution</p>
              </div>
            </div>
            <div className="pillar-group__cards">
              <div className="pillar-card pillar-card--ops">
                <div className="pillar-card__icon-wrap"><span className="material-icons">settings</span></div>
                <h4>OPS — Excellence opérationnelle</h4>
                <p className="pillar-card__sub">Tout s'exécute automatiquement, sans friction.</p>
                <ul className="pillar-card__list">
                  <li><span className="material-icons">check</span> Synchronisation multi-plateformes en temps réel</li>
                  <li><span className="material-icons">check</span> Check-in & check-out automatisés</li>
                  <li><span className="material-icons">check</span> Planification intelligente des ménages</li>
                  <li><span className="material-icons">check</span> Coordination des prestataires</li>
                  <li><span className="material-icons">check</span> Clés connectées & accès sécurisés</li>
                  <li><span className="material-icons">check</span> Checklists terrain & preuves photo</li>
                </ul>
                <div className="pillar-card__badge"><span className="material-icons" style={{ fontSize: '16px' }}>verified</span> Zéro oubli. Zéro stress. Zéro chaos.</div>
              </div>
              <div className="pillar-card pillar-card--ai">
                <div className="pillar-card__icon-wrap pillar-card__icon-wrap--purple"><span className="material-icons">smart_toy</span></div>
                <h4>IA — Votre copilote 24/7</h4>
                <p className="pillar-card__sub">Une IA métier entraînée exclusivement pour la LCD.</p>
                <ul className="pillar-card__list">
                  <li><span className="material-icons">check</span> Réponses voyageurs automatiques</li>
                  <li><span className="material-icons">check</span> Génération de votre site web professionnel</li>
                  <li><span className="material-icons">check</span> Anticipation des incidents</li>
                  <li><span className="material-icons">check</span> Optimisation tarifaire intelligente</li>
                  <li><span className="material-icons">check</span> Suggestions business en temps réel</li>
                </ul>
                <div className="pillar-card__badge pillar-card__badge--purple"><span className="material-icons" style={{ fontSize: '16px' }}>auto_awesome</span> Remplace 2 à 5 postes humains.</div>
              </div>
            </div>
          </div>

          {/* GROUP 2 — REVENUS + SCALE */}
          <div className="pillar-group">
            <div className="pillar-group__header">
              <span className="pillar-group__number">2</span>
              <div>
                <h3>LA CROISSANCE</h3>
                <p>Revenus + Scale : la machine à performer</p>
              </div>
            </div>
            <div className="pillar-group__cards">
              <div className="pillar-card pillar-card--revenue">
                <div className="pillar-card__icon-wrap pillar-card__icon-wrap--orange"><span className="material-icons">payments</span></div>
                <h4>REVENUS — Maximisation du CA</h4>
                <p className="pillar-card__sub">Chaque nuit doit rapporter plus.</p>
                <ul className="pillar-card__list">
                  <li><span className="material-icons">check</span> Réservations directes via votre site IA</li>
                  <li><span className="material-icons">check</span> Pricing dynamique intelligent</li>
                  <li><span className="material-icons">check</span> Upsells automatisés</li>
                  <li><span className="material-icons">check</span> Boutique digitale intégrée</li>
                  <li><span className="material-icons">check</span> Réactivation clients automatique</li>
                </ul>
                <div className="pillar-card__badge pillar-card__badge--orange"><span className="material-icons" style={{ fontSize: '16px' }}>trending_up</span> +20 à +35% de chiffre d'affaires en moyenne.</div>
              </div>
              <div className="pillar-card pillar-card--scale">
                <div className="pillar-card__icon-wrap pillar-card__icon-wrap--blue"><span className="material-icons">expand</span></div>
                <h4>SCALE — Croissance sans recruter</h4>
                <p className="pillar-card__sub">Passez de 20 à 200 biens sans multiplier les équipes.</p>
                <ul className="pillar-card__list">
                  <li><span className="material-icons">check</span> Process entièrement automatisés</li>
                  <li><span className="material-icons">check</span> Pilotage multi-sites centralisé</li>
                  <li><span className="material-icons">check</span> Dashboards de contrôle en temps réel</li>
                  <li><span className="material-icons">check</span> Gestion multi-équipes</li>
                  <li><span className="material-icons">check</span> Reporting investisseurs & propriétaires</li>
                </ul>
                <div className="pillar-card__badge pillar-card__badge--blue"><span className="material-icons" style={{ fontSize: '16px' }}>rocket_launch</span> Croissance rentable, structurée et sereine.</div>
              </div>
            </div>
          </div>

          {/* GROUP 3 — VOYAGEUR + PROPRIÉTAIRE */}
          <div className="pillar-group">
            <div className="pillar-group__header">
              <span className="pillar-group__number">3</span>
              <div>
                <h3>L'ÉCOSYSTÈME</h3>
                <p>Voyageur + Propriétaire : la création de valeur</p>
              </div>
            </div>
            <div className="pillar-group__cards">
              <div className="pillar-card pillar-card--traveler">
                <div className="pillar-card__icon-wrap pillar-card__icon-wrap--pink"><span className="material-icons">luggage</span></div>
                <h4>VOYAGEUR — Expérience 5★ automatisée</h4>
                <p className="pillar-card__sub">Des séjours fluides qui transforment vos voyageurs en ambassadeurs.</p>
                <ul className="pillar-card__list">
                  <li><span className="material-icons">check</span> Check-in autonome sans friction</li>
                  <li><span className="material-icons">check</span> Livret d'accueil digital intelligent</li>
                  <li><span className="material-icons">check</span> Assistance IA 24/7</li>
                  <li><span className="material-icons">check</span> Recommandations locales personnalisées</li>
                  <li><span className="material-icons">check</span> Services additionnels automatisés</li>
                  <li><span className="material-icons">check</span> Suivi satisfaction & collecte d'avis</li>
                </ul>
                <div className="pillar-card__badge pillar-card__badge--pink"><span className="material-icons" style={{ fontSize: '16px' }}>star</span> +40% d'avis 5 étoiles en moyenne.</div>
              </div>
              <div className="pillar-card pillar-card--owner">
                <div className="pillar-card__icon-wrap pillar-card__icon-wrap--green"><span className="material-icons">handshake</span></div>
                <h4>PROPRIÉTAIRE — Transparence & confiance</h4>
                <p className="pillar-card__sub">Des propriétaires rassurés = plus de biens confiés.</p>
                <ul className="pillar-card__list">
                  <li><span className="material-icons">check</span> Dashboard propriétaire dédié</li>
                  <li><span className="material-icons">check</span> Reporting financier automatique</li>
                  <li><span className="material-icons">check</span> Revenus et marges en temps réel</li>
                  <li><span className="material-icons">check</span> Suivi des opérations et interventions</li>
                  <li><span className="material-icons">check</span> Split paiement automatisé</li>
                </ul>
                <div className="pillar-card__badge pillar-card__badge--green"><span className="material-icons" style={{ fontSize: '16px' }}>verified</span> Confiance. Fidélité. Croissance.</div>
              </div>
            </div>
            {/* Testimonial voyageur */}
            <div className="pillar-testimonial">
              <span className="material-icons" style={{ fontSize: '32px', color: 'var(--primary-light)' }}>format_quote</span>
              <p>« Je suis arrivée à 2h du matin, tout était prêt. Le livret m'a donné les bonnes adresses. Je reviens. »</p>
              <cite>— Sophie, voyageuse à Biarritz</cite>
            </div>
          </div>

          {/* GROUP 4 — MARQUE */}
          <div className="pillar-group">
            <div className="pillar-group__header">
              <span className="pillar-group__number">4</span>
              <div>
                <h3>LE RÉSULTAT</h3>
                <p>MARQUE : devenez la référence locale</p>
              </div>
            </div>
            <div className="pillar-group__cards pillar-group__cards--single">
              <div className="pillar-card pillar-card--brand">
                <div className="pillar-card__icon-wrap pillar-card__icon-wrap--gradient"><span className="material-icons">workspace_premium</span></div>
                <h4>MARQUE — Positionnement premium</h4>
                <p className="pillar-card__sub">Votre conciergerie devient une marque forte et désirable.</p>
                <ul className="pillar-card__list pillar-card__list--grid">
                  <li><span className="material-icons">check</span> Site web IA ultra-performant</li>
                  <li><span className="material-icons">check</span> Parcours client haut de gamme</li>
                  <li><span className="material-icons">check</span> Expérience homogène sur tous les canaux</li>
                  <li><span className="material-icons">check</span> Support premium 7j/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ──────── AI WEBSITE ──────── */}
      <Section className="ai-website" id="ai-website">
        <div className="container">
          <div className="ai-website__inner">
            <div className="ai-website__content">
              <div className="section-badge section-badge--glow"><span className="material-icons" style={{ fontSize: '16px' }}>auto_awesome</span> Section spéciale</div>
              <h2>Votre site web professionnel<br /><span className="gradient-text">en 5 minutes. Sans code.</span></h2>
              <p>L'IA Loomky génère automatiquement votre site :</p>
              <ul className="ai-website__features">
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Site vitrine aux couleurs de votre marque</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Moteur de réservation directe intégré</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> SEO local optimisé (visibilité Google)</li>
              </ul>
              <p className="ai-website__no-cost">Zéro développement • Zéro maintenance • Zéro frais cachés</p>
              <div className="ai-website__stat">
                <span className="material-icons" style={{ fontSize: '24px', color: 'var(--secondary)' }}>trending_up</span>
                <strong>+20% de réservations directes en moyenne</strong>
              </div>
              <button className="btn btn--secondary btn--lg" onClick={handleSite} disabled={siteLoading}>
                {siteLoading ? <span className="spinner"></span> : (<><span className="material-icons" style={{ fontSize: '20px' }}>rocket_launch</span> Créer mon site IA maintenant</>)}
              </button>
            </div>
            <div className="ai-website__visual">
              <img src="/assets/images/loomky-property.jpg" alt="Site web IA Loomky" className="ai-website__img" />
            </div>
          </div>
        </div>
      </Section>

      {/* ──────── STEPS ──────── */}
      <Section className="steps" id="steps">
        <div className="container">
          <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>schedule</span> Démarrage rapide</div>
          <h2 className="section-title">Gagnez 15h par semaine<br /><span className="gradient-text">en moins de 48h</span></h2>
          <div className="steps__grid">
            {[
              { num: '1', title: 'CONNECTEZ', icon: 'link', desc: 'Airbnb, Booking, Vrbo, Abritel...', sub: 'Tous vos calendriers fusionnent en un clic.' },
              { num: '2', title: 'PARAMÉTREZ', icon: 'tune', desc: 'Vos règles, vos prix, vos messages.', sub: "L'IA s'active et apprend votre fonctionnement." },
              { num: '3', title: 'PILOTEZ', icon: 'dashboard', desc: 'Un seul dashboard. Tout est synchronisé.', sub: "Vous scalez, l'IA gère le reste." },
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-card__number">{step.num}</div>
                <div className="step-card__icon"><span className="material-icons">{step.icon}</span></div>
                <h3>{step.title}</h3>
                <p className="step-card__desc">{step.desc}</p>
                <p className="step-card__sub">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ──────── PAYMENTS ──────── */}
      <Section className="payments" id="payments">
        <div className="container">
          <div className="payments__inner">
            <div className="payments__content">
              <div className="section-badge section-badge--green"><span className="material-icons" style={{ fontSize: '16px' }}>payments</span> Paiements — Split instantané</div>
              <h2>Soyez payé instantanément,<br /><span className="gradient-text">sans saisie manuelle</span></h2>
              <p>Loomky répartit automatiquement chaque paiement entre :</p>
              <div className="payments__splits">
                <div className="payments__split"><span className="material-icons" style={{ color: 'var(--primary)' }}>person</span> Propriétaire</div>
                <div className="payments__split"><span className="material-icons" style={{ color: 'var(--secondary)' }}>apartment</span> Conciergerie</div>
                <div className="payments__split"><span className="material-icons" style={{ color: 'var(--accent-orange)' }}>engineering</span> Prestataires</div>
              </div>
              <ul className="payments__features">
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Stripe Connect intégré</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Zéro erreur de calcul</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Traçabilité totale</li>
                <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Virements automatiques</li>
              </ul>
              <div className="payments__cta-line">
                <span className="material-icons" style={{ color: 'var(--primary)' }}>arrow_forward</span>
                <strong>Finies les régularisations à la main</strong>
              </div>
            </div>
            <div className="payments__visual">
              <img src="/assets/images/loomky-concierge.jpg" alt="Split paiement Loomky" className="payments__img" />
            </div>
          </div>
        </div>
      </Section>

      {/* ──────── INTEGRATIONS ──────── */}
      <Section className="integrations" id="integrations">
        <div className="container">
          <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>extension</span> Intégrations — Écosystème complet</div>
          <h2 className="section-title"><span className="gradient-text">28+ intégrations</span><br />Vous n'êtes jamais seul</h2>
          <div className="integrations__grid">
            <div className="integration-card">
              <div className="integration-card__header"><span className="material-icons">travel_explore</span> OTA</div>
              <div className="integration-card__logos">
                {['Airbnb', 'Booking', 'Abritel', 'Vrbo'].map(l => <span key={l} className="integration-card__logo">{l}</span>)}
              </div>
            </div>
            <div className="integration-card">
              <div className="integration-card__header"><span className="material-icons">lock</span> Serrures connectées</div>
              <div className="integration-card__logos">
                {['Nuki', 'Igloohome', 'TTLOCK'].map(l => <span key={l} className="integration-card__logo">{l}</span>)}
              </div>
            </div>
            <div className="integration-card">
              <div className="integration-card__header"><span className="material-icons">account_balance</span> Finance</div>
              <div className="integration-card__logos">
                {['Stripe'].map(l => <span key={l} className="integration-card__logo">{l}</span>)}
              </div>
            </div>
            <div className="integration-card">
              <div className="integration-card__header"><span className="material-icons">insights</span> Tarification dynamique</div>
              <div className="integration-card__logos">
                {['PriceLabs', 'Beyond Pricing'].map(l => <span key={l} className="integration-card__logo">{l}</span>)}
              </div>
            </div>
          </div>
          <p className="integrations__api">Et toutes les autres via notre <strong>API ouverte</strong></p>
        </div>
      </Section>

      {/* ──────── TESTIMONIALS ──────── */}
      <Section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>format_quote</span> Témoignages</div>
          <h2 className="section-title">Ils ont scalé<br /><span className="gradient-text">avec Loomky</span></h2>
          <div className="testimonials__grid">
            {[
              { quote: '15h récupérées par semaine. J\'ai signé 3 nouveaux propriétaires en 30 jours.', name: 'Marc', info: '42 logements, Lyon', image: '/assets/images/loomky-hero.jpg' },
              { quote: '+28% de CA et zéro message manqué. Mes propriétaires sont enfin sereins.', name: 'Marie', info: '35 biens, Paris', image: '/assets/images/loomky-dashboard.jpg' },
              { quote: 'Loomky est devenu indispensable à notre conciergerie. On passe de 40 à 80 biens cette année.', name: 'Thomas', info: '81 logements, Marseille', image: '/assets/images/loomky-concierge.jpg' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__image-wrap">
                  <img src={t.image} alt={t.name} className="testimonial-card__image" />
                </div>
                <div className="testimonial-card__stars">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-icons" style={{ fontSize: '16px', color: '#FFD700' }}>star</span>)}
                </div>
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <div className="testimonial-card__author">
                  <strong>{t.name}</strong>
                  <span>{t.info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ──────── FINAL CTA ──────── */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta__inner">
            <h2>Essayez Loomky<br /><span className="gradient-text">sans engagement</span></h2>
            <p className="final-cta__sub">30 minutes pour découvrir comment :</p>
            <ul className="final-cta__list">
              <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Récupérer 15h par semaine</li>
              <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Augmenter vos revenus de +25%</li>
              <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Offrir une expérience 5★ sans effort</li>
              <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Rassurer vos propriétaires</li>
              <li><span className="material-icons" style={{ color: 'var(--secondary)' }}>check_circle</span> Enfin, piloter au lieu de subir</li>
            </ul>
            <button className="btn btn--white btn--lg" onClick={handleDemo} disabled={demoLoading}>
              {demoLoading ? <span className="spinner" style={{ borderTopColor: 'var(--primary)' }}></span> : (
                <><span className="material-icons" style={{ fontSize: '20px' }}>play_circle</span> Demander une démo gratuite</>)}
            </button>
            <p className="final-cta__disclaimer">Aucune installation • Aucun engagement • Résultats concrets</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
