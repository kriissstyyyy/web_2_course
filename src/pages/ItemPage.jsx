import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrimaryButton from '../components/PrimaryButton';
import Loader from '../components/Loader';
import { getAirplaneById } from '../api/airplanesApi';
import { resolveImage } from '../utils/imageMap';
import './ItemPage.css';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAirplaneById(id);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        if (!cancelled) setItem(data);
      } catch (err) {
        if (!cancelled) {
          setError('Item not found');
          setItem(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchItem();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="item-page">
      <Header />
      <main className="item-main">
        <Link to="/catalog" className="item-back">← Back to Catalog</Link>

        {loading && <Loader />}

        {error && !loading && (
          <div>
            <p className="item-not-found">{error}</p>
            <Link to="/catalog">
              <PrimaryButton>Back to Catalog</PrimaryButton>
            </Link>
          </div>
        )}

        {!loading && item && (
          <div className="item-layout">
            <div className="item-gallery">
              <img src={resolveImage(item.image)} alt={item.name} className="item-image" />
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
                  <span className="spec-value">{Number(item.fuelVolume).toLocaleString()} L</span>
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
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ItemPage;