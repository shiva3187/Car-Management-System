import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // import SignupPage
import AddCarPage from './pages/AddCarPage';
import EditCarPage from './pages/EditCarPage';
import CarDetailPage from './pages/CarDetailPage';
import './styles/global.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> {/* Add Signup Route */}
      <Route path="/add-car" element={<AddCarPage />} />
      <Route path="/edit-car/:id" element={<EditCarPage />} />
      <Route path="/car/:id" element={<CarDetailPage />} />
    </Routes>
  );
};

export default App;
