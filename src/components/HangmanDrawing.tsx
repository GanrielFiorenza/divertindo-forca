
import React from 'react';

type HangmanDrawingProps = {
  wrongGuesses: number;
};

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ wrongGuesses }) => {
  const parts = [
    <circle key="head" cx="50" cy="25" r="10" className="fill-none stroke-primary stroke-2" />,
    <line key="body" x1="50" y1="35" x2="50" y2="70" className="stroke-primary stroke-2" />,
    <line key="leftArm" x1="50" y1="50" x2="20" y2="40" className="stroke-primary stroke-2" />,
    <line key="rightArm" x1="50" y1="50" x2="80" y2="40" className="stroke-primary stroke-2" />,
    <line key="leftLeg" x1="50" y1="70" x2="20" y2="90" className="stroke-primary stroke-2" />,
    <line key="rightLeg" x1="50" y1="70" x2="80" y2="90" className="stroke-primary stroke-2" />,
  ];

  return (
    <div className="w-full max-w-[200px] mx-auto mb-8">
      <svg viewBox="0 0 100 100" className="w-full stroke-primary">
        {/* Base */}
        <line x1="10" y1="95" x2="90" y2="95" className="stroke-2" />
        {/* Vertical pole */}
        <line x1="30" y1="95" x2="30" y2="5" className="stroke-2" />
        {/* Horizontal beam */}
        <line x1="30" y1="5" x2="50" y2="5" className="stroke-2" />
        {/* Rope */}
        <line x1="50" y1="5" x2="50" y2="15" className="stroke-2" />
        
        {/* Body parts */}
        {parts.slice(0, wrongGuesses)}
      </svg>
    </div>
  );
};

export default HangmanDrawing;
