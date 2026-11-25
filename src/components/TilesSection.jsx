import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tile from './Tile';
import PrimaryButton from './PrimaryButton';
import { useItems } from '../context/ItemsContext';
import './TilesSection.css';

function TilesSection() {
  const { items } = useItems();
  const [visibleCount, setVisibleCount] = useState(3);
  const [showExtra, setShowExtra] = useState(false);

  const visibleItems = items.slice(0, visibleCount);

  const handleViewMore = () => {
    if (visibleCount < items.length) {
      setVisibleCount((prev) => Math.min(prev + 3, items.length));
    }
    setShowExtra(true);
  };

  return (
    <section className="tiles-section">
      <div className="tiles-grid">
        {visibleItems.map((item) => (
          <Link key={item.id} to={`/item/${item.id}`} className="tile-link">
            <Tile
              image={item.image}
              title={item.name}
              description={item.description}
            />
          </Link>
        ))}
      </div>

      {showExtra && (
        <div className="extra-content">
          <h3 className="extra-title">Why choose SkyFleet?</h3>
          <p className="extra-text">
            We offer a carefully curated selection of commercial aircraft from leading manufacturers.
            Every model in our catalog is verified for performance, efficiency and reliability.
            Whether you need a regional jet or a long-haul wide-body, SkyFleet helps you find the right aircraft for your fleet.
          </p>
        </div>
      )}

      <div className="tiles-action">
        <PrimaryButton onClick={handleViewMore}>View more</PrimaryButton>
      </div>
    </section>
  );
}

export default TilesSection;
