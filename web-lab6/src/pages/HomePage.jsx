import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TilesSection from '../components/TilesSection';
import Footer from '../components/Footer';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <Hero />
        <TilesSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
