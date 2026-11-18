import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h4 className="footer-brand-title">Branding stuff</h4>
          <p className="footer-text">
            Premium aircraft marketplace connecting airlines and operators
            with the best commercial jets worldwide.
          </p>
        </div>
        <div className="footer-logo-center">
          <div className="footer-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>
        <div className="footer-socials">
          <a href="#" className="social social-fb" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" className="social social-tw" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
          </a>
          <a href="#" className="social social-in" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="#" className="social social-gl" aria-label="Google">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 11h8.5c.1-.5.2-1 .2-1.6 0-4.4-3-7.4-7.3-7.4C8.2 2 4.5 5.7 4.5 11s3.7 9 8.9 9c4.4 0 7.3-2.6 7.3-6.4 0-.4 0-.8-.1-1.2H12v-1.4z"/></svg>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>2026 SkyFleet © All rights reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
