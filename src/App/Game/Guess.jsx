import React from 'react';

const Guess = (props) => {
  const { guess, feedback } = props;
  return (
    <div className="feedback">
      <div className="guessDiv">
        <h3 className="priorGuess">
          {guess}
        </h3>
      </div>
      <div className="feedbackDiv">
        <h3 className="priorFeedback">
          {feedback}
        </h3>
      </div>
    </div>
  )
}

export default Guess;