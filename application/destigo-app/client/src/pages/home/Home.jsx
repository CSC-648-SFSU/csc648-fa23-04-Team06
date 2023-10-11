import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import IntroVideo from "../../videos/intro.mp4";
import "./Home.css"
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="intro">
        <video autoPlay loop muted className="video-background">
          <source src={IntroVideo} type="video/mp4" />
        </video>
        <div className="video-overlay">
          <h4>WELCOME TO</h4>
          <br/><br/>

          <h1>DestiGo.</h1>
          <h3> Travel with ease, all in one place.</h3>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home