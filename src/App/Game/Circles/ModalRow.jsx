import React from 'react';

import Circle from './Circle.jsx'

const Row = (props) => {
  const { row, setColor } = props;

  return (
    <div className="row">
    {
      row.map((circle,x) => {
        return (
          <Circle
            key={x*195}
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