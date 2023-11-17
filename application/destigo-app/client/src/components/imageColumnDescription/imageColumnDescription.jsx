import React from "react";
import { format } from "timeago.js";
import {MdOutlinePreview} from "react-icons/md"
import "./imageColumnDescription.css";
import { AiOutlineUser, AiTwotoneCalendar } from "react-icons/ai";

const ImageColumnDescription = ({
  heading,
  column,
  imageSrc,
  backgroundColor,
}) => {
  const imageStyle = {
    backgroundImage: `url(${imageSrc})`,
    backgroundColor: backgroundColor || "defaultColor",
  };

  return (
    <div className="image-column-description" style={imageStyle}>
      <h1 className="centered-heading">{heading}</h1>
      <div className="image-container">
        {column.map((column, index) => (
          <div className="image-item" key={index}>
            <img src={column.src} alt={column.alt} />
            <h2>{column.title}</h2>
            <div className="author-date">
              {column.author && (
                <span>
                  <AiOutlineUser />
                  {column.author}
                </span>
              )}
              {column.date && (
                <span>
                  <AiTwotoneCalendar />
                  {format(column.date)}
                </span>
              )}
              
            </div>
            <p>
              {column.description.length > 250
                ? column.description.split(" ").slice(0, 52).join(" ") + "..."
                : column.description}
            </p>{" "}
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
