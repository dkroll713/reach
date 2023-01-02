import React from 'react';

const Circle = (props) => {
  const { circle, setColor } = props;

  return (
    <div
      name={circle.color}
      className={`circle ${circle.place}`}
      onClick={setColor}
    >
    </div>
  )
}

export default Circle