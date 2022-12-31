import React from 'react';

const Circle = (props) => {
  const { circle, setColor } = props;
  console.log(circle);

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