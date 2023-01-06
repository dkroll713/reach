import React, { useState } from 'react';

/*
  shows status of connection to the server
  I thought it looked cool
*/
const Connection = (props) => {
  // connected : boolean = if true, server was pinged; if false, server was not pinged
  const {
    connected
  } = props;

  return (
    <div className="connected">
        Connection status:
      {
        connected
        ?
        <div className="circle two"></div>
        :
        <div className="circle zero"></div>
      }
      </div>
  )
}

export default Connection;