import React from 'react';

import Char from './Char.jsx'

const Row = (props) => {
  const { row, setChar } = props;

  return (
    <div className="row">
    {
      row.map((char,x) => {
        return (
          <Char
            key={x*195}
            char={char}
            setChar={setChar}
          />
        )
      })
    }
    </div>
  )
}

export default Row;