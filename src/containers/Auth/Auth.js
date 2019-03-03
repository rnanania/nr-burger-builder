import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../Shared/utility';
import * as actions from '../../store/actions/index';

import './Auth.css';

// Properties coming from Store State
interface StateProps {
    token: string,
    loading: boolean,
    error?: { message: string}
}

// Properties coming from Store Dispatch
interface DispatchProps {
    auth: (email: string, password: string, isSignUp: boolean) => void
}

type Props = StateProps & DispatchProps;

// Component Own State properties.
interface State {
    controls: object,
    formIsValid: boolean,
    isSignUp: boolean
}

class Auth extends Component<Props, State> {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                valid: false,
                validation: { required: true, isEmail: true },
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                validation: { required: true, minLength: 7 },
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: false
    };

    submitForm = (event) => {
        event.preventDefault();
        this.props.auth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp);
    }

    inputChanged = (event, key) => {
        const updatedControls = {
            ...this.state.controls
        }
        updatedControls[key].touched = true;
        updatedControls[key].value = event.target.value;
        updatedControls[key].valid = checkValidity(event.target.value, updatedControls[key].validation);

        let formIsValid = true;
        for (let key in updatedControls) {
            formIsValid = updatedControls[key].valid && formIsValid;
        }
        this.setState({ controls: updatedControls, formIsValid: formIsValid });
    }

    switchSignUp = () => {
        this.setState({ isSignUp: !this.state.isSignUp });
    }

    render() {
        let form = null;
        if (this.props.loading) {
            form = <Spinner />
        } else {
            if (this.props.token) {
                form = <Redirect to="/checkout" />
            } else {
                let formElementsArr = [];
                for (let key in this.state.controls) {
                    formElementsArr.push({
                        key: key,
                        element: this.state.controls[key]
                    });
                }
                form = (
                    <form onSubmit={this.submitForm}>
                        {formElementsArr.map(formElement => {
                            return (
                                <Input key={formElement.key}
                                    elementType={formElement.element.elementType}
                                    elementConfig={formElement.element.elementConfig}
                                    invalid={!formElement.element.valid}
                                    touched={formElement.element.touched}
                                    changed={(event) => this.inputChanged(event, formElement.key)} />
                            );
                        })}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>{this.state.isSignUp ? 'SignUp' : 'Login'}</Button>
                    </form>
                );
            }
        }

        return (
            <div className="Auth">
                <Button btnType="Danger" clicked={this.switchSignUp}>Switch to {this.state.isSignUp ? 'Login' : 'SignUp'}</Button>
                {form}
                <p style={{ color: 'red' }}>{this.props.error ? ('Error: ' + this.props.error.message) : ''}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);