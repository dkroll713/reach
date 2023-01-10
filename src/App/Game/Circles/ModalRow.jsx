import React from 'react';

import Circle from './Circle.jsx'

/*
  responsible for rendering rows in the modal
*/
const Row = (props) => {
  /*
    row : array = approximately half of the possible colors
    setColor : function = sets the selector circle to be the color selected here
  */
  const { row, setColor } = props;

  return (
    <div className="row">
      {
        row.map((circle, x) => {
          return (
            <Circle
              key={x * 195}
              circle={circle}
              setColor={setColor}
            />
          )
        })
      }
    </div>
  )
}

export default Row;