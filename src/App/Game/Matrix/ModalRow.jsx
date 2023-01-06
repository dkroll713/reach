import React from 'react';

import Char from './Char.jsx'

/*
  responsible for rendering rows in the modal
*/
const Row = (props) => {
  /*
    row : array = approximately half of the possible colors
    setChar : function = sets the selector square to contain symbol selected here
  */
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