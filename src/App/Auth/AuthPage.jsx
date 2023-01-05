import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthPage = () => {

  return (
    <div>
      <button>Log in</button>
      <button>Sign up</button>
    </div>
  )
}

export default AuthPage;