import React from 'react';
/*
  responsible for general information about the game
*/
const HowToPlay = (props) => {
  const { theme } = props;

  return (
    <>
    {
      theme === 0
      ?
      <div className="rulesCircles">
        <h3 className="rulesTitle">Rules of the game</h3>
        <p className="left">A secret code is generated depending on the difficulty you choose. The standard length of the code is 4 digits.</p>
        <p className="left">The digits making up the code range from 0 to 7 on standard difficulty.</p>
        <p className="left">You have ten attempts to guess the combination of digits making up the code.</p>
        <h3 className="rulesTitle">How to Play:</h3>
        <p className="left">This implementation has two themes: 'circles' and 'matrix'. Next to the theme toggle is the connection status, and next to that is the sign-in button or the current user.</p>
        <p className="left strong">In either theme, you click on an empty icon (circle or square) in order to display possible selections. From this display, you then select a "number"</p>
        <p className="left">In the circles theme, you select a color that represents a number, while in the matrix theme you select a symbol that represents a number.</p>
        <p className="left">If the client can reach the server, then the client will display the global leaderboards - otherwise it will fall back to local leaderboards.</p>
      </div>
      :
      <div className="rulesMatrix">
        <h3 className="rulesTitle">Rules of the game</h3>
        <p className="left">A secret code is generated depending on the difficulty you choose. The standard length of the code is 4 digits.</p>
        <p className="left">The digits making up the code range from 0 to 7 on standard difficulty.</p>
        <p className="left">You have ten attempts to guess the combination of digits making up the code.</p>
        <h3 className="rulesTitle">How to Play:</h3>
        <p className="left">This implementation has two themes: 'circles' and 'matrix'. Next to the theme toggle is the connection status, and next to that is the sign-in button or the current user.</p>
        <p className="left">In either theme, you click on an empty icon (circle or square) in order to display possible selections. From this display, you then select a "number"</p>
        <p className="left">In the circles theme, you select a color that represents a number, while in the matrix theme you select a symbol that represents a number.</p>
        <p className="left">If the client can reach the server, then the client will display the global leaderboards - otherwise it will fall back to local leaderboards.</p>
      </div>
    }
    </>
  )
}

export default HowToPlay