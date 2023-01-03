import React from 'react';

const EasyFeedback = (props) => {
  let { feedback, difficulty } = props;
  console.log('feedback:',feedback)
  feedback = feedback.length > 1 ? feedback.split('') : [feedback]
  return (
    <div className="circles">
      {feedback.map((grade,x) => {
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