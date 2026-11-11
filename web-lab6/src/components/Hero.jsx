import React from 'react';
import heroImg from '../assets/hero.jpg';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image-box">
        <img src={heroImg} alt="Boeing 737" className="hero-image" />
      </div>
      <div className="hero-text">
        <h1 className="hero-title">Discover Premium Aircraft</h1>
        <p className="hero-description">
          Explore the finest commercial and regional aircraft on the market.
          From efficient narrow-body jets to long-range wide-body flagships —
          find the perfect plane for your fleet with SkyFleet.
        </p>
      </div>
    </section>
  );
}

export default Hero;
