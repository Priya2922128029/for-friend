// pages/PromisePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PromisePage.css';

const PromisePage = () => {
  const [promises, setPromises] = useState([
    { id: 1, text: "I'll listen more", checked: false },
    { id: 2, text: "I'll think before speaking", checked: false },
    { id: 3, text: "I'll never take you for granted", checked: false },
    { id: 4, text: "I'll be more patient", checked: false },
    { id: 5, text: "I'll communicate better", checked: false },
    { id: 6, text: "I'll respect your feelings", checked: false }
  ]);
  
  const [allChecked, setAllChecked] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const handleCheck = (id) => {
    const updatedPromises = promises.map(promise => {
      if (promise.id === id) {
        const newChecked = !promise.checked;
        
        // Add sparkle effect when checking
        if (newChecked) {
          addSparkle();
        }
        
        return { ...promise, checked: newChecked };
      }
      return promise;
    });
    
    setPromises(updatedPromises);
    
    // Check if all promises are checked
    const allCheckedNow = updatedPromises.every(p => p.checked);
    setAllChecked(allCheckedNow);
  };

  const addSparkle = () => {
    const newSparkle = {
      id: Date.now(),
      left: Math.random() * 80 + 10,
      top: Math.random() * 60 + 20
    };
    
    setSparkles(prev => [...prev, newSparkle]);
    
    // Remove sparkle after animation
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1000);
  };

  const checkAll = () => {
    const updatedPromises = promises.map(promise => ({ ...promise, checked: true }));
    setPromises(updatedPromises);
    setAllChecked(true);
    
    // Add multiple sparkles
    for (let i = 0; i < 10; i++) {
      setTimeout(addSparkle, i * 100);
    }
  };

  return (
    <div className="page-container promise-page">
      <motion.div
        className="promise-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>I Will Not Do It Again</h1>
        <p className="subtitle">These aren't just words. These are actions.</p>
      </motion.div>
      
      <div className="promise-content">
        <motion.div
          className="promise-list-container"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="promise-instruction">
            <p>Click each promise to seal it with a sparkle ✨</p>
          </div>
          
          <div className="promises-grid">
            {promises.map((promise, index) => (
              <motion.div
                key={promise.id}
                className={`promise-item ${promise.checked ? 'checked' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCheck(promise.id)}
              >
                <div className="checkbox">
                  <div className="checkmark">{promise.checked ? '✓' : '+'}</div>
                </div>
                <span className="promise-text">{promise.text}</span>
                {promise.checked && (
                  <div className="promise-sparkle">✨</div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="check-all-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button 
              className="check-all-button"
              onClick={checkAll}
              disabled={allChecked}
            >
              {allChecked ? 'All promises sealed! 💝' : 'Seal all promises at once!'}
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="promise-message"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="message-card">
            <h3>Not just words.</h3>
            <p>These are promises I plan to keep.</p>
            <div className="signature">
              <div className="signature-line"></div>
              <p>Sealed with sincerity</p>
            </div>
          </div>
          
          {allChecked && (
            <motion.div
              className="completion-celebration"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <div className="celebration-text">All Promises Sealed! 🎉</div>
              <div className="celebration-subtext">Ready to move forward together</div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Sparkle effects */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="sparkle-effect"
          style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%` }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1 }}
        />
      ))}
      
      <motion.div
        className="navigation-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Link to="/apology" className="nav-button back-button">
          ← Apology
        </Link>
        {allChecked && (
          <Link to="/fun" className="nav-button next-button">
            Let's lighten up a bit... →
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default PromisePage;