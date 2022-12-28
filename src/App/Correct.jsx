import React from 'react';

const Correct = (props) => {
  const { answer, guess, correct } = props;

  return answer === guess && correct ? (
    <div>
      <div className="correct">
        <h3>{guess} is correct!!</h3>
        <div className="buttons">
          <div>
            <button>Add to High Scores</button>
          </div>
          <div>
            <button>Play Again</button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Correct;