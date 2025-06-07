import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function EventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'GENERAL_ANNOUNCEMENT',
    eventDateTime: '',
    classroom: '',
    courseCode: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    { value: 'CLASS_SCHEDULE', label: 'Class Schedule', icon: '📚' },
    { value: 'CLASS_CANCELLATION', label: 'Class Cancellation', icon: '❌' },
    { value: 'EXAM_DATE', label: 'Exam Date', icon: '📝' },
    { value: 'PROJECT_DEADLINE', label: 'Project Deadline', icon: '⏰' },
    { value: 'WORKSHOP', label: 'Workshop', icon: '🔧' },
    { value: 'HOLIDAY', label: 'Holiday', icon: '🏖️' },
    { value: 'CELEBRATION', label: 'Celebration', icon: '🎉' },
    { value: 'GENERAL_ANNOUNCEMENT', label: 'General Announcement', icon: '📢' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    console.log("Attempting to create event with data:", formData);

    try {
      const response = await api.post('/api/events', formData);
      console.log("Event created successfully:", response.data);
      navigate('/');
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '2.5rem', 
          fontWeight: 'bold' 
        }}>
          Create New Event
        </h1>
        <p style={{ 
          margin: 0, 
          fontSize: '1.1rem', 
          opacity: 0.9 
        }}>
          Schedule and manage your academic events
        </p>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        padding: '40px 20px' 
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          {error && (
            <div style={{ 
              color: '#dc3545', 
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title Field */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '0.95rem'
              }}>
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2E5CFF'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                required
              />
            </div>

            {/* Description Field */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '0.95rem'
              }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide event details"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  minHeight: '120px',
                  resize: 'vertical',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2E5CFF'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                required
              />
            </div>

            {/* Event Type Field */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '0.95rem'
              }}>
                Event Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2E5CFF'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                required
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time Field */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '0.95rem'
              }}>
                Date and Time *
              </label>
              <input
                type="datetime-local"
                name="eventDateTime"
                value={formData.eventDateTime}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2E5CFF'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                required
              />
            </div>

            {/* Course Code Field */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '0.95rem'
              }}>
                Course Code
              </label>
              <input
                type="text"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                placeholder="e.g., CS101, MATH201"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2E5CFF'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            {/* Classroom Field */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '0.95rem'
              }}>
                Classroom *
              </label>
              <input
                type="text"
                name="classroom"
                value={formData.classroom}
                onChange={handleChange}
                placeholder="e.g., Room 101, Lab A"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2E5CFF'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '14px',
                background: isSubmitting 
                  ? 'linear-gradient(135deg, #6c757d 0%, #495057 100%)'
                  : 'linear-gradient(135deg, #2E5CFF 0%, #1E3A8A 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(46, 92, 255, 0.3)'
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(46, 92, 255, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(46, 92, 255, 0.3)';
                }
              }}
            >
              {isSubmitting ? '⏳ Creating Event...' : '✨ Create Event'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventForm;