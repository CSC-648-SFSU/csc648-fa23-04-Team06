import React from 'react';
import Navbar from '../components/navbar/navbar.js';
import IntroVideo from '../videos/intro.mp4';
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
      <div className='description'></div>
      <div className='airline-partners'></div>
      <div className='hotels-partners'></div>
      <div className='event-partners'></div>
    </div>
  );
}
