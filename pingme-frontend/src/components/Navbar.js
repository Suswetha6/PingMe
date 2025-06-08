import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const canCreateEvents = userRole === 'FACULTY' || userRole === 'ADMIN';

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #2E5CFF 0%, #1E3A8A 100%)',
      padding: '1rem',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <Link to="/" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '1.1rem',
            fontWeight: '500',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.8'}
          onMouseOut={(e) => e.target.style.opacity = '1'}>
            Home
          </Link>
          {token && canCreateEvents && (
            <Link to="/events/new" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}>
              Create Event
            </Link>
          )}
        </div>
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Logout
            </button>
          ) : (
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <Link to="/login" style={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.8'}
              onMouseOut={(e) => e.target.style.opacity = '1'}>
                Login
              </Link>
              <Link to="/register" style={{ 
                backgroundColor: 'white',
                color: '#2E5CFF',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 