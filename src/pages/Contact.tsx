import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    properties: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <div className="section-badge"><span className="material-icons" style={{ fontSize: '16px' }}>email</span> Contact</div>
          <h1>Demandez votre<br /><span className="gradient-text">démo gratuite</span></h1>
          <p>30 minutes pour découvrir comment Loomky transforme votre conciergerie.</p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="contact-success">
                  <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary)' }}>check_circle</span>
                  <h3>Demande envoyée !</h3>
                  <p>Notre équipe vous contactera dans les 24h pour planifier votre démo personnalisée.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Nom complet *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Jean Dupont" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email professionnel *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jean@conciergerie.fr" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Nom de votre conciergerie</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Ma Conciergerie" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="properties">Nombre de biens gérés</label>
                    <select id="properties" name="properties" value={formData.properties} onChange={handleChange}>
                      <option value="">Sélectionner</option>
                      <option value="1-10">1 à 10 biens</option>
                      <option value="11-30">11 à 30 biens</option>
                      <option value="31-50">31 à 50 biens</option>
                      <option value="51-100">51 à 100 biens</option>
                      <option value="100+">100+ biens</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Votre message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Parlez-nous de vos besoins..."></textarea>
                  </div>
                  <button type="submit" className="btn btn--primary btn--lg contact-submit" disabled={isSubmitting}>
                    {isSubmitting ? <span className="spinner"></span> : (<><span className="material-icons" style={{ fontSize: '20px' }}>send</span> Demander ma démo gratuite</>)}
                  </button>
                  <p className="contact-form__disclaimer">Aucun engagement • Réponse sous 24h</p>
                </form>
              )}
            </div>

            <div className="contact-info">
              <div className="contact-info__card">
                <img src="/assets/images/loomky-concierge.jpg" alt="Équipe Loomky" className="contact-info__image" />
                <h3>Pourquoi demander une démo ?</h3>
                <ul>
                  <li><span className="material-icons" style={{ fontSize: '20px', color: 'var(--secondary)' }}>check_circle</span> Découverte personnalisée de la plateforme</li>
                  <li><span className="material-icons" style={{ fontSize: '20px', color: 'var(--secondary)' }}>check_circle</span> Évaluation gratuite de vos besoins</li>
                  <li><span className="material-icons" style={{ fontSize: '20px', color: 'var(--secondary)' }}>check_circle</span> Estimation de vos gains de temps</li>
                  <li><span className="material-icons" style={{ fontSize: '20px', color: 'var(--secondary)' }}>check_circle</span> Projection de vos revenus optimisés</li>
                  <li><span className="material-icons" style={{ fontSize: '20px', color: 'var(--secondary)' }}>check_circle</span> Plan d'action pour votre croissance</li>
                </ul>
              </div>
              <div className="contact-info__details">
                <div className="contact-detail">
                  <span className="material-icons" style={{ color: 'var(--primary)' }}>email</span>
                  <span>contact@loomky.com</span>
                </div>
                <div className="contact-detail">
                  <span className="material-icons" style={{ color: 'var(--primary)' }}>phone</span>
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="contact-detail">
                  <span className="material-icons" style={{ color: 'var(--primary)' }}>location_on</span>
                  <span>Paris, France</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
