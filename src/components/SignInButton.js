import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const SignInBtn = styled(Link)`
  border-radius: 4px;
  background: none;
  margin-right: 3px;
  padding: 10px 22px;
  color: #256ce1;
  font-size: 1.4rem;
  font-weight: 600;
  border: 1px solid #256ce1;
  outline: none;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    transition: all 300ms ease-in-out;
    background: #e8e8e8;
    /* color: white; */
  }
`;

function SignInButton(props) {
  return (
    <div>
      <SignInBtn to='/signin'>Sign In</SignInBtn>
    </div>
  );
}

export default SignInButton;
