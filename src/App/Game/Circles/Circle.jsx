import React from 'react';


/*
  responsible for colored circles
*/
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