import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Learn from './components/pages/Learn/Learn';
import Admin from './components/pages/Admin/Admin';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw' }}>
        <Navbar />
        <div style={{ width: '100%', marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Learn />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  )

}

export default App
