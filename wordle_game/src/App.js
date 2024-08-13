import React, { useState, useEffect } from 'react';
import Keyboard from './KEYBOARD/keyboard';
import Grid from './KEYBOARD/grid';
import words from './words.json';
import './App.css';

function App() {
  const [secretWord, setSecretWord] = useState('');
  const [guesses, setGuesses] = useState(['', '', '', '', '', '']);
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // 1-minute timer

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setMessage(`Time's up! The word was ${secretWord}`);
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSecretWord(randomWord.toUpperCase());
    setGuesses(['', '', '', '', '', '']);
    setCurrentGuess('');
    setCurrentRow(0);
    setGameOver(false);
    setMessage('');
    setTimeLeft(60); // Reset the timer
  };

  const handleKeyClick = (key) => {
    if (gameOver) return;

    if (key === 'Enter') {
      handleSubmitGuess();
    } else if (key === 'Backspace') {
      handleBackspace();
    } else if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key.toUpperCase());
    }
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length === 5) {
      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow] = currentGuess;
      setGuesses(updatedGuesses);

      if (currentGuess === secretWord) {
        setScore((prevScore) => prevScore + (6 - currentRow));
        setMessage('Congratulations! You guessed the word.');
        setGameOver(true);
      } else if (currentRow === 5) { // Last attempt
        setMessage(`Game over! The word was ${secretWord}`);
        setGameOver(true);
      } else {
        setCurrentRow((prevRow) => prevRow + 1);
      }

      setCurrentGuess('');
    }
  };

  const handleBackspace = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleResetGame = () => {
    startNewGame();
  };

  return (
    <div className="app">
     <marquee className="tittle">
      <h1>Word Guessing Game</h1>
      </marquee>
      <p className='timer'>Time Left: {timeLeft}s</p>
      <Grid
        guesses={guesses.map((guess, index) =>
          index === currentRow ? currentGuess : guess
        )}
        secretWord={secretWord}
      />
      <Keyboard onKeyClick={handleKeyClick} />
      {message && <p className="message">{message}</p>}
      <p className='score'>Score: {score}</p>
      <button className="reset-button" onClick={handleResetGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;






