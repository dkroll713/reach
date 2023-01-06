import React from 'react';

/*
  responsible for matrix symbols
*/
const Char = (props) => {
  const { char, setChar } = props;

  return (
    <div
      name={char.char}
      className="matrix"
      onClick={setChar}
    >
      {char.char}
    </div>
  )
}

export default Char