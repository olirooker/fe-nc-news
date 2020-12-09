import React from 'react';

const ErrorMessage = (props) => {
    return (
        <div>
            <p>{props.errorMessage}</p>
        </div>
    )
};

export default ErrorMessage;