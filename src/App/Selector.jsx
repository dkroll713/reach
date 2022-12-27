import React from 'react';

const Selector = (props) => {
  const { possibleAnswers, id, set } = props;

  const setGuess = (e) => {
    set(e.target.value);
  }

  return (
    <select className={`select${id}`} onChange={setGuess}>
      {possibleAnswers.map((n, x) => {
        return (
          <option value={x}>{x}</option>
        )
      })}
    </select>
  )
}

export default Selector;