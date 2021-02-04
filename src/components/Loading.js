import React from 'react';
import ReactLoading from 'react-loading';
import loadingStyle from './styles/loading.module.css';

const Loading = () => {
  return (
    <div className={loadingStyle.loadingContainerPage}>
      <ReactLoading type={'spin'} color={'#00A99D'} height={50} width={50} />
    </div>
  );
};
export default Loading;
