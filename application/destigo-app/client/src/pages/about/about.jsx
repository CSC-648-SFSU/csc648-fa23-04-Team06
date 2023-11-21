import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./about.css";
import Footer from "../../components/footer/Footer";
import ImageColumnDescription from "../../components/imageColumnDescription/imageColumnDescription";
import ImgBear from "../../assets/AboutPageImages/bear.png";
import ImgFox from "../../assets/AboutPageImages/fox.png";
import ImgProgrammer from "../../assets/AboutPageImages/programmer.png";
import ImgRaceCar from "../../assets/AboutPageImages/racecar.png";
import ImgSkull from "../../assets/AboutPageImages/skull.png";
import ImgSnowman from "../../assets/AboutPageImages/snowman.png";
import TitleDescription from "../../components/title-and-description/titleDescription";
import ExploreImg from "../../assets/home-explore.png"

const about = () => {
  const TeamDataLead = [
    {
      src: ImgFox,
      title: "Sahej Tuli",
      description: "Project & Team Lead",
      button: "Learn More ->",
      url: "https://csc648-fa23-04-team06.vercel.app/sahej",
    },
    {
      src: ImgSkull,
      title: "Ray Dela Cruz",
      description: "Front-End Lead",
      button: "Learn More ->",
      url: "https://csc648-fa23-04-team06.vercel.app/ray",
    },
    {
      src: ImgProgrammer,
      title: "Ryan Tong",
      description: "Back-End Lead",
      button: "Learn More ->",
      url: "https://csc648-fa23-04-team06.vercel.app/ryan",
    },
    {
      src: ImgSnowman,
      title: "Faheemah Shaikh",
      description: "Scrum Master",
      button: "Learn More ->",
      url: "https://csc648-fa23-04-team06.vercel.app/faheemah",
    },
    {
      src: ImgRaceCar,
      title: "Navjot Singh",
      description: "Git Master",
      button: "Learn More ->",
      url: "https://csc648-fa23-04-team06.vercel.app/navjot",
    },
    {
      src: ImgBear,
      title: "Jessica Christine Rosero",
      description: "Full-Stack Developer",
      button: "Learn More ->",
      url: "https://csc648-fa23-04-team06.vercel.app/jessica",
    },
  ];

  return (
    <>
      <Navbar />
      <TitleDescription
        imageSrc={ExploreImg}
        title={"What is DestiGo?"}
        description={
          "“DestiGo” is a revolutionary one-stop travel app that transforms the way travelers plan and experience their journeys. With “DestiGo”, users have access to an all-in-one platform that seamlessly integrates hotels, flights, events, and everything in between. Our app utilizes cutting-edge technology to offer personalized trip planning, real-time travel updates, and local insights, all in a single, user-friendly interface. As the travel industry evolves, “DestiGo” aims to be the ultimate companion for travelers, simplifying the booking process and enhancing the travel experience, whether for leisure or business. Travel with ease, all in one place—Travel with “DestiGo”."
        }
      />
      <ImageColumnDescription
        heading="The DestiGo Team"
        column={TeamDataLead}
        backgroundColor="#fcf2f2"
      />
      <Footer />
    </>
  );
};

export default about;
