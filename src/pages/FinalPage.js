// pages/FinalPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './FinalPage.css';

const FinalPage = () => {
  const [hearts, setHearts] = useState([]);
  const [confettiActive, setConfettiActive] = useState(true);

  useEffect(() => {
    // Create floating hearts
    const heartArray = [];
    for (let i = 0; i < 50; i++) {
      heartArray.push({
        id: i,
        emoji: ['❤️', '💖', '💝', '💗', '💓', '💞', '💕'][Math.floor(Math.random() * 7)],
        left: Math.random() * 100,
        size: Math.random() * 30 + 20,
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 10
      });
    }
    setHearts(heartArray);

    // Stop confetti after 10 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-container final-page">
      {/* Floating hearts background */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
          initial={{ y: 100, opacity: 0, rotate: 0 }}
          animate={{ 
            y: -100, 
            opacity: [0, 1, 0],
            rotate: 360
          }}
          transition={{
            delay: heart.delay,
            duration: heart.duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 5
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}

      {/* Confetti */}
      {confettiActive && (
        <div className="confetti-container">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              style={{
                background: `hsl(${Math.random() * 360}, 100%, 60%)`,
                left: `${Math.random() * 100}%`
              }}
              initial={{ y: -100, rotate: 0, opacity: 1 }}
              animate={{ 
                y: 1000, 
                rotate: 360,
                opacity: 0,
                x: Math.sin(i * 0.5) * 100
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                repeat: Infinity
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="final-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          Whatever You Decide...
        </motion.h1>
        
        <motion.div
          className="final-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <p className="message-line">No pressure.</p>
          <p className="message-line">No force.</p>
          
          <motion.div
            className="heart-separator"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            💝
          </motion.div>
          
          <p className="important-message">
            Just know this:<br />
            <span className="highlight">You matter to me.</span><br />
            <span className="highlight">Always.</span>
          </p>
        </motion.div>
        
        <motion.div
          className="final-thoughts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="thought-bubble">
            <p>
              Thank you for taking this journey with me.<br />
              For listening, for considering, for being you.
            </p>
            <div className="thought-tail"></div>
          </div>
          
          <div className="sign-off">
            <p className="signature">With sincere hope,</p>
            <p className="friend">Your friend who cares</p>
            <div className="signature-line"></div>
          </div>
        </motion.div>
        
        <motion.div
          className="final-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          {/* <p className="refresh-message">
            This page will refresh in <span className="countdown">10</span> seconds...
          </p>
          
          <div className="action-buttons">
            <button 
              className="action-button replay-button"
              onClick={() => window.location.reload()}
            >
              <span>Replay the journey 🔄</span>
            </button>
            
            <button 
              className="action-button share-button"
              onClick={() => alert('Share this special moment with someone who cares!')}
            >
              <span>Share this experience 💌</span>
            </button>
          </div> */}
          
          <div className="final-note">
            <p>Made with ❤️, 😔, and lots of hope for tomorrow.</p>
            <p className="small-note">
              Remember: True friendships can weather any storm.<br />
              And I'm committed to being a better friend, every single day.
            </p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Music note animation */}
      <div className="music-notes">
        {['🎵', '🎶', '🎼', '🎹', '🎺', '🎸', '🎻', '🥁'].map((note, i) => (
          <motion.div
            key={i}
            className="music-note"
            style={{ left: `${20 + i * 10}%` }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 4
            }}
          >
            {note}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinalPage;