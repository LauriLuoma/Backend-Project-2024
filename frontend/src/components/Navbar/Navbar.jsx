import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

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
      padding: '10px',
      backgroundColor: '#333',
      color: '#fff',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={linkStyle('/')}>Learn!</Link>
        <Link to="/admin" style={linkStyle('/admin')}>Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;