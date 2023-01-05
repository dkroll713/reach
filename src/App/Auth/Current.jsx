import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Current = (props) => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="profile">Loading. . .</div>
    )
  }
  console.log('user:',user)
  return (
    <div className="profile">
      {
        isAuthenticated
        ?
        <div>
          <h3>{user.name}</h3>
          <button onClick={() => logout({returnTo: window.location.origin})}>Log out</button>
        </div>
        :
        <div>
          <h3>Login or continue playing as a guest</h3>
          <button onClick={() => loginWithRedirect()}>Log in</button>
        </div>
      }
    </div>
  )
}

export default Current;