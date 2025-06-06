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
      backgroundColor: '#333',
      padding: '1rem',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
            Home
          </Link>
          {token && canCreateEvents && (
            <Link to="/events/new" style={{ color: 'white', textDecoration: 'none' }}>
              Create Event
            </Link>
          )}
        </div>
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                Login
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
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