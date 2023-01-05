import React from 'react';

const HowToPlay = (props) => {
  const { theme } = props;

  return (
    <>
    {
      theme === 0
      ?
      <div className="rulesCircles">
        <h3 className="rulesTitle">Rules of the game</h3>
        <p>A secret code is generated depending on the difficulty you choose. The standard length of the code is 4 digits.</p>
        <p>The digits making up the code range from 0 to 7 on standard difficulty.</p>
        <p>You have ten attempts to guess the combination of digits making up the code.</p>
        <h3 className="rulesTitle">How to Play:</h3>
        <p>This implementation has two themes: 'circles' and 'matrix'. Next to the theme toggle is the connection status, and next to that is the sign-in button or the current user.</p>
        <p>In either theme, you click on an empty icon (circle or square) in order to display possible selections. From this display, you then select a "number"</p>
        <p>In the circles theme, you select a color that represents a number, while in the matrix theme you select a symbol that represents a number.</p>
        <p>If the client can reach the server, then the client will display the global leaderboards - otherwise it will fall back to local leaderboards.</p>
      </div>
      :
      <div className="rulesMatrix">
        <h3 className="rulesTitle">Rules of the game</h3>
        <p>A secret code is generated depending on the difficulty you choose. The standard length of the code is 4 digits.</p>
        <p>The digits making up the code range from 0 to 7 on standard difficulty.</p>
        <p>You have ten attempts to guess the combination of digits making up the code.</p>
        <h3 className="rulesTitle">How to Play:</h3>
        <p>This implementation has two themes: 'circles' and 'matrix'. Next to the theme toggle is the connection status, and next to that is the sign-in button or the current user.</p>
        <p>In either theme, you click on an empty icon (circle or square) in order to display possible selections. From this display, you then select a "number"</p>
        <p>In the circles theme, you select a color that represents a number, while in the matrix theme you select a symbol that represents a number.</p>
        <p>If the client can reach the server, then the client will display the global leaderboards - otherwise it will fall back to local leaderboards.</p>
      </div>
    }
    </>
  )
}

export default HowToPlay