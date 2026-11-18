import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrimaryButton from '../components/PrimaryButton';
import { useItems } from '../context/ItemsContext';
import './ItemPage.css';

function ItemPage() {
  const { id } = useParams();
  const { getItemById } = useItems();
  const item = getItemById(id);

  if (!item) {
    return (
      <div className="item-page">
        <Header />
        <main className="item-main">
          <p className="item-not-found">Item not found</p>
          <Link to="/catalog">
            <PrimaryButton>Back to Catalog</PrimaryButton>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="item-page">
      <Header />
      <main className="item-main">
        <Link to="/catalog" className="item-back">← Back to Catalog</Link>
        <div className="item-layout">
          <div className="item-gallery">
            <img src={item.image} alt={item.name} className="item-image" />
          </div>
          <div className="item-info">
            <span className="item-type">{item.type}</span>
            <h1 className="item-title">{item.name}</h1>
            <p className="item-description">{item.description}</p>
            <div className="item-specs">
              <div className="spec">
                <span className="spec-label">Passengers</span>
                <span className="spec-value">{item.passengers}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Fuel volume</span>
                <span className="spec-value">{item.fuelVolume.toLocaleString()} L</span>
              </div>
              <div className="spec">
                <span className="spec-label">Type</span>
                <span className="spec-value">{item.type}</span>
              </div>
            </div>
            <div className="item-actions">
              <PrimaryButton>Add to cart</PrimaryButton>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ItemPage;
