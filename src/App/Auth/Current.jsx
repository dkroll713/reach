import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


/*
  displays either current user or log-in button
*/
const Current = (props) => {
  const {
    loginWithRedirect, logout, user, isAuthenticated, isLoading
  } = useAuth0();
  const {
    theme
  } = props;

  if (isLoading) {
    return (
      <div className="profile">Loading. . .</div>
    )
  }

  return (
    <>
      {
        isAuthenticated
        ?
        <div className="profile">
          <h3>Signed in as: {user.name}</h3>
          <button className="signInBtn" onClick={() => logout({returnTo: window.location.origin})}>Log out</button>
        </div>
        :
        <div className="profile">
          <h3>Login or continue playing as a guest</h3>
          <button className="signInBtn" onClick={() => loginWithRedirect()}>Log in</button>
        </div>
      }
    </>
  )
}

export default Current;