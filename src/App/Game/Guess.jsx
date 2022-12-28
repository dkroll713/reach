import React from 'react';

import EasyFeedback from './EasyFeedback.jsx'

const Guess = (props) => {
  const { guess, feedback, difficulty } = props;
  return (
    <div className="feedback">
      <div className="guessDiv">
        <h3 className="priorGuess">
          {guess}
        </h3>
      </div>
      <div className="feedbackDiv">
        {
          difficulty == 0
          ?
            <EasyFeedback
              feedback={feedback}
              difficulty={difficulty}
            />
          :
          <h3 className="priorFeedback">
            {feedback}
          </h3>
        }
      </div>
    </div>
  )
}

export default Guess;