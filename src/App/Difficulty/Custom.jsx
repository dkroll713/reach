import React, { useState } from 'react';

/*
  renders the toggles for custom difficulty
*/
const Custom = (props) => {
  /*
    display : integer = determines which main page of the app is displayed
      (used to display custom params without toggles during gameplay)
    settings : object = contains the setting choices
    setSettings : function = updates the global settings with input when invoked
    theme : integer = determines which colorscheme to use
  */
  const { display, settings, setSettings, theme, setToggled } = props;
  /*
    feedback : integer = if 0, use precise feedback, if 1 use vague feedback
    digits : integer = 1-10, min-max range of possible answer components
    comboLength : integer = 1-10, min-max range of possible answer length
    attempts : integer = 1-99, min-max range of possible guesses
  */
  const [feedback, setFeedback] = useState(0);
  const [digits, setDigits] = useState(8);
  const [comboLength, setComboLength] = useState(4);
  const [attempts, setAttempts] = useState(10);

  // use of arrays allows react to iterate through the range & return dropdown options
  const digitsArr = new Array(11).fill(0);
  const comboLengthArr = new Array(11).fill(0);
  const attemptsArr = new Array(100).fill(0)


  // after any dropdown is selected, update the whole settings object
  const handleChanges = (e) => {
    // console.log(e.target.name, e.target.value)
    setToggled(true)
    if (e.target.name === "feedback") {
      setFeedback(e.target.value)
      let params = {
        "feedback": Number(e.target.value),
        "digits": Number(digits),
        "comboLength": Number(comboLength),
        "attempts": Number(attempts)
      }
      setSettings(params);
    } else if (e.target.name === "digits") {
      setDigits(e.target.value)
      let params = {
        "feedback": Number(feedback),
        "digits": Number(e.target.value),
        "comboLength": Number(comboLength),
        "attempts": Number(attempts)
      }
      setSettings(params);
    } else if (e.target.name === "comboLength") {
      setComboLength(e.target.value)
      let params = {
        "feedback": Number(feedback),
        "digits": Number(digits),
        "comboLength": Number(e.target.value),
        "attempts": Number(attempts)
      }
      setSettings(params);
    } else if (e.target.name === "attempts") {
      setAttempts(e.target.value)
      let params = {
        "feedback": Number(feedback),
        "digits": Number(digits),
        "comboLength": Number(comboLength),
        "attempts": Number(e.target.value)
      }
      setSettings(params);
    }
  }

  // used for color scheme
  const backgrounds = {
    0: "#32586b",
    1: "#0D0208"
  }
  const borders = {
    0: "#000000",
    1: "#00FF41"
  }

  return (
    <>
      {
        !display
          ?
          <div
            className="difficulty"
            style={{
              'backgroundColor': backgrounds[theme],
              'border': '1px solid ' + borders[theme]
            }}
          >
            <div className="text">
              <h3 className="title rulesTitle">Custom</h3>
              <p>The player can toggle individual settings, such as: </p>
              <ul className="list">
                <li className="listItem">
                  <div className="diffOption">
                    <h3>precise or vague feedback:</h3>
                    <select name="feedback" onChange={handleChanges} value={feedback}>
                      <option value="0">Precise</option>
                      <option value="1">Vague</option>
                    </select>
                  </div>
                </li>
                <li className="listItem">
                  <div className="diffOption">
                    <h3>number of possible digits:</h3>
                    <select name="digits" onChange={handleChanges} value={digits}>
                      {
                        digitsArr.map((n, x) => {
                          if (x > 1) {
                            return (
                              <option key={x * 100} value={x}>{x}</option>
                            )
                          }
                        })
                      }
                    </select>
                  </div>
                </li>
                <li className="listItem">
                  <div className="diffOption">
                    <h3>length of possible combinations:</h3>
                    <select name="comboLength" onChange={handleChanges} value={comboLength}>
                      {
                        comboLengthArr.map((n, x) => {
                          if (x !== 0) {
                            return (
                              <option key={x * 200} value={x}>{x}</option>
                            )
                          }
                        })
                      }
                    </select>
                  </div>
                </li>
                <li className="listItem">
                  <div className="diffOption">
                    <h3>number of attempts:</h3>
                    <select name="attempts" onChange={handleChanges} value={attempts}>
                      {
                        attemptsArr.map((n, x) => {
                          if (x !== 0) {
                            return (
                              <option key={x * 300} value={x}>{x}</option>
                            )
                          }
                        })
                      }
                    </select>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          :
          <div className="difficulty" style={{ 'backgroundColor': backgrounds[theme] }}>
            <div className="text">
              <h3 className="title rulesTitle">Custom</h3>
              <p>The player can toggle individual settings, such as: </p>
              <ul className="list">
                <li className="listItem">
                  <div className="diffOption">
                    <h3>precise or vague feedback:</h3>
                    {
                      feedback == 0
                        ?
                        <div className="info">Precise</div>
                        :
                        <div className="info">Vague</div>
                    }
                  </div>
                </li>
                <li className="listItem">
                  <div className="diffOption">
                    <h3>number of possible digits:</h3>
                    <div className="info">{settings.digits}</div>
                  </div>
                </li>
                <li className="listItem">
                  <div className="diffOption">
                    <h3>length of possible combinations:</h3>
                    <div className="info">{settings.comboLength}</div>
                  </div>
                </li>
                <li className="listItem">
                  <div className="diffOption">
                    <h3>number of attempts:</h3>
                    <div className="info">{settings.attempts}</div>
                  </div>
                </li>
              </ul>
            </div>
            {
              display === 1
                ?
                <p>To start playing, click on an empty circle (circles theme) or square(matrix theme).</p>
                :
                null
            }
          </div>
      }
    </>

  )
}

export default Custom;