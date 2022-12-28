import React, { useState } from 'react';

const axios = require('axios');

const Correct = (props) => {
  const { answer, guess, correct, reset } = props;
  const [display, setDisplay] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const displayHidden = () => {
    setDisplay(!display)
  }

  const submitScore = () => {
    setSubmitted(true);
  }

  const resetBoard = () => {
    const { guessFns, guesses, feedback, correct, gameOver, answer } = reset
    guessFns.guess('0000')
    guessFns.one('0')
    guessFns.two('0')
    guessFns.three('0')
    guessFns.four('0')
    guesses([])
    feedback([])
    correct(false)
    gameOver(false);

    const intUrl = 'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
    axios.get(intUrl)
      .then((res) => {
        let data = res.data;
        data = data.split('\n').splice(0,4).join('')
        answer(data)
      })
  }

  return answer === guess && correct ? (
    <div>
      <div className="correct">
        <h3>{guess} is correct!!</h3>
        <div className="buttons">
          <div>
            <button onClick={displayHidden}>Add to High Scores</button>
          </div>
          <div>
            <button onClick={resetBoard}>Play Again</button>
          </div>
        </div>
        {
          display && !submitted
          ?
          <div className="scoreSubmit">
            <input placeholder="name"></input>
            <button onClick={submitScore}>Submit</button>
          </div>
          :
          null
        }
      </div>
    </div>
  ) : null
}

export default Correct;