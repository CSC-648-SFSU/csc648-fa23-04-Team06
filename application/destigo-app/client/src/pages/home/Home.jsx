import React from "react";
import Navbar from "../../components/navbar/Navbar";
import IntroVideo from "../../videos/intro.mp4";
import ImageColumnDescription from "../../components/imageColumnDescription/imageColumnDescription";
import "./Home.css";
import Footer from "../../components/footer/Footer";
import VideoOverlay from "../../components/video-overlay/video-overlay";
import TitleDescription from "../../components/title-and-description/titleDescription";
import ExploreImg from "../../assets/home-explore.png";
import ImgLondon from "../../assets/london.png";
import ImgBali from "../../assets/bali.png";
import ImgParis from "../../assets/paris.png";
import ImgDelta from "../../assets/delta.png";
import ImgEtihad from "../../assets/etihad.png";
import ImgEmirates from "../../assets/emirates.png";
import Newsletter from "../../components/newsletter/Newsletter";


const Home = () => {
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
    }
  ];

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
        description={
          "“DestiGo” is a revolutionary one-stop travel app that transforms the way travelers plan and experience their journeys. With “DestiGo”, users have access to an all-in-one platform that seamlessly integrates hotels, flights, events, and everything in between. Our app utilizes cutting-edge technology to offer personalized trip planning, real-time travel updates, and local insights, all in a single, user-friendly interface. As the travel industry evolves, “DestiGo” aims to be the ultimate companion for travelers, simplifying the booking process and enhancing the travel experience, whether for leisure or business. Travel with ease, all in one place—Travel with “DestiGo”."
        }
      />
      <ImageColumnDescription
        heading="Popular Destinations"
        column={PopularDestinationData}
        
      />

      <ImageColumnDescription
        heading="Our Airline Partners"
        column={AirlinePartnersData}
        backgroundColor="#fcf2f2"
      />
      <Newsletter />

      <Footer />
    </>
  );
};

export default Home;
