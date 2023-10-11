import React from 'react';
import Navbar from '../components/navbar/navbar.js';
import IntroVideo from '../videos/intro.mp4';
import DescriptionBackgroundImage from '../images/descriptionBG.webp';
import '../styles/index.scss'; 


export default function App() {
  return (
    <div>
      <Navbar />
      <div className='intro'>
        <video autoPlay loop muted className='video-background'>
          <source src={IntroVideo} type='video/mp4' />
        </video>
        <div className='video-overlay'>
        <h4>WELCOME TO</h4>

          <h1>DESTIGO</h1>
          <h3> Travel with ease, all in one place.</h3>
        </div>
      </div>
      <div className='description'>
        <img className='descriptionBG' src={DescriptionBackgroundImage} alt="descriptionBG"/>
        
        <div className='description-text'>
          <b className='title'>WHAT IS DESTIGO?</b>

          <p className='word-description'>
            "DestiGo" is a revolutionary one-stop travel app that transforms 
            the way travelers plan and experience their journeys. With “DestiGo”, 
            users have access to an all-in-one platform that seamlessly integrates 
            hotels, flights, events, and everything in between. Our app utilizes cutting-edge 
            technology to offer personalized trip planning, real-time travel updates, 
            and local insights, all in a single, user-friendly interface. As the travel 
            industry evolves, “DestiGo” aims to be the ultimate companion for travelers, 
            simplifying the booking process and enhancing the travel experience, whether 
            for leisure or business. Travel with ease, all in one place—Travel with “DestiGo”.
          </p>
        </div>
      </div>
      <div className='airline-partners'></div>
      <div className='hotels-partners'></div>
      <div className='event-partners'></div>
    </div>
  );
}
