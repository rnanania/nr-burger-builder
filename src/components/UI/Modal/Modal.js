import React, { Component, Fragment } from 'react';
import BackDrop from '../BackDrop/BackDrop';
import './Modal.css';

class Modal extends Component {
    // Should update only on show props change.
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    }

    render() {
        return (
            <Fragment>
                <BackDrop show={this.props.show} clicked={this.props.closeModal}></BackDrop>
                <div className="Modal" style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? 1 : 0
                }}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
};

export default Modal;