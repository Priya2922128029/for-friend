// App.js - Main Application
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import MemoryPage from './pages/MemoryPage';
import ConfessionPage from './pages/ConfessionPage';
import ApologyPage from './pages/ApologyPage';
import PromisePage from './pages/PromisePage';
import FunPage from './pages/FunPage';
import FinalPage from './pages/FinalPage';
import Navigation from './components/Navigation';
import BackgroundMusic from './components/BackgroundMusic';
import './App.css';

function App() {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const location = useLocation();

  return (
    <div className="app-container">
      <BackgroundMusic enabled={musicEnabled} />
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/memory" element={<MemoryPage />} />
          <Route path="/confession" element={<ConfessionPage />} />
          <Route path="/apology" element={<ApologyPage />} />
          <Route path="/promise" element={<PromisePage />} />
          <Route path="/fun" element={<FunPage />} />
          <Route path="/final" element={<FinalPage />} />
        </Routes>
      </AnimatePresence>
      <div className="music-toggle" onClick={() => setMusicEnabled(!musicEnabled)}>
        {musicEnabled ? '🔊' : '🔈'}
      </div>
    </div>
  );
}

// Wrap App with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}