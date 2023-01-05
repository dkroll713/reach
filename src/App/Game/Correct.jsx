import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const axios = require('axios');

const Correct = (props) => {
  const {
    answer, guess, correct, reset, guesses, difficulty, difficulties, params, local
  } = props;
  const { isAuthenticated, user } = useAuth0();
  const [name, setName] = useState(null)
  const [display, setDisplay] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const displayHidden = () => {
    setDisplay(!display)
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const submitScore = () => {
    if (local === 0) {
      console.log('local submit');
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
    } else {
      console.log('cloud submit');
      const score = {};
      score.name = user.name
      score.difficulty = difficulty
      score.score = guesses.length;
      axios.post('/submit', score)
        .then((res) => {
          console.log(res)
          setSubmitted(true);
        })
        .catch((err) => {
          console.log('error submitting score:', err)
          setError(true);
        })
    }

  }

  const resetBoard = () => {
    const { guessFns, guesses, feedback, correct, gameOver, answer } = reset
    let dummy = new Array(params.comboLength).fill(0)
    // console.log('reset length:',params.comboLength)
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
    // console.log(intUrl)
    axios.get(intUrl)
      .then((res) => {
        let data = res.data;
        // console.log('beginning data:', data)
        if (data.length > 1) {
          data.length > 1 ? data = data.split('\n') : null
          data.length > 1 ? data.pop() : null
          data = data.length > 1 ? data.join('') : null
        }
        // console.log('answer length:', data)
        answer(String(data))
      })
  }

  let buttons;
  switch(local) {
    case 0:
      buttons = (

      )
      break;
    case 1:
      buttons = (

      )
      break;
  }

  return correct ? (
    <div>
      <div className="correct">
        <img src={"/assets/udidit.jpg"}/>
        <h3>You did it, Neo</h3>
        <div className="buttons">
          {
            difficulty !== 3
            ?
            submitted
            ?
            <h3>Score received!</h3>
            :
            <div>
              <button onClick={displayHidden}>Add to High Scores</button>
            </div>
            :
            error
            ?
            <h3>Error submitting score :(</h3>
            :
            null
          }
          <div>
            <button onClick={resetBoard}>Play Again</button>
          </div>
        </div>
        {
          display && !submitted && user
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