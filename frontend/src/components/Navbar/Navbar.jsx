import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar component for the Learn Words app.
 * Displays navigation links to different routes.
 */
function Navbar() {
  const location = useLocation();

  /**
   * Function to determine the style of the navigation links based on the current path.
   * @param {string} path - The path to compare with the current location.
   * @returns {Object} - The style object for the link.
   */
  const linkStyle = (path) => ({
    color: location.pathname === path ? '#FFD700' : '#fff',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: location.pathname === path ? '#222' : '#333',
  });

  return (
    <nav style={{
      position: 'fixed',
      borderBottom: '2px solid #272727',
      padding: '10px',
      backgroundColor: '#333',
      color: '#fff',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Navigation links to the main page */}
        <Link to="/" style={linkStyle('/')}>Learn!</Link>
        {/* Navigation links to the admin page */}
        <Link to="/admin" style={linkStyle('/admin')}>Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;