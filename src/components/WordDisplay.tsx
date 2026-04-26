
import React from 'react';

type WordDisplayProps = {
  word: string;
  guessedLetters: Set<string>;
};

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
  return (
    <div className="flex justify-center gap-1 mb-8">
      {word.split('').map((letter, index) => (
        {(() => {
          const upper = letter.toUpperCase();
          const base = upper.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/Ç/g, 'C');
          const isSpecial = letter === '-' || letter === ' ';
          return (
            <div key={index} className={`letter-space ${isSpecial ? 'border-none' : ''}`}>
              {isSpecial ? letter : guessedLetters.has(base) ? upper : ''}
            </div>
          );
        })()}
      ))}
    </div>
  );
};

export default WordDisplay;
