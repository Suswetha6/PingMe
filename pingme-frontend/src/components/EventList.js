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

  const getEventTypeColor = (type) => {
    const colors = {
      'CLASS_SCHEDULE': '#10B981',
      'CLASS_CANCELLATION': '#EF4444',
      'EXAM_DATE': '#F59E0B',
      'PROJECT_DEADLINE': '#8B5CF6',
      'WORKSHOP': '#06B6D4',
      'HOLIDAY': '#84CC16',
      'CELEBRATION': '#EC4899',
      'GENERAL_ANNOUNCEMENT': '#6B7280'
    };
    return colors[type] || '#6B7280';
  };

  const formatEventType = (type) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.1rem',
        color: '#6B7280'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #2E5CFF',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          Loading events...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#DC2626', margin: '0 0 8px 0' }}>Error Loading Events</h3>
          <p style={{ color: '#7F1D1D', margin: '0' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #2E5CFF 0%, #1E3A8A 100%)',
        color: 'white',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            📅 Today's Schedule
          </h1>
          <p style={{
            fontSize: '1.1rem',
            margin: '0',
            opacity: 0.9
          }}>
            Stay updated with your daily events and announcements
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {events.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '60px 40px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px'
            }}>
              📭
            </div>
            <h3 style={{
              color: '#374151',
              fontSize: '1.5rem',
              margin: '0 0 12px 0'
            }}>
              No Events Today
            </h3>
            <p style={{
              color: '#6B7280',
              fontSize: '1.1rem',
              margin: '0'
            }}>
              Looks like you have a free day! Check back tomorrow for new events.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '24px'
          }}>
            {events.map(event => (
              <div 
                key={event.id} 
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        backgroundColor: getEventTypeColor(event.type),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {formatEventType(event.type)}
                      </span>
                    </div>
                    <h3 style={{
                      color: '#111827',
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      margin: '0 0 8px 0'
                    }}>
                      {event.title}
                    </h3>
                    <p style={{
                      color: '#6B7280',
                      fontSize: '1rem',
                      margin: '0 0 16px 0',
                      lineHeight: '1.5'
                    }}>
                      {event.description}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>🕐</span>
                    <div>
                      <p style={{
                        color: '#374151',
                        fontSize: '0.9rem',
                        margin: '0',
                        fontWeight: '500'
                      }}>
                        {new Date(event.eventDateTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>📍</span>
                    <div>
                      <p style={{
                        color: '#374151',
                        fontSize: '0.9rem',
                        margin: '0',
                        fontWeight: '500'
                      }}>
                        {event.classroom}
                      </p>
                    </div>
                  </div>
                  {event.courseCode && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>📚</span>
                      <div>
                        <p style={{
                          color: '#374151',
                          fontSize: '0.9rem',
                          margin: '0',
                          fontWeight: '500'
                        }}>
                          {event.courseCode}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Link 
                  to={`/events/${event.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    backgroundColor: '#2E5CFF',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1E40AF'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#2E5CFF'}
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default EventList;