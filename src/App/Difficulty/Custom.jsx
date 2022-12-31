import React, { useState} from 'react';

const Custom = (props) => {
  const { display, settings, setSettings } = props;
  const [feedback, setFeedback] = useState('1');
  const [digits, setDigits] = useState('8');
  const [comboLength, setComboLength] = useState('4');
  const [attempts, setAttempts] = useState('10');

  const digitsArr = new Array(11).fill(0);
  const comboLengthArr = new Array(11).fill(0);
  const attemptsArr = new Array(100).fill(0)

  const handleChanges = (e) => {
    console.log(e.target.name, e.target.value)
    if (e.target.name === "feedback") {
      setFeedback(e.target.value)
      let params = {
        "feedback":Number(e.target.value),
        "digits":Number(digits),
        "comboLength":Number(comboLength),
        "attempts":Number(attempts)
      }
      setSettings(params);
    } else if (e.target.name === "digits") {
      setDigits(e.target.value)
      let params = {
        "feedback":Number(feedback),
        "digits":Number(e.target.value),
        "comboLength":Number(comboLength),
        "attempts":Number(attempts)
      }
      setSettings(params);
    } else if (e.target.name === "comboLength") {
      setComboLength(e.target.value)
      let params = {
        "feedback":Number(feedback),
        "digits":Number(digits),
        "comboLength":Number(e.target.value),
        "attempts":Number(attempts)
      }
      setSettings(params);
    } else if (e.target.name === "attempts") {
      setAttempts(e.target.value)
      let params = {
        "feedback":Number(feedback),
        "digits":Number(digits),
        "comboLength":Number(comboLength),
        "attempts":Number(e.target.value)
      }
      setSettings(params);
    }
  }

  console.log(display)
  return (
    <>
    {
      !display
        ?
        <div className="difficulty">
          <h3 className="title rulesTitle">Custom</h3>
          <p>The player can toggle individual settings, such as: </p>
          <ul className="list">
            <li className="listItem">
              <div className="diffOption">
                <h3>precise or vague feedback:</h3>
                <select name="feedback" onChange={handleChanges}>
                  <option value="null"></option>
                  <option value="0">Precise</option>
                  <option value="1">Vague</option>
                </select>
              </div>
            </li>
            <li className="listItem">
              <div className="diffOption">
                <h3>number of possible digits:</h3>
                <select name="digits" onChange={handleChanges}>
                  <option value="null"></option>
                  {
                    digitsArr.map((n,x) => {
                      if (x !== 0) {
                        return (
                          <option key={x*100} value={x}>{x}</option>
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
                <select name="comboLength" onChange={handleChanges}>
                  <option value="null"></option>
                  {
                    comboLengthArr.map((n,x) => {
                      if (x !== 0) {
                        return (
                          <option key={x*200}value={x}>{x}</option>
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
                <select name="attempts" onChange={handleChanges}>
                  <option value="null"></option>
                  {
                    attemptsArr.map((n,x) => {
                      if (x !== 0) {
                        return (
                          <option key={x*300}value={x}>{x}</option>
                        )
                      }
                    })
                  }
                </select>
              </div>
            </li>
          </ul>
        </div>
        :
        <div className="difficulty">
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
                <div className="info">{digits}</div>
              </div>
            </li>
            <li className="listItem">
              <div className="diffOption">
                <h3>length of possible combinations:</h3>
                <div className="info">{comboLength}</div>
              </div>
            </li>
            <li className="listItem">
              <div className="diffOption">
                <h3>number of attempts:</h3>
                <div className="info">{attempts}</div>
              </div>
            </li>
          </ul>
        </div>
    }
    </>

  )
}

export default Custom;