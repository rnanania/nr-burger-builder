import React from 'react';
import './BackDrop.css';

const backDrop = (props) => {
    return (
        props.show ? <div className="BackDrop" onClick={props.closeModal}></div> : null
    );
};

export default backDrop;