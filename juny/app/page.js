"use client"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from './learn/Overview';
import Unit1 from './units/unit1';
import Unit2 from './units/unit2';
// Import other unit components as needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/learn/unit1" element={<Unit1 />} />
        <Route path="/learn/unit2" element={<Unit2 />} />
        <Route path="/learn/unit3" element={<Unit2 />} />
        <Route path="/learn/unit4" element={<Unit2 />} />
        <Route path="/learn/unit5" element={<Unit2 />} />
        <Route path="/learn/unit6" element={<Unit2 />} />
        <Route path="/learn/unit7" element={<Unit2 />} />
        <Route path="/learn/unit8" element={<Unit2 />} />
      </Routes>
    </Router>
  );
};

export default App;
