import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../../Shared/utility';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';

import './CheckoutContactData.css';

class CheckoutContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                validation: { required: true },
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: '',
                valid: false,
                validation: { required: true },
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                valid: false,
                validation: { required: true, minLength: 5, maxLength: 5, isNumber: true },
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                valid: false,
                validation: { required: true },
                touched: false
            },
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
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayName: 'Fastest' },
                        { value: 'cheapest', displayName: 'Cheapest' }
                    ],
                },
                value: 'fastest',
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    submitOrder = (event) => {
        event.preventDefault();
        const customerInfo = {};
        for (let key in this.state.orderForm) {
            customerInfo[key] = this.state.orderForm[key].value;
        }

        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: customerInfo,
            userId: this.props.userId
        };
        this.props.purchaseBurger(orderData, this.props.token);
    }

    inputChanged = (event, key) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        updatedOrderForm[key].touched = true;
        updatedOrderForm[key].value = event.target.value;
        updatedOrderForm[key].valid = checkValidity(event.target.value, updatedOrderForm[key].validation);

        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        let form = null;
        if (this.props.loading) {
            form = <Spinner />
        } else {
            let formElementsArr = [];
            for (let key in this.state.orderForm) {
                formElementsArr.push({
                    key: key,
                    element: this.state.orderForm[key]
                });
            }

            form = (
                <form onSubmit={this.submitOrder}>
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
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
                </form>
            );
        }

        return (
            <div className="CheckoutContactData">
                <h4>Enter your contact information</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.burgerBuilder.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CheckoutContactData, axios));