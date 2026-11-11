import React from 'react';
import Tile from './Tile';
import PrimaryButton from './PrimaryButton';
import plane1 from '../assets/plane1.jpg';
import plane2 from '../assets/plane2.webp';
import plane3 from '../assets/plane3.jpg';
import './TilesSection.css';

const items = [
  {
    id: 1,
    image: plane1,
    title: 'Boeing 737-8',
    description: 'The most widely used narrow-body airliner. Reliable short-to-medium haul aircraft.'
  },
  {
    id: 2,
    image: plane2,
    title: 'Boeing 737 MAX',
    description: 'Next-generation efficiency and performance with advanced engines and aerodynamics.'
  },
  {
    id: 3,
    image: plane3,
    title: 'Boeing 737',
    description: 'Iconic commercial jet with proven reliability across thousands of flights worldwide.'
  }
];

function TilesSection() {
  return (
    <section className="tiles-section">
      <div className="tiles-grid">
        {items.map((item) => (
          <Tile
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <div className="tiles-action">
        <PrimaryButton>View more</PrimaryButton>
      </div>
    </section>
  );
}

export default TilesSection;
