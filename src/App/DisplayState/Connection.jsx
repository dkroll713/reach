import React, { useState } from 'react';

const Connection = (props) => {
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