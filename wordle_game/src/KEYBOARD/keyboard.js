import React from 'react';
import './keyboard.css';

function Keyboard({ onKeyClick }) {
  const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
  ];

  return (
    <div className="keyboard-container">
      <center>
        {keys.slice(0, 10).map((key) => (
          <button className="key" data-key={key} onClick={() => onKeyClick(key)} key={key}>
            {key}
          </button>
        ))}
        <br />
        {keys.slice(10, 19).map((key) => (
          <button className="key" data-key={key} onClick={() => onKeyClick(key)} key={key}>
            {key}
          </button>
        ))}
        <button className="key" data-key="Enter" onClick={() => onKeyClick('Enter')}>
          Enter
        </button>
        <br />
        {keys.slice(19).map((key) => (
          <button className="key" data-key={key} onClick={() => onKeyClick(key)} key={key}>
            {key}
          </button>
        ))}
        <button className="key" data-key="BackSpace" style={{ width: '150px' }} onClick={() => onKeyClick('BackSpace')}>
          BackSpace
        </button>
      </center>
    </div>
  );
}

export default Keyboard;









