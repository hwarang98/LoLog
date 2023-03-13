import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Summoner } from './pages/index';
// import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summoner/:name" element={<Summoner />} />
    </Routes>
  );
}

export default App;
