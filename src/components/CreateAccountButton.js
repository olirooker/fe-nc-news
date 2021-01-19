import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const CreateAccountBtn = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  margin-left: 3px;
  padding: 10px 22px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  border: 1px solid #256ce1;
  outline: none;
  transition: all 300ms ease-in-out;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    transition: all 300ms ease-in-out;
    background: #fff;
    color: #256ce1;
  }
`;

function CreateAccountButton(props) {
  return (
    <div>
      <CreateAccountBtn to='/signin'>Create Account</CreateAccountBtn>
    </div>
  );
}

export default CreateAccountButton;
