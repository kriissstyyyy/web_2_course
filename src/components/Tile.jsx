import React from 'react';
import './Tile.css';

function Tile({ image, title, description }) {
  return (
    <article className="tile">
      <div className="tile-img-wrap">
        <img src={image} alt={title} className="tile-img" />
      </div>
      <div className="tile-content">
        <h3 className="tile-title">{title}</h3>
        <p className="tile-desc">{description}</p>
      </div>
    </article>
  );
}

export default Tile;
