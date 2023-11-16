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

const about = () => {
  const TeamDataLead = [
    {
      src: ImgFox,
      title: "Sahej Tuli",
      description: "Team Lead",
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
      <ImageColumnDescription
        heading="The DestiGo Team"
        column={TeamDataLead}
        backgroundColor="#F8E8DD"
      />
      <Footer />
    </>
  );
};

export default about;
