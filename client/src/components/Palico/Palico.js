import React, { useEffect, useState } from 'react';
import './Palico.css';

export default function Palico({ text }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 35; 

    if (text) {
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval); 
        }
      }, typingSpeed);

      return () => {
        clearInterval(typingInterval); 
      };
    }
  }, [text]);

  return (
    <div className="palico__container">
      <div className="palico__container__dialog">
        <p>{displayedText}</p>
      </div>
      <div className="palico__container__palico"></div>
    </div>
  );
}
