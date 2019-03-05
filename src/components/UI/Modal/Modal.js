import React, { Fragment } from 'react';
import BackDrop from '../BackDrop/BackDrop';
import './Modal.css';

const modal = (props) => {
    return (
        <Fragment>
            <BackDrop show={props.show} clicked={props.closeModal}></BackDrop>
            <div className="Modal" style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? 1 : 0
            }}>
                {props.children}
            </div>
        </Fragment>
    );
};

export default React.memo(modal, (prevProps, nextProps ) => {
    return (prevProps.show === nextProps.show) && (prevProps.children === nextProps.children);
});