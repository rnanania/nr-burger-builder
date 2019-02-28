import React from 'react';
import './Spinner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const spinner = (props) => {
    return (
        <div className="Spinner">
            <FontAwesomeIcon icon="spinner" size="4x" title="Loading" spin/>
        </div>
    );
};

export default spinner;