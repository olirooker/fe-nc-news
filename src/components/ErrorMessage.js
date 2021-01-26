import React from 'react';
import errorMessageStyle from './styles/errorMessage.module.css';
import cardStyle from './styles/card.module.css';
import buttonStyle from './styles/button.module.css';
import img404 from '../assets/searching-5.png';
import { navigate } from '@reach/router';

const ErrorMessage = (props) => {
  console.log(props);

  return (
    <div className={cardStyle.errorMessageCard}>
      <div className={errorMessageStyle.container}>
        <img src={img404} alt='Not found!' width='40%' />
        <p className={errorMessageStyle.message}>
          {' '}
          Oh no! {props.errorMessage}
        </p>
        {props.default ? (
          <button
            className={`${buttonStyle.button} ${errorMessageStyle.goBack}`}
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        ) : (
          <button
            className={`${buttonStyle.button} ${errorMessageStyle.goBack}`}
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh Page
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
