import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, errorConfirmation] = useHttpErrorHandler(axios);
        return (
            <Fragment>
                <Modal
                    show={error}
                    closeModal={errorConfirmation}>
                    <FontAwesomeIcon icon="exclamation-circle" size="lg" title="Error" />
                    <strong>{(error && error.message) ? error.message : null}</strong>
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
};

export default withErrorHandler;