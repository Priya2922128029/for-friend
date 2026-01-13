// pages/LandingPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = [];
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10
      });
    }
    setHearts(newHearts);
  }, []);

  return (
    <div className="page-container landing-page">
      {/* Floating hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}
        >
          ❤️
        </div>
      ))}

      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="landing-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Hey...
        </motion.h1>
        
        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Before you scroll away,
        </motion.p>
        
        <motion.p
          className="landing-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          THINK ABOUT OUR MEMORY🕊️
        </motion.p>
        
        <motion.div
          className="button-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/memory" className="pulse-button">
            <span>click to come with me...</span>
            <div className="button-sparkle"></div>
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll down for more</p>
      </motion.div>
    </div>
  );
};

export default LandingPage;