import React from 'react';
import { Link } from '@reach/router';
import buttonStyle from './styles/button.module.css';

function SignInButton(props) {
  return (
    <div>
      <Link to='/signin' className={buttonStyle.button}>
        Sign In
      </Link>
    </div>
  );
}

export default SignInButton;
