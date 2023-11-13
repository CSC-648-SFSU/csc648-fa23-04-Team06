import React from 'react';
import './imageColumnDescription.css';
import { MdFlightTakeoff } from "react-icons/md";

const ImageColumnDescription = ({ heading, column, imageSrc, backgroundColor }) => {
  const imageStyle = {
    backgroundImage: `url(${imageSrc})`,
    backgroundColor: backgroundColor || 'defaultColor', // Use the provided color or a default color
  };

  return (
    <div className="image-column-description" style={imageStyle}>
      <h1 className="centered-heading">{heading}</h1>
      <div className="image-container">
        {column.map((column, index) => (
          <div className="image-item" key={index}>
            <img src={column.src} alt={column.alt} />
            <h2>{column.title}</h2>
            <p>{column.description}</p>
            <a href={column.url}>
              <button>{column.button}</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageColumnDescription;
