import React from 'react';

import EasyFeedback from './EasyFeedback.jsx'
import Circle from './Circles/Circle.jsx'

const Guess = (props) => {
  const { guess, feedback, difficulty, params, theme } = props;

  const key = [
    "red",
    "blue",
    "green",
    "orange",
    "yellow",
    "purple",
    "pink",
    "black",
    "aquamarine",
    "beige"
  ]
  const places = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth"
  ]

  const chars = [
    "ｵ", // B5
    "ｦ", // A6
    "ｶ", // B6
    "ｸ", // B8
    "ﾇ", // C7
    "ｷ", // B7
    "ﾓ", // D3
    "ｺ", // BA
    "ﾏ", // CF
    "ｻ" // BB
  ]

  let circles = [];

  for (let x = 0; x < key.length; x++) {
    let obj = {};
    obj.index = x;
    obj.color = key[x];
    obj.place = places[x];
    circles.push(obj);
  }

  let newGuess = guess.split('');
  for (let x = 0; x < newGuess.length; x++) {
    newGuess[x] = chars[newGuess[x]]
  }
  newGuess = newGuess.join('');

  return (
    <div className="feedback">
      <div className="guessDiv">
        {/* <h3 className="priorGuess">
          {guess}
        </h3> */}
        {
          theme === 0
          ?
          <div className="row">
          {
            guess.split('').map((digit, x) => {
              console.log('digit:', digit)
              return (
                <Circle
                  circle={circles[digit]}
                />
              )
            })
          }
          </div>
          :
          <>
          <h3 className="priorGuess">
            {newGuess}
          </h3>
          </>
        }

      </div>
      <div className="feedbackDiv">
        {
          params.feedback == 0
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