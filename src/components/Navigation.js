// components/Navigation.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  
  const pages = [
    { path: '/', label: 'Start' },
    { path: '/memory', label: 'Memories' },
    { path: '/confession', label: 'Confession' },
    { path: '/apology', label: 'Apology' },
    { path: '/promise', label: 'Promises' },
    { path: '/fun', label: 'Fun' },
    { path: '/final', label: 'Final' }
  ];
  
  useEffect(() => {
    const currentIndex = pages.findIndex(page => page.path === location.pathname);
    const calculatedProgress = (currentIndex / (pages.length - 1)) * 100;
    setProgress(calculatedProgress);
  }, [location.pathname]);

  return (
    <motion.nav 
      className="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="page-indicators">
        {pages.map((page, index) => {
          const isActive = location.pathname === page.path;
          const isCompleted = pages.findIndex(p => p.path === location.pathname) >= index;
          
          return (
            <Link 
              key={page.path} 
              to={page.path}
              className={`page-indicator ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="indicator-dot">
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className="indicator-label">{page.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;