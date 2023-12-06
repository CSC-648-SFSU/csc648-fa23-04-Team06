import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./hotels.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import Newsletter from "../../components/newsletter/Newsletter";
import ImgLondon from "../../assets/london.png";
import ImgBali from "../../assets/bali.png";
import ImgParis from "../../assets/paris.png";
import ImageColumnDescription from "../../components/imageColumnDescription/imageColumnDescription";

const PopularDestinationData = [
  // This ImageColumnDescription Component is suitable for upto 12 columns,
  // please don't add more than 12 objects in the array.

  {
    src: ImgLondon,
    alt: "London, United Kingdom",
    title: "London, United Kingdom  🇬🇧",
    description:
      "London, a modern metropolis steeped in tradition, offers a dynamic tapestry of experiences—historic landmarks like the Tower of London, green spaces like Hyde Park, and a cultural mosaic seen in its museums, theaters, and markets.",
    button: "Fly to London ->",
    url: "/flights",
  },
  {
    src: ImgParis,
    alt: "Paris, France",
    title: "Paris, France 🇫🇷",
    description:
      "Paris, the City of Light, exudes romance and culture along the Seine River. Iconic landmarks like the Eiffel Tower and Louvre Museum define its skyline. Charming neighborhoods, exquisite cuisine, and a rich artistic heritage make Paris a global treasure.",
    button: "Fly to Paris ->",
    url: "/flights",
  },
  {
    src: ImgBali,
    alt: "Bali, Indonesia",
    title: "Bali, Indonesia 🇮🇩",
    description:
      "Bali, the Island of the Gods, is a tropical haven where lush rice terraces, ancient temples like Uluwatu, and beachside charm in Seminyak converge, inviting visitors to explore a unique blend of spirituality and natural beauty.",
    button: "Fly to Bali ->",
    url: "/flights",
  },
];

const hotels = () => {
  return (
    <>
      <Navbar />
      <Header header={"Hotels"} subHeader={"Soon, you'll be able to book hotels directly through DestiGo!"} />
      <ImageColumnDescription
        heading="Popular Destinations"
        column={PopularDestinationData}
      />
      <Newsletter/>
      <Footer />
      
    </>
  );
};

export default hotels;
