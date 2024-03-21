import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

const TestAnimation = () => {
  useEffect(() => {
    console.log('Attempting to run animation');
    anime({
      targets: '.animate-me',
      translateX: 250,
      easing: 'easeOutQuad',
      duration: 1000,
    });
  }, []);

  return <div className="animate-me" style={{ width: '100px', height: '100px', backgroundColor: 'red' }}></div>;
};

export default TestAnimation;
