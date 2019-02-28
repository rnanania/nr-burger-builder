import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: DO this different way than creating axios interceprot here.
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        reqInterceptor = null;
        resInterceptor = null;

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmation = () => {
            this.setState({ error: null })
        }

        render () {
            return (
                <Fragment>
                    <Modal 
                        show={this.state.error}
                        closeModal={this.errorConfirmation}>
                        <FontAwesomeIcon icon="exclamation-circle" size="lg" title="Error"/>
                        <strong>{(this.state.error && this.state.error.message) ? this.state.error.message : null}</strong>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    } 
};

export default withErrorHandler;