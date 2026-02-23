import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Proprietaires from './pages/Proprietaires';
import Fonctionnalites from './pages/Fonctionnalites';
import Tarifs from './pages/Tarifs';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proprietaires" element={<Proprietaires />} />
          <Route path="/fonctionnalites" element={<Fonctionnalites />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
