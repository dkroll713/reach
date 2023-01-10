import React from 'react';

/*
  responsible for rendering colored circles representing incorrect, partially correct, and correct guesses
*/
const EasyFeedback = (props) => {
  //feedback : string = either string of digits or text, represents feedback for a given guess
  let { feedback } = props;

  // converts string to array for react iteration
  feedback = feedback.length > 1 ? feedback.split('') : [feedback]
  return (
    <div className="circles">
      {feedback.map((grade, x) => {
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