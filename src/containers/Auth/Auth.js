import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Auth.css';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
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

    isValid = (value, rules) => {
        let validity = true;      
        if(!rules) {
            validity = true;
        } else {
            if(rules.required){
                validity = (value.trim() !== '') && validity;
            }
            if(rules.minLength){
                validity = (value.length >= rules.minLength) && validity;
            }
            if(rules.maxLength){
                validity = (value.length <= rules.maxLength) && validity;
            }
            if(rules.isEmail){
                const pattern = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
                validity = pattern.test(value) && validity;
            }
            if(rules.isNumber){
                const pattern = /^[0-9]+$/;
                validity = pattern.test(value) && validity;
            }  
        }
        return validity;
    }

    inputChanged = (event, key) => {
        const updatedControls = {
            ...this.state.controls
        }
        updatedControls[key].touched = true;
        updatedControls[key].value = event.target.value;
        updatedControls[key].valid = this.isValid(event.target.value, updatedControls[key].validation);

        let formIsValid = true;
        for(let key in updatedControls){
            formIsValid = updatedControls[key].valid && formIsValid;
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    switchSignUp = () => {
        this.setState({isSignUp: !this.state.isSignUp});
    }

    render() {
        let form = null;
        if(this.props.loading){
            form = <Spinner />
        } else {
            if(this.props.token){
                form = <Redirect to="/checkout" />
            } else {
                let formElementsArr = [];
                for(let key in this.state.controls){
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
                                    changed={(event) => this.inputChanged(event, formElement.key)}/>
                            );
                        })}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>{this.state.isSignUp ? 'SignUp': 'Login'}</Button>
                    </form>
                );    
            }
        }

        return (
            <div className="Auth">
                <Button btnType="Danger" clicked={this.switchSignUp}>Switch to {this.state.isSignUp ? 'Login': 'SignUp'}</Button>
                {form}
                <p style={{color: 'red'}}>{this.props.error ? ('Error: ' + this.props.error.message) : ''}</p>
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