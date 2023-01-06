import React from 'react';

/*
  leftover from refactor - uses a dropdown to select numbers making up a guess
*/
const Selector = (props) => {
  const { possibleAnswers, id, set } = props;

  const setGuess = (e) => {
    set(e.target.value);
  }

  return (
    <select className={`select${id}`} onChange={setGuess}>
      {possibleAnswers.map((n, x) => {
        return (
          <option key={x} value={x}>{x}</option>
        )
      })}
    </select>
  )
}

export default Selector;