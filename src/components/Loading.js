import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <ReactLoading type={'spin'} color={'#00A99D'} height={50} width={50} />
    </LoadingContainer>
  );
};
export default Loading;
