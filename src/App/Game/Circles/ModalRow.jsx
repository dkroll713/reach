import React from 'react';

import Circle from './Circle.jsx'

const Row = (props) => {
  const { row, setColor } = props;
  console.log(row);
  return (
    <div className="row">
    {
      row.map((circle,x) => {
        return (
          <Circle
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