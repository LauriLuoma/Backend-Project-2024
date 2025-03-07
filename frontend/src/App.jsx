import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Learn from './pages/Learn';
import Admin from './pages/Admin';

/**
 * App component that sets up the main structure of the application.
 * Includes routing, navigation bar, and footer.
 */
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw' }}>
        <Navbar />
        <div style={{ width: '100%' }}>
          <Routes>
            <Route path="/" element={<Learn />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )

}

export default App
