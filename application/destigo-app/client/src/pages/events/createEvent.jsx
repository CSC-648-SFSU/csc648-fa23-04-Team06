import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./events.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import EventForm from "../../components/eventForm/EventForm";

const createEvent = () => {
  return (
    <>
      <Navbar />
      <Header header={"Create an Event"} />
      <EventForm/>
      <Footer />
    </>
  );
};

export default createEvent;
