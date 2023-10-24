import React from 'react';

const VideoOverlay = ({ videoSrc, title, subtitle }) => {
  return (
    <div className="intro">
      <video autoPlay loop muted className="video-background">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="video-overlay">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
    </div>
  );
};

export default VideoOverlay;
