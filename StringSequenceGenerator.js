import React, { useState } from 'react';

function StringSequenceGenerator() {
  const [sequence, setSequence] = useState('');

  const generateSequence = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sequenceLength = 5;

    for (let i = 0; i < sequenceLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
      result += randomChar;
    }

    setSequence(result);
  };

  return (
    <div>
      <button onClick={generateSequence}>Generate Sequence</button>
      <p>Generated Sequence: {sequence}</p>
    </div>
  );
}

export default StringSequenceGenerator;
