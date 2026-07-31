import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnalyticsProvider } from './components/context/AnalyticsContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <AnalyticsProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AnalyticsProvider>
  );
}

export default App;
