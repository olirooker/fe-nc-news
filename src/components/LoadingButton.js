import React from 'react';
import ReactLoading from 'react-loading';
import loadingStyle from './styles/loading.module.css';

const LoadingButton = () => {
  return (
    <div className={loadingStyle.loadingContainer}>
      <ReactLoading type={'spin'} color={'#0f326c'} height={20} width={20} />
    </div>
  );
};
export default LoadingButton;
