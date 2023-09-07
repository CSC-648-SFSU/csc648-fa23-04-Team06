import React from 'react';
import '../styles/Card.scss';

export default function Card({ gradient, h1Text, h2Text, h3Text, buttonLink }) {
  const cardStyle = {
    background: gradient || 'linear-gradient(45deg, #ff6b6b, #fcd4d4)',
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-content">
        {h1Text && <h1 className="card-title">{h1Text}</h1>}
        {h2Text && <h2 className="card-subtitle">{h2Text}</h2>}
        {h3Text && <h3 className="card-para">{h3Text}</h3>}
        <a href={buttonLink || 'https://www.example.com'} className="card-button" rel="noopener noreferrer">
          Learn More ➔
        </a>
      </div>
    </div>
  );
}
