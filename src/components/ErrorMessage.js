import React from 'react';
import notFoundStyle from './styles/notFound.module.css';
import cardStyle from './styles/card.module.css';
import buttonStyle from './styles/button.module.css';
import img404 from '../assets/searching-5.png';
import { navigate } from '@reach/router';

const ErrorMessage = (props) => {
  return (
    <div className={cardStyle.card}>
      <div className={notFoundStyle.container}>
        <img src={img404} alt='Not found!' width='100%' />
        <p className={notFoundStyle.message}> Oh no! {props.errorMessage}</p>
        <button
          className={`${buttonStyle.button} ${notFoundStyle.goBack}`}
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
