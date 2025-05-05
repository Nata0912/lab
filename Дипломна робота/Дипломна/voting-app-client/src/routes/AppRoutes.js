import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Polls from '../pages/Polls';
import CreatePoll from '../pages/CreatePoll';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/polls" element={<Polls />} />
      <Route path="/create" element={<CreatePoll />} />
    </Routes>
  );
};

export default AppRoutes;
