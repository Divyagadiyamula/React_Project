



import React from 'react';
import './grid.css';

function Grid({ guesses, secretWord }) {
  const getTileClass = (letter, index, row) => {
    if (!letter) return '';

    const secretLetters = secretWord.split('');

    if (secretWord[index] === letter) {
      return 'correct';
    } else if (secretLetters.includes(letter)) {
      return 'present';
    } else {
      return 'absent';
    }
  };

  return (
    <div className="guess-grid">
      {guesses.map((guess, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {[...guess.padEnd(5)].map((letter, index) => (
            <div
              className={`tile ${getTileClass(letter, index, rowIndex)}`}
              key={index}
            >
              {letter}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Grid;







