import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./flights.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";

const flights = () => {
  return (
    <>
      <Navbar />

      {/* Calling the header component */}
      <Header header={"Flights"} />
      
      <Footer />
    </>
  );
};

export default flights;
