import React from 'react';
import Header from '../components/header';
import Card from '../components/card';
import '../styles/index.scss';

export default function App() {
  return (
    <>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Render the header component */}
      <Header headerText="CSC-648 Software Engineering" subheaderText="Section 04, Team 06" />

      {/* Create a single container for all the cards */}
      <div className="card-container">
        {/* Card 1: Sahej Tuli, Team Lead */}
        <Card
          gradient="linear-gradient(196deg, rgba(255,191,84,0.5144432773109244) 0%, rgba(255,255,255,1) 58%)"
          h1Text="🦊" 
          h2Text="Sahej Tuli" 
          h3Text="Team Lead" 
          buttonLink="/sahej" 
        />

        {/* Card 2: Ray Dela Cruz, Front-End Lead */}
        <Card
          gradient="linear-gradient(95deg, rgba(255,224,187,1) 19%, rgba(255,255,255,1) 68%)"
          h1Text="💀" 
          h2Text="Ray Dela Cruz" 
          h3Text="Front-End Lead" 
          buttonLink="/ray" 
        />

        {/* Card 3: Jessica Christine Rosero, Back-End Lead */}
        <Card
          gradient="linear-gradient(254deg, rgba(187,208,255,1) 19%, rgba(255,255,255,1) 68%)"
          h1Text="🐻‍❄️" 
          h2Text="Jessica Christine Rosero" 
          h3Text="Back-End Lead" 
          buttonLink="/jessica" 
        />

        {/* Card 4: Navjot Singh, Git Master */}
        <Card
          gradient="linear-gradient(187deg, rgba(247,187,255,1) 19%, rgba(255,255,255,1) 68%)"
          h1Text="👨🏻‍💻" 
          h2Text="Navjot Singh" 
          h3Text="Git Master"
          buttonLink="/navjot" 
        />

        {/* Card 5: Faheemah Shaikh, Scrum Master */}
        <Card
          gradient="linear-gradient(158deg, rgba(255,84,84,0.5144432773109244) 0%, rgba(255,255,255,1) 58%)"
          h1Text="⛄️" 
          h2Text="Faheemah Shaikh" 
          h3Text="Scrum Master"
          buttonLink="/faheemah" 
        />

        {/* Card 6: Ryan Tong, Full-Stack Developer */}
        <Card
          gradient="linear-gradient(230deg, rgba(187,255,197,1) 19%, rgba(255,255,255,1) 68%)"
          h1Text="👨🏻‍💻" 
          h2Text="Ryan Tong" 
          h3Text="Full-Stack Developer" 
          buttonLink="/ryan" 
        />
      </div>
    </>
  );
}
