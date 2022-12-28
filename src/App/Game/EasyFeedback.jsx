import React from 'react';

const EasyFeedback = (props) => {
  const { feedback, difficulty } = props;

  return (
    <div className="circles">
      {feedback.split('').map((grade,x) => {
        return (
        grade == 0
        ?
        <div key={x} className="circle zero"></div>
        :
        grade == 1
        ?
        <div key={x} className="circle one"></div>
        :
        <div key={x} className="circle two"></div>
        )
      })}
    </div>
  )
}

export default EasyFeedback;