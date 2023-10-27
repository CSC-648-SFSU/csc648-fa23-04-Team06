import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./hotels.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";

const hotels = () => {
  return (
    <>
      <Navbar />
      <Header header={"Hotels"} />
      <Footer />
    </>
  );
};

export default hotels;
