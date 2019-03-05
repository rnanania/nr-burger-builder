import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../../Shared/utility';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';

import './CheckoutContactData.css';

const checkoutContactData = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [orderForm, setOrderForm] = useState({
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
    });

    const submitOrder = (event) => {
        event.preventDefault();
        const customerInfo = {};
        for (let key in orderForm) {
            customerInfo[key] = orderForm[key].value;
        }

        const orderData = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customer: customerInfo,
            userId: props.userId
        };
        props.purchaseBurger(orderData, props.token);
    }

    const inputChanged = (event, key) => {
        const updatedOrderForm = {
            ...orderForm
        }
        updatedOrderForm[key].touched = true;
        updatedOrderForm[key].value = event.target.value;
        updatedOrderForm[key].valid = checkValidity(event.target.value, updatedOrderForm[key].validation);

        let formValidity = true;
        for (let key in updatedOrderForm) {
            formValidity = updatedOrderForm[key].valid && formValidity;
        }
        setFormIsValid(formValidity);
        setOrderForm(updatedOrderForm);
    }

    let form = null;
    if (props.loading) {
        form = <Spinner />
    } else {
        let formElementsArr = [];
        for (let key in orderForm) {
            formElementsArr.push({
                key: key,
                element: orderForm[key]
            });
        }

        form = (
            <form onSubmit={submitOrder}>
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
                <Button btnType="Success" disabled={!formIsValid}>Submit</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(checkoutContactData, axios));