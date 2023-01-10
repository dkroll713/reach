import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LocalToggle from '../HiScores/LocalToggle.jsx'
import { ConnectionContext } from '../AppRoot.jsx'
const axios = require('axios');

/*
  responsible for rendering the "congratulations" div as well as submitting to high scores,
  and playing again
*/
const Correct = (props) => {
  /*
    answer : string = string of numbers representing the game answer
    guess : string = string of numbers representing the correct guess
    correct : boolean = true when answer === guess, determines rendering of this div
    reset : object = contains all functions necessary to reset the game board
    guesses : array = guess history, used to submit history to database
    feedbacks : array = feedback history, used to submit history to database
    difficulty : integer = represents game difficulty, used to exclude custom from submitting
    difficulties : object = used to parse name of difficulty for localStorage
    params : object = game settings
    theme : integer = determines color scheme
    userID : integer = represents the current user's ID in the database for score submission
  */
  const {
    answer, guess, correct, reset, guesses, feedbacks, difficulty,
    difficulties, params, theme, userID
  } = props;

  const connected = useContext(ConnectionContext)
  const { isAuthenticated, user } = useAuth0();

  /*
    name : string = used for local score submission
    display : boolean = used to show/hide local score submission & prevent duplicate submissions
    submitted : boolean = false until score is submitted, then true; prevents duplicate submisions
    error : boolean = false until for whatever reason there is an error
      submitting the score to the database
  */
  const [name, setName] = useState(null)
  const [display, setDisplay] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);


  // function determining whether to hide submit div or not
  const displayHidden = () => {
    setDisplay(!display)
  }

  // preserves name entered into local div
  const handleName = (e) => {
    setName(e.target.value);
  }

  /*
    if the server is not reachable, the score is submitted locally
    if the server is reachable, the score is submitted to the deployed database
  */
  const submitScore = () => {
    // console.log('connected:', connected)
    if (!connected) {
      // console.log('local submit');
      const category = difficulties[difficulty]
      console.log(category);
      const score = {};
      score.name = name.toUpperCase();
      score.score = guesses.length;
      let scores = JSON.parse(window.localStorage.getItem('scores'))
      scores[category].push(score);
      scores[category] = scores[category].sort((a, b) => a.score - b.score)
      scores[category].splice(10)
      window.localStorage.setItem('scores', JSON.stringify(scores));
      setSubmitted(true);
    } else {
      // console.log('cloud submit');
      const score = {};
      score.name = userID;
      score.difficulty = difficulty;
      score.score = guesses.length;
      score.guesses = guesses;
      score.feedbacks = feedbacks;
      axios.post('/submit', score)
        .then((res) => {
          // console.log(res);
          setSubmitted(true);
        })
        .catch((err) => {
          // console.log('error submitting score:', err);
          setError(true);
        })
    }

  }

  /*
    destructures the reset object and uses all functions to reset the game, generates a new answer,
    and initialize a new game
  */
  const resetBoard = () => {
    const { guessFns, guesses, feedback, correct, gameOver, answer, submit, chosen } = reset
    let dummy = new Array(params.comboLength).fill(0)
    // console.log('reset length:',params.comboLength)
    dummy = dummy.join('');
    guessFns.guess(dummy)
    guesses([])
    feedback([])
    correct(false)
    gameOver(false);
    setSubmitted(false);
    submit(false)
    chosen(new Array(params.comboLength).fill(false))

    const length = params.comboLength
    const max = params.digits - 1;
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


  /*
    determines which score submission to display
    if the server is reachable and the player has signed in, the submit button apppears
    if the server is reachable and the player has not signed in, they are prompted to sign in first
    if the server is not reachable, the player has the option to submit local scores
    if the player chose custom difficulty, they are not able to submit scores
  */
  switch (connected) {
    case false:
      buttons = (
        <>
          <div className="buttons">
            {
              difficulty !== 3
                ?
                submitted
                  ?
                  <h3>Score received!</h3>
                  :
                  theme === 0
                    ?
                    <div>
                      <button className="signInBtn" onClick={displayHidden}>Add to High Scores</button>
                    </div>
                    :
                    <div>
                      <button className="btnMatrix" onClick={displayHidden}>Add to High Scores</button>
                    </div>
                :
                error
                  ?
                  <h3>Error submitting score :(</h3>
                  :
                  null
            }
            {
              theme === 0
                ?
                <div>
                  <button className="signInBtn" onClick={resetBoard}>Play Again</button>
                </div>
                :
                <div>
                  <button className="btnMatrix" onClick={resetBoard}>Play Again</button>
                </div>
            }
          </div>
          {
            display && !submitted
              ?
              <div className="scoreSubmit">
                <input
                  placeholder="initials"
                  onChange={handleName}
                ></input>
                <button className="signInBtn" onClick={submitScore}>Submit</button>
              </div>
              :
              null
          }
        </>
      )
      break;
    case true:
      buttons = (
        <div className="buttons">
          {
            difficulty !== 3
              ?
              submitted
                ?
                <h3>Score received!</h3>
                :
                connected && user
                  ?
                  theme === 0
                    ?
                    <div>
                      <button className="signInBtn" onClick={submitScore}>Add to High Scores</button>
                    </div>
                    :
                    <div>
                      <button className="btnMatrix" onClick={submitScore}>Add to High Scores</button>
                    </div>
                  :
                  <div>
                    <h3>Sign in to submit a score</h3>
                  </div>
              :
              error
                ?
                <h3>Error submitting score :(</h3>
                :
                null
          }
          {
            theme === 0
              ?
              <div>
                <button className="signInBtn" onClick={resetBoard}>Play Again</button>
              </div>
              :
              <div>
                <button className="btnMatrix" onClick={resetBoard}>Play Again</button>
              </div>
          }
        </div>
      )
      break;
  }

  return correct ? (
    <div className="relative">
      <div className="correct">
        {
          theme === 0
            ?
            <div className="imageContainer">
              <h3>Congratulations!</h3>
            </div>
            :
            <>
              <div className="imageContainer">
                <img src={"/assets/udidit.jpg"} />
              </div>
              <h3>You did it, Neo</h3>
            </>
        }
        {
          buttons
        }
      </div>
    </div>
  ) : null
}

export default Correct;