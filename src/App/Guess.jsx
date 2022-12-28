import React from 'react';

const Guess = (props) => {
  const { guess, feedback } = props;
  return (
    <div className="feedback">
      <div>
        <p>
          {guess}
        </p>
      </div>
      <div>
        <p>
          {feedback}
        </p>
      </div>
    </div>
  )
}

export default Guess;