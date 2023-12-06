import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./flights.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import ImageColumnDescription from "../../components/imageColumnDescription/imageColumnDescription";
import ImgDelta from "../../assets/delta.png";
import ImgEtihad from "../../assets/etihad.png";
import ImgEmirates from "../../assets/emirates.png";
import Newsletter from "../../components/newsletter/Newsletter";

const AirlinePartnersData = [
  {
    src: ImgEtihad,
    alt: "Etihad Airways",
    title: "Etihad Airways",
    description:
      "Etihad Airways is the national airline of the United Arab Emirates, renowned for its luxurious travel experience and top-notch service.",
    button: "Explore Etihad ->",
    url: "/flights",
  },
  {
    src: ImgDelta,
    alt: "Delta Airlines",
    title: "Delta Airlines",
    description:
      "Delta Airlines is one of the major American airlines known for its extensive domestic and international flight network. ",
    button: "Explore Delta ->",
    url: "/flights",
  },
  {
    src: ImgEmirates,
    alt: "Emirates",
    title: "Emirates",
    description:
      "Emirates is a premier airline based in Dubai, United Arab Emirates, and is considered one of the largest and most influential carriers globally. ",
    button: "Explore Emirates ->",
    url: "/flights",
  },
];

const flights = () => {
  return (
    <>
      <Navbar />

      {/* Calling the header component */}
      <Header header={"Flights"} subHeader={"Soon, you'll be able to book flights directly through DestiGo!"} />
      <ImageColumnDescription
        heading="Our Airline Partners"
        column={AirlinePartnersData}
        backgroundColor="#fcf2f2"
      />
      <Newsletter/>
      <Footer />
    </>
  );
};

export default flights;
