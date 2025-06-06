import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function EventList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/events/today');
        setEvents(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch events');
        console.error('Error fetching events:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Today's Schedule</h1>
      {events.length === 0 ? (
        <p>No events scheduled for today</p>
      ) : (
        events.map(event => (
          <div 
            key={event.id} 
            style={{ 
              margin: '10px 0', 
              padding: '15px', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Time: {new Date(event.eventDateTime).toLocaleString()}</p>
            <p>Location: {event.classroom}</p>
            <Link 
              to={`/events/${event.id}`}
              style={{
                display: 'inline-block',
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                marginTop: '10px'
              }}
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default EventList; 