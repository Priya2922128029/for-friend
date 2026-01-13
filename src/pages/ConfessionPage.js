// pages/ConfessionPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ConfessionPage.css';

const ConfessionPage = () => {
  const [text, setText] = useState('');
  const fullText = "I won't justify.\nI won't blame.\n\nI hurt you.\nAnd that's on me.";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="page-container confession-page">
      <div className="spotlight"></div>
      
      <motion.div
        className="confession-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="card-header">
          <h1>This Is On Me</h1>
          <div className="heartbeat-icon">❤️</div>
        </div>
        
        <div className="confession-text">
          {text.split('\n').map((line, index) => (
            <p key={index} className="typewriter-line">
              {line}
              <span className="cursor">|</span>
            </p>
          ))}
        </div>
        
        <motion.div 
          className="heartbeat-background"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
      
      <motion.div
        className="confession-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <p className="footer-text">
          Sometimes the hardest thing to say<br />
          is also the most important thing to admit
        </p>
        
        <div className="navigation-buttons">
          <Link to="/memory" className="nav-button back-button">
            ← Memories
          </Link>
          <Link to="/apology" className="nav-button next-button">
            I need to say something... →
          </Link>
        </div>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: -100, 
            opacity: [0, 1, 0],
            x: Math.sin(i * 0.5) * 50
          }}
          transition={{
            delay: i * 0.2,
            duration: 4,
            repeat: Infinity,
            repeatDelay: Math.random() * 3
          }}
        />
      ))}
    </div>
  );
};

export default ConfessionPage;