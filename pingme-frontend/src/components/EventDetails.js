import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
        setDeleteLoading(true);
        await api.delete(`/api/events/${id}`);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete event');
        setDeleteLoading(false);
      }
    }
  };

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
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
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
          Loading event details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '40px 20px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️</div>
            <h3 style={{ color: '#DC2626', margin: '0 0 12px 0', fontSize: '1.5rem' }}>
              Error Loading Event
            </h3>
            <p style={{ color: '#7F1D1D', margin: '0 0 20px 0' }}>{error}</p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2E5CFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '40px 20px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ color: '#374151', margin: '0 0 12px 0', fontSize: '1.5rem' }}>
              Event Not Found
            </h3>
            <p style={{ color: '#6B7280', margin: '0 0 20px 0' }}>
              The event you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2E5CFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Back to Events
            </button>
          </div>
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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              ← Back
            </button>
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
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: '0',
            lineHeight: '1.2'
          }}>
            {event.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #E5E7EB'
        }}>
          {/* Description */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              color: '#111827',
              fontSize: '1.3rem',
              fontWeight: '600',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📝 Description
            </h3>
            <p style={{
              color: '#6B7280',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              margin: '0',
              backgroundColor: '#F9FAFB',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              {event.description}
            </p>
          </div>

          {/* Event Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{
              backgroundColor: '#F8FAFC',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0'
            }}>
              <h4 style={{
                color: '#1E293B',
                fontSize: '1.1rem',
                fontWeight: '600',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                🕐 Date & Time
              </h4>
              <p style={{
                color: '#475569',
                fontSize: '1rem',
                margin: '0',
                fontWeight: '500'
              }}>
                {new Date(event.eventDateTime).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div style={{
              backgroundColor: '#F8FAFC',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0'
            }}>
              <h4 style={{
                color: '#1E293B',
                fontSize: '1.1rem',
                fontWeight: '600',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📍 Location
              </h4>
              <p style={{
                color: '#475569',
                fontSize: '1rem',
                margin: '0',
                fontWeight: '500'
              }}>
                {event.classroom}
              </p>
            </div>

            {event.duration && (
              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
              }}>
                <h4 style={{
                  color: '#1E293B',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ⏱️ Duration
                </h4>
                <p style={{
                  color: '#475569',
                  fontSize: '1rem',
                  margin: '0',
                  fontWeight: '500'
                }}>
                  {event.duration} minutes
                </p>
              </div>
            )}

            {event.courseCode && (
              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
              }}>
                <h4 style={{
                  color: '#1E293B',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  📚 Course Code
                </h4>
                <p style={{
                  color: '#475569',
                  fontSize: '1rem',
                  margin: '0',
                  fontWeight: '500'
                }}>
                  {event.courseCode}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid #E5E7EB'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#F3F4F6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#E5E7EB'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#F3F4F6'}
            >
              Back to Events
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              style={{
                padding: '12px 24px',
                backgroundColor: deleteLoading ? '#FCA5A5' : '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: deleteLoading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'background-color 0.2s',
                opacity: deleteLoading ? 0.7 : 1
              }}
              onMouseOver={(e) => !deleteLoading && (e.target.style.backgroundColor = '#DC2626')}
              onMouseOut={(e) => !deleteLoading && (e.target.style.backgroundColor = '#EF4444')}
            >
              {deleteLoading ? 'Deleting...' : 'Delete Event'}
            </button>
          </div>
        </div>
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

export default EventDetails;