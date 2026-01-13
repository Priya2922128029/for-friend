// pages/FunPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FunPage.css';

const FunPage = () => {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [runAway, setRunAway] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [forgiven, setForgiven] = useState(false);

  const handleMadButtonHover = () => {
    if (!runAway) {
      const maxX = window.innerWidth - 200;
      const maxY = window.innerHeight - 100;
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      setButtonPosition({ x: newX, y: newY });
      setClickCount(prev => prev + 1);
      
      if (clickCount >= 3) {
        setRunAway(true);
        setTimeout(() => setShowSurprise(true), 1000);
      }
    }
  };

  const handleForgiveClick = () => {
    setForgiven(true);
  };

  return (
    <div className="page-container fun-page">
      <motion.div
        className="fun-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Please Don't Stay Mad 😄</h1>
        <p className="subtitle">Let's try to find that smile again...</p>
      </motion.div>
      
      <div className="fun-content">
        <motion.div
          className="fun-message"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="fun-text">
            I know I messed up,<br />
            but if smiles were currency,<br />
            I'd be broke trying to buy yours 😅
          </p>
          <div className="smiley-faces">
            <span className="smiley">😊</span>
            <span className="smiley">😂</span>
            <span className="smiley">😉</span>
            <span className="smiley">🥺</span>
            <span className="smiley">😇</span>
          </div>
        </motion.div>
        
        <div className="button-game">
          <h3>Choose your response:</h3>
          
          <div className="button-container">
            {/* Run away button */}
            <motion.button
              className="mad-button"
              style={{ 
                position: 'absolute',
                left: `${buttonPosition.x}px`,
                top: `${buttonPosition.y}px`
              }}
              whileHover={{ scale: 1.1 }}
              onMouseEnter={handleMadButtonHover}
              onClick={handleMadButtonHover}
              animate={runAway ? { x: 1000, opacity: 0 } : {}}
              transition={runAway ? { duration: 1 } : {}}
            >
              No, I'm still mad 🏃‍♀️
              <div className="running-feet">👣👣</div>
            </motion.button>
            
            {/* Forgive button */}
            <motion.button
              className={`forgive-button ${forgiven ? 'forgiven' : ''}`}
              onClick={handleForgiveClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={forgiven ? { scale: 1.1 } : {}}
            >
              {forgiven ? 'Thank you! 💝' : 'Okay, I forgive you 💗'}
              <div className="heart-float">💖</div>
            </motion.button>
          </div>
          
          <p className="game-instruction">
            {clickCount > 0 && `Caught it ${clickCount} times! Keep trying!`}
          </p>
        </div>
        
        {showSurprise && (
          <motion.div
            className="surprise-message"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div className="surprise-content">
              <span className="surprise-emoji">🎉</span>
              <h3>You caught me!</h3>
              <p>Okay okay, I surrender! 🙌</p>
              <p className="surprise-text">
                Your persistence is admirable!<br />
                Just like our friendship deserves persistence too.
              </p>
            </div>
          </motion.div>
        )}
        
        {forgiven && (
          <motion.div
            className="celebration"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div className="celebration-content">
              <h3>🎊 Friendship Restored! 🎊</h3>
              <p>This calls for a celebration!</p>
              <div className="celebration-emojis">
                <span className="celebration-emoji">🎈</span>
                <span className="celebration-emoji">🎂</span>
                <span className="celebration-emoji">🥳</span>
                <span className="celebration-emoji">🎁</span>
                <span className="celebration-emoji">✨</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <motion.div
        className="navigation-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Link to="/promise" className="nav-button back-button">
          ← Promises
        </Link>
        {(forgiven || showSurprise) && (
          <Link to="/final" className="nav-button next-button">
            One last page... →
          </Link>
        )}
      </motion.div>
      
      {/* Floating emojis */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-emoji"
          initial={{ y: 100, opacity: 0, rotate: 0 }}
          animate={{ 
            y: -100, 
            opacity: [0, 1, 0],
            rotate: 360,
            x: Math.sin(i * 0.8) * 100
          }}
          transition={{
            delay: i * 0.3,
            duration: 8,
            repeat: Infinity,
            repeatDelay: Math.random() * 5
          }}
        >
          {['😊', '😂', '🥰', '😇', '🤗', '😄', '🤩', '😍', '🤭', '🙏'][i]}
        </motion.div>
      ))}
    </div>
  );
};

export default FunPage;