import React, { useState } from 'react';

const axios = require('axios');

const Correct = (props) => {
  const {
    answer, guess, correct, reset, guesses, difficulty, difficulties, params
  } = props;
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
    const category = difficulties[difficulty]
    console.log(category);
    const score = {};
    score.name = name.toUpperCase();
    score.score = guesses.length;
    let scores = JSON.parse(window.localStorage.getItem('scores'))
    scores[category].push(score);
    scores[category] = scores[category].sort((a,b) => a.score - b.score)
    scores[category].splice(10)
    window.localStorage.setItem('scores',JSON.stringify(scores));
    setSubmitted(true);
  }

  const resetBoard = () => {
    const { guessFns, guesses, feedback, correct, gameOver, answer } = reset
    let dummy = new Array(params.comboLength).fill(0)
    console.log('reset length:',params.comboLength)
    dummy = dummy.join('');
    guessFns.guess(dummy)
    guesses([])
    feedback([])
    correct(false)
    gameOver(false);
    setSubmitted(false);

    const length = params.comboLength
    const max = params.digits-1;
    const intUrl = `https://www.random.org/integers/?num=${length}&min=0&max=${max}&col=1&base=10&format=plain&rnd=new`
    console.log(intUrl)
    axios.get(intUrl)
      .then((res) => {
        let data = res.data;
        console.log('beginning data:', data)
        if (data.length > 1) {
          data.length > 1 ? data = data.split('\n') : null
          data.length > 1 ? data.pop() : null
          data = data.length > 1 ? data.join('') : null
        }
        console.log('answer length:', data)
        answer(String(data))
      })
  }

  return correct ? (
    <div>
      <div className="correct">
        {/* <h3>{guess} is correct!!</h3> */}
        <img src={"/assets/udidit.jpg"}/>
        <h3>You did it, Neo</h3>
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
              placeholder="initials"
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