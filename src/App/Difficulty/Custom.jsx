import React from 'react';

const Custom = (props) => {
  const { display } = props;

  return (
    <>
    {
      display == 3
        ?
        <div className="difficulty">
          <h3 className="title rulesTitle">Custom</h3>
          <p>The player can toggle individual settings, such as: </p>
          <ul className="list">
            <li className="listItem">
              <div className="diffOption">
                <h3>precise or vague feedback:</h3>
                <select>

                </select>
              </div>
            </li>
            <li className="listItem">
              <div className="diffOption">
                <h3>number of possible digits:</h3>
                <select>

                </select>
              </div>
            </li>
            <li className="listItem">
              <div className="diffOption">
                <h3>length of possible combinations:</h3>
                <select>

                </select>
              </div>
            </li>
            <li className="listItem">
              <div className="diffOption">
                <h3>number of attempts:</h3>
                <select>

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
              precise or vague feedback
            </li>
            <li className="listItem">
              the number of possible digits
            </li>
            <li className="listItem">
              the length of possible combinations
            </li>
            <li className="listItem">
              and the number of attempts.
            </li>
          </ul>
        </div>

    }
    </>
  )
}

export default Custom;