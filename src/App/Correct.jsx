import React from 'react';

const Correct = (props) => {
  const { answer, guess, correct } = props;

  return answer === guess && correct ? (
      <div className="correct">{guess} is correct!!</div>
  ) : null
}

export default Correct;