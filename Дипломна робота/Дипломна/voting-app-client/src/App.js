import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Polls from './pages/Polls';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/polls" element={<Polls />} />
      </Routes>
    </Router>
  );
};

export default App;
