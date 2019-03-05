import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../Shared/utility';
import * as actions from '../../store/actions/index';

import './Auth.css';

const auth = (props) => {
    const [controls, setControls] = useState({
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
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const submitForm = (event) => {
        event.preventDefault();
        props.auth(
            controls.email.value,
            controls.password.value,
            isSignUp);
    }

    const inputChanged = (event, key) => {
        const updatedControls = {
            ...controls
        }
        updatedControls[key].touched = true;
        updatedControls[key].value = event.target.value;
        updatedControls[key].valid = checkValidity(event.target.value, updatedControls[key].validation);

        let formValidity = true;
        for (let key in updatedControls) {
            formValidity = updatedControls[key].valid && formValidity;
        }

        setFormIsValid(formValidity)
        setControls(updatedControls);
    }

    const switchSignUp = () => {
        setIsSignUp(!isSignUp);
    }

    let form = null;
    if (props.loading) {
        form = <Spinner />
    } else {
        if (props.token) {
            form = <Redirect to="/checkout" />
        } else {
            let formElementsArr = [];
            for (let key in controls) {
                formElementsArr.push({
                    key: key,
                    element: controls[key]
                });
            }
            form = (
                <form onSubmit={submitForm}>
                    {formElementsArr.map(formElement => {
                        return (
                            <Input key={formElement.key}
                                elementType={formElement.element.elementType}
                                elementConfig={formElement.element.elementConfig}
                                invalid={!formElement.element.valid}
                                touched={formElement.element.touched}
                                changed={(event) => inputChanged(event, formElement.key)} />
                        );
                    })}
                    <Button btnType="Success" disabled={!formIsValid}>{isSignUp ? 'SignUp' : 'Login'}</Button>
                </form>
            );
        }
    }
    
    return (
        <div className="Auth">
            <Button btnType="Danger" clicked={switchSignUp}>Switch to {isSignUp ? 'Login' : 'SignUp'}</Button>
            {form}
            <p style={{ color: 'red' }}>{props.error ? ('Error: ' + props.error.message) : ''}</p>
        </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(auth);