import React from 'react';
import { Link } from '@reach/router';
import buttonStyle from './styles/button.module.css';

function CreateAccountButton(props) {
  return (
    <div>
      <Link
        to='/signin'
        className={`${buttonStyle.button} ${buttonStyle.createAccount}`}
      >
        Create Account
      </Link>
    </div>
  );
}

export default CreateAccountButton;
