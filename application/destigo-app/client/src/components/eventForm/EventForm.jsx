import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/fetchApi';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(''); // Declare and initialize the image state

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Trim the description before checking if it's empty
      const trimmedDescription = description.trim();

      if (!trimmedDescription) {
        console.error('Description cannot be empty.');
        return;
      }

      const response = await axios.post(BASE_URL + '/api/events', {
        title,
        description: trimmedDescription,
        date,
        image,
        // Add other event properties as needed
      });

      console.log('New event posted:', response.data);

      // Clear the form after successful submission
      setTitle('');
      setDescription('');
      setDate('');
      setImage('');
    } catch (error) {
      console.error('Error posting event:', error);
    }
  };

  return (
    <div>
      <h1>Add New Event</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Image URL:</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

        {/* Add fields for other event properties as needed */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventForm;
