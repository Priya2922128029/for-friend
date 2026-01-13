// components/BackgroundMusic.js - UPDATED VERSION
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundMusic = ({ enabled }) => {
  const audioRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [volume, setVolume] = useState(0.3);

  // Create audio context for better control
  const createAudioContext = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = 'https://assets.mixkit.co/music/preview/mixkit-clear-sky-479.mp3';
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.preload = 'auto';
    }
  };

  // Handle user interaction to enable audio
  useEffect(() => {
    const enableAudio = () => {
      setUserInteracted(true);
      if (audioRef.current) {
        audioRef.current.play().catch(e => {
          console.log("Audio play failed:", e);
          // Fallback: Try with user gesture
          document.removeEventListener('click', enableAudio);
          document.removeEventListener('touchstart', enableAudio);
        });
      }
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    if (!userInteracted) {
      document.addEventListener('click', enableAudio);
      document.addEventListener('touchstart', enableAudio);
    }

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, [userInteracted]);

  // Handle audio playback based on enabled prop
  useEffect(() => {
    if (!audioRef.current) {
      createAudioContext();
    }

    if (userInteracted) {
      if (enabled) {
        audioRef.current.volume = volume;
        audioRef.current.play().catch(e => {
          console.log("Playback failed:", e);
          // Try with user gesture
          if (document.activeElement) {
            audioRef.current.play();
          }
        });
      } else {
        audioRef.current.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [enabled, userInteracted, volume]);

  // Alternative: Use HTML5 audio element approach
  return (
    <>
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        loop
        style={{ display: 'none' }}
      />
      
      {/* Audio visualization for visual feedback */}
      {enabled && (
        <motion.div 
          className="audio-visualizer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(255, 107, 157, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '10px 15px',
            borderRadius: '20px',
            zIndex: 999
          }}
        >
          <div style={{ display: 'flex', gap: '3px', height: '20px', alignItems: 'flex-end' }}>
            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, i) => (
              <motion.div
                key={i}
                style={{
                  width: '4px',
                  background: 'linear-gradient(to top, #ff6b9d, #ff8e6b)',
                  borderRadius: '2px'
                }}
                animate={{
                  height: [`${height * 3}px`, `${(height + 1) * 3}px`, `${height * 3}px`]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
          <span style={{ color: '#ff6b9d', fontSize: '14px', marginLeft: '8px' }}>Music ON</span>
        </motion.div>
      )}
    </>
  );
};

export default BackgroundMusic;