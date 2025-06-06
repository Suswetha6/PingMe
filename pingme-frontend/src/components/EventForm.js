import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function EventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'GENERAL_ANNOUNCEMENT', // default type
    eventDateTime: '',
    classroom: '',
    courseCode: '' // added courseCode field
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    console.log("Attempting to create event with data:", formData); // Log data being sent

    try {
      const response = await api.post('/api/events', formData);
      console.log("Event created successfully:", response.data); // Log success response
      navigate('/');
    } catch (err) {
      console.error("Error creating event:", err); // Log the full error object
      // Display specific backend error message if available
      setError(err.response?.data?.message || 'Failed to create event');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Create New Event</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          >
            <option value="CLASS_SCHEDULE">Class Schedule</option>
            <option value="CLASS_CANCELLATION">Class Cancellation</option>
            <option value="EXAM_DATE">Exam Date</option>
            <option value="PROJECT_DEADLINE">Project Deadline</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="HOLIDAY">Holiday</option>
            <option value="CELEBRATION">Celebration</option>
            <option value="GENERAL_ANNOUNCEMENT">General Announcement</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date and Time:</label>
          <input
            type="datetime-local"
            name="eventDateTime"
            value={formData.eventDateTime}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Course Code:</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Classroom:</label>
          <input
            type="text"
            name="classroom"
            value={formData.classroom}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default EventForm; 