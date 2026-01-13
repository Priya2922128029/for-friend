// pages/MemoryPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './MemoryPage.css';

const MemoryPage = () => {
  const [shaking, setShaking] = useState(false);
  
  const memories = [
    { id: 1, text: "we shared reels to each other & have fun", emoji: "😂" },
    { id: 2, text: "Make me laugh and feel me better", emoji: "😇" },
    { id: 3, text: "Day starts and ends with ur msg", emoji: "💞" },
    { id: 4, text: "All the adventures we shared together", emoji: "🗺️" },
    { id: 5, text: "Late night talks about everything and nothing", emoji: "🌙" },
    { id: 6, text: "Care for me and efforts for me ", emoji: "💝" }
  ];

  return (
    <div className="page-container memory-page">
      <motion.div
        className="memory-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>We Were Good, Right?</h1>
        <p className="subtitle">Remember when...</p>
      </motion.div>

      <div className="polaroid-grid">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="polaroid-card"
            initial={{ opacity: 0, rotate: -10, y: 50 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ rotate: index % 2 === 0 ? 3 : -3, scale: 1.05 }}
          >
            <div className="polaroid-image">
              <span className="polaroid-emoji">{memory.emoji}</span>
            </div>
            <div className="polaroid-caption">{memory.text}</div>
            <div className="polaroid-tape"></div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={`memory-conclusion ${shaking ? 'shake' : ''}`}
        onAnimationStart={() => setShaking(true)}
        onAnimationComplete={() => setShaking(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="memory-text">
          We laughed.<br />
          We joked.<br />
          We understood each other without speaking.
        </p>
        
        <motion.p 
          className="ruined-text"
          animate={shaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          And I ruined it that day... 😔
        </motion.p>
      </motion.div>

      <motion.div
        className="navigation-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <Link to="/" className="nav-button back-button">
          ← Back
        </Link>
        <Link to="/confession" className="nav-button next-button">
          Continue the journey →
        </Link>
      </motion.div>
    </div>
  );
};

export default MemoryPage;