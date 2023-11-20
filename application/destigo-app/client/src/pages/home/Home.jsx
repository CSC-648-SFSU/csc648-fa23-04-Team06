import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { BASE_URL } from "../../utils/fetchApi";
import { request } from "../../utils/fetchApi";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    axios
      .get(BASE_URL + "/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  useEffect(() => {
    const fetchAndSortBlogs = async () => {
      try {
        const data = await request("/blog/getAll", "GET");

        // Sort the blogs array by createdAt in descending order
        const sortedBlogs = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndSortBlogs();
  }, []);
  
  const top3Blogs = blogs.slice(0, 3);
  const top3Events = events.slice(0, 3);

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
        heading="Latest Community Posts"
        column={top3Blogs.map((blog) => ({
          src: blog?.photo,
          alt: blog?.title,
          title: blog?.title,
          authorImg: blog?.userId.profilePicture,
          description: blog?.desc,
          author: blog?.userId.username,
          date: blog?.createdAt,
          button: "Read More ->",
          url: `/blogDetails/${blog._id}`,
        }))}
      />

      <ImageColumnDescription
        heading="Upcoming Top Events"
        backgroundColor="#fcf2f2"
        column={top3Events.map((event) => ({
          src: event.image,
          alt: event.title,
          title: event.title,
          description: event.description,
          button: "Learn More ->",
          url: "/events",
        }))}
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
