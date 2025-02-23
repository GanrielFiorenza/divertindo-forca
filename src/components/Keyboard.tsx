
import React from 'react';

type KeyboardProps = {
  usedLetters: Set<string>;
  onLetterClick: (letter: string) => void;
};

const Keyboard: React.FC<KeyboardProps> = ({ usedLetters, onLetterClick }) => {
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    'ZXCVBNM'.split(''),
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center">
          {row.map((letter) => (
            <button
              key={letter}
              className="letter-button"
              onClick={() => onLetterClick(letter)}
              disabled={usedLetters.has(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
