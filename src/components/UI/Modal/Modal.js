import React, { Fragment } from 'react';
import './Modal.css';
import BackDrop from '../BackDrop/BackDrop';


const modal = (props) => {
    return (
        <Fragment>
            <BackDrop show={props.show} closeModal={props.closeModal}></BackDrop>
            <div className="Modal" style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? 1 : 0
            }}>
                {props.children}
            </div>
        </Fragment>
    );
};

export default modal;