// src/components/EventList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsList.css';
import {BASE_URL} from '../../utils/fetchApi'

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    axios.get(BASE_URL + '/api/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h1>Event List</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <strong>{event.title}</strong>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            
            <img src={event.image} alt={event.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
