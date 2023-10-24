import React from 'react';
import './titleDescription.css';

const TitleDescription = ({ title, description, imageSrc }) => {
  const imageStyle = {
    backgroundImage: `url(${imageSrc})`,
  };

  return (
    <div className="title-description" style={imageStyle}>
      <div className="overlay">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TitleDescription;
