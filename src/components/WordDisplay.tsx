
import React from 'react';

type WordDisplayProps = {
  word: string;
  guessedLetters: Set<string>;
};

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
  return (
    <div className="flex justify-center gap-1 mb-8">
      {word.split('').map((letter, index) => (
        <div key={index} className="letter-space">
          {guessedLetters.has(letter.toUpperCase()) ? letter.toUpperCase() : ''}
        </div>
      ))}
    </div>
  );
};

export default WordDisplay;
