import React, { useState } from 'react';

const axios = require('axios');

const Correct = (props) => {
  const { answer, guess, correct, reset, guesses } = props;
  const [name, setName] = useState(null)
  const [display, setDisplay] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const displayHidden = () => {
    setDisplay(!display)
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const submitScore = () => {
    const score = {};
    score.name = name;
    score.score = guesses.length;
    let scores = JSON.parse(window.localStorage.getItem('scores'))
    scores.push(score);
    scores = scores.sort((a,b) => a.score - b.score)
    window.localStorage.setItem('scores',JSON.stringify(scores));
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
            <input
              placeholder="name"
              onChange={handleName}
            ></input>
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