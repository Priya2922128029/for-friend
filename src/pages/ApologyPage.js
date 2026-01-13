// pages/ApologyPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ApologyPage.css';

const ApologyPage = () => {
  const [heartCracked, setHeartCracked] = useState(true);
  const [healing, setHealing] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const startHealing = () => {
    setHealing(true);
    setTimeout(() => {
      setHeartCracked(false);
      setTimeout(() => setShowButton(true), 500);
    }, 2000);
  };

  return (
    <div className="page-container apology-page">
      <div className="glowing-light"></div>
      
      <motion.div
        className="apology-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          I'm Truly Sorry
        </motion.h1>
        
        <div className="apology-text-container">
          <motion.p
            className="apology-line"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I'm sorry for say that without thinking about ur effort,
          </motion.p>
          <motion.p
            className="apology-line"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            and the silence I didn't explain.
          </motion.p>
        </div>
        
        <motion.div
          className="promise-section"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="promise-title">I promise:</p>
          <ul className="promise-list">
            <li>No repeats.</li>
            <li>No excuses.</li>
            <li>Only change.</li>
          </ul>
          <p className="scouts-honor">
            Scout's honor 🤞<br />
            <span className="small-text">(even if I was never a scout)</span>
          </p>
        </motion.div>
      </motion.div>
      
      <div className="heart-container">
        <motion.div
          className={`heart ${heartCracked ? 'cracked' : ''} ${healing ? 'healing' : ''}`}
          onClick={startHealing}
          whileHover={{ scale: 1.1 }}
          animate={heartCracked ? { rotate: [0, -5, 5, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ❤️
          {heartCracked && <div className="crack"></div>}
          {healing && <div className="healing-glow"></div>}
        </motion.div>
        <p className="heart-instruction">
          {heartCracked ? "Click the heart to begin healing..." : "❤️ Healing complete! ❤️"}
        </p>
      </div>
      
      {showButton && (
        <motion.div
          className="forgiveness-button-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <Link to="/promise" className="forgiveness-button">
            <span>Do you forgive me?</span>
            <div className="button-sparkles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="sparkle" />
              ))}
            </div>
          </Link>
        </motion.div>
      )}
      
      <div className="navigation-buttons">
        <Link to="/confession" className="nav-button back-button">
          ← Confession
        </Link>
      </div>
    </div>
  );
};

export default ApologyPage;