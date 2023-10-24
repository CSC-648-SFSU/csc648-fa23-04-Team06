import React from "react";
import Navbar from "../../components/navbar/Navbar";
import IntroVideo from "../../videos/intro.mp4";
import "./Home.css";
import Footer from "../../components/footer/Footer";
import VideoOverlay from "../../components/video-overlay/video-overlay";
import TitleDescription from "../../components/title-and-description/titleDescription";
import ExploreImg from "../../assets/home-explore.png"

const Home = () => {
  return (
    <>
      <Navbar />
      <VideoOverlay
        videoSrc={IntroVideo}
        title="DestiGo."
        subtitle="Travel with ease, all in one place."
      />
      <TitleDescription
      imageSrc={ExploreImg}
      title={"What is DestiGo?"}
      description={"“DestiGo” is a revolutionary one-stop travel app that transforms the way travelers plan and experience their journeys. With “DestiGo”, users have access to an all-in-one platform that seamlessly integrates hotels, flights, events, and everything in between. Our app utilizes cutting-edge technology to offer personalized trip planning, real-time travel updates, and local insights, all in a single, user-friendly interface. As the travel industry evolves, “DestiGo” aims to be the ultimate companion for travelers, simplifying the booking process and enhancing the travel experience, whether for leisure or business. Travel with ease, all in one place—Travel with “DestiGo”."}
      />
      <Footer />
    </>
  );
};

export default Home;
