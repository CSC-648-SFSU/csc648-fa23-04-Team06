import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventsList.css";
import { BASE_URL } from "../../utils/fetchApi";
import {
  AiOutlineSearch,
  AiTwotoneCalendar,
  AiOutlineGlobal,
} from "react-icons/ai";
import Newsletter from "../newsletter/Newsletter";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title"); // Default search type is 'title'
  const [currentPage, setCurrentPage] = useState(1); // Default to the first page

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    axios
      .get(BASE_URL + "/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchQuery(""); // Clear search query when search type changes
    setCurrentPage(1); // Reset to the first page when the search type changes
  };

  // Filter events based on the search query and type
  const filteredEvents = events.filter((event) => {
    const query = searchQuery.toLowerCase();
    if (searchType === "title") {
      return event.title.toLowerCase().includes(query);
    } else if (searchType === "location") {
      return event.location.toLowerCase().includes(query);
    }
    return true; // Default to showing all events if search type is not recognized
  });

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * 9;
  const endIndex = startIndex + 9;

  // Get the events to display on the current page
  const eventsToShow = filteredEvents.slice(startIndex, endIndex);

  const formattedDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="event-list-search">
        <AiOutlineSearch className="search-icon" />

        <select
          className="search-type-dropdown"
          onChange={handleSearchTypeChange}
          value={searchType}
        >
          <option value="title">Search by Name</option>
          <option value="location">Search by Location</option>
        </select>
        <input
          className="event-search-bar"
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="event-list-container">
        <ul className="event-list">
          {eventsToShow.map((event) => (
            <li key={event._id} className="event-item">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />
              <strong className="event-title">{event.title}</strong>
              <p className="event-description">{event.description}</p>
              <p className="event-date">
                <AiTwotoneCalendar />
                {formattedDate(event.date)}
              </p>
              <p className="event-location">
                <AiOutlineGlobal />
                {event.location}
              </p>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button
            className="page-button"
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
          >
            {"<- Previous"}{" "}
          </button>
          <p>Page {currentPage}</p>
          <button
            className="page-button"
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, Math.ceil(filteredEvents.length / 9))
              )
            }
            disabled={currentPage === Math.ceil(filteredEvents.length / 9)}
          >
            {"Next ->"}
          </button>
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default EventList;
