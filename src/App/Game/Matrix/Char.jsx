import React from 'react';

const Char = (props) => {
  const { char, setChar } = props;

  console.log(props);

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