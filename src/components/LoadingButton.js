import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const LoadingButton = () => {
  return (
    <LoadingContainer>
      <ReactLoading type={'spin'} color={'#0f326c'} height={20} width={20} />
    </LoadingContainer>
  );
};
export default LoadingButton;
