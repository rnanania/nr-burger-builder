import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Spinner.css';

const spinner = (props) => {
    return (
        <div className="Spinner">
            <FontAwesomeIcon icon="spinner" size="4x" title="Loading" spin />
        </div>
    );
};

export default spinner;