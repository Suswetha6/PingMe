import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/api/events/${id}`);
        setEvent(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch event details');
        console.error('Error fetching event:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/api/events/${id}`);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete event');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>{event.title}</h2>
        <p style={{ marginBottom: '20px' }}>{event.description}</p>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Date and Time:</strong>
          <p>{new Date(event.eventDateTime).toLocaleString()}</p>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Location:</strong>
          <p>{event.classroom}</p>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Duration:</strong>
          <p>{event.duration} minutes</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to List
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails; 