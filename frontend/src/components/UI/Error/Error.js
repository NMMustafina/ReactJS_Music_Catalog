import React from 'react';
import './Error.css';

const Error = (props) => {
    return (
        <div className="error">{props.error}</div>
    );
};

export default Error;