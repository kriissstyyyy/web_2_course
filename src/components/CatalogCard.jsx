import React from 'react';
import PrimaryButton from './PrimaryButton';
import './CatalogCard.css';

function CatalogCard({ image, name, type, passengers, description }) {
  return (
    <article className="catalog-card">
      <div className="catalog-card-img-wrap">
        <img src={image} alt={name} className="catalog-card-img" />
      </div>
      <div className="catalog-card-body">
        <div className="catalog-card-meta">
          <span className="catalog-card-type">{type}</span>
          <span className="catalog-card-passengers">{passengers} pax</span>
        </div>
        <h3 className="catalog-card-title">{name}</h3>
        <p className="catalog-card-desc">{description}</p>
        <div className="catalog-card-footer">
          <PrimaryButton>Shop Now</PrimaryButton>
        </div>
      </div>
    </article>
  );
}

export default CatalogCard;
