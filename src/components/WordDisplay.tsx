import React from 'react';

type WordDisplayProps = {
  word: string;
  guessedLetters: Set<string>;
};

const normalizeLetter = (letter: string) => {
  return letter
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/Ç/g, 'C');
};

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
  return (
    <div className="flex justify-center gap-1 mb-8">
      {word.split('').map((letter, index) => {
        const upper = letter.toUpperCase();
        const isSeparator = letter === '-' || letter === ' ';
        const base = normalizeLetter(letter);
        const revealed = isSeparator || guessedLetters.has(base);
        return (
          <div key={index} className={`letter-space ${isSeparator ? 'border-none' : ''}`}>
            {isSeparator ? letter : revealed ? upper : ''}
          </div>
        );
      })}
    </div>
  );
};

export default WordDisplay;
