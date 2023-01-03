import React from 'react';

const Rules = (props) => {
  const { theme } = props;

  return (
    <>
    {
      theme === 0
      ?
      <div className="rules">
        <h3>Rules of the game</h3>
      </div>
      :
    }
    </>
  )
}