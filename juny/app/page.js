"use client";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from './learn/page';
import Unit1 from './learn/units/unit1';
import Unit2 from './learn/units/unit2';
// Import other unit components as needed
import Navbar from './components/Navbar'; // Make sure to import the Navbar component
const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-grow">
          <Routes>
            <Route path="/learn" element={<Overview />} />
            <Route path="/learn/unit1" element={<Unit1 />} />
            <Route path="/learn/unit2" element={<Unit2 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
