import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated routing for version 6
import Login from './Login';
import Seller from './Seller';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true after successful login
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* If not logged in, show the Login page */}
          <Route path="/" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Seller />} />
          {/* Show Seller page if logged in */}
          <Route path="/seller" element={ <Seller  />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
