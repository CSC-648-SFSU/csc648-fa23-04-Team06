// src/components/EventList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsList.css';
import { BASE_URL } from '../../utils/fetchApi';
import { AiOutlineSearch, AiFillCalendar, AiOutlineGlobal, AiTwotoneCalendar } from 'react-icons/ai';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title'); // Default search type is 'title'

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    axios
      .get(BASE_URL + '/api/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchQuery(''); // Clear search query when search type changes
  };

  // Filter events based on the search query and type
  const filteredEvents = events.filter((event) => {
    const query = searchQuery.toLowerCase();
    if (searchType === 'title') {
      return event.title.toLowerCase().includes(query);
    } else if (searchType === 'location') {
      return event.location.toLowerCase().includes(query);
    }
    return true; // Default to showing all events if search type is not recognized
  });

  const formattedDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="event-list-search">
      
        <AiOutlineSearch className="search-icon" />
        <select className="search-type-dropdown" onChange={handleSearchTypeChange} value={searchType}>
          <option value="title">Search by Title</option>
          <option value="location">Search by Location</option>
        </select>
        <input
          className="event-search-bar"
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder=""
        />
        
      </div>
      <div className="event-list-container">
        <ul className="event-list">
          {filteredEvents.map((event) => (
            <li key={event._id} className="event-item">
              <img src={event.image} alt={event.title} className="event-image" />
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
      </div>
    </>
  );
};

export default EventList;
