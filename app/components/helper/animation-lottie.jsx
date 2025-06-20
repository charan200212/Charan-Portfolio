"use client";

import { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const AnimationLottie = ({ animationPath, width = '95%' }) => {
  const [animationData, setAnimationData] = useState(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Dynamically import the animation data
    const loadAnimation = async () => {
      try {
        // If animationPath is a string (path), fetch it
        if (typeof animationPath === 'string') {
          const response = await fetch(animationPath);
          const data = await response.json();
          setAnimationData(data);
        } 
        // If it's already an object (directly imported JSON), use it directly
        else if (typeof animationPath === 'object') {
          setAnimationData(animationPath);
        }
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
      }
    };

    loadAnimation();
  }, [animationPath]);

  if (!animationData) {
    return <div style={{ width, height: 'auto' }} />;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width }}
      lottieRef={animationRef}
    />
  );
};

export default AnimationLottie;