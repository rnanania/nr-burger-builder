import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

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
                validation: { required: true, minLength: 5, maxLength: 5 },
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
                validation: { required: true },
                touched: false
            },
            deliveryMethod: {
                elementType: 'select', 
                elementConfig: {
                    options: [
                        { value: 'fastest', displayName: 'Fastest'},
                        { value: 'cheapest', displayName: 'Cheapest'}
                    ],
                },
                value: 'fastest',
                valid: true,
                validation: {},
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    submitOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const customerInfo = {};
        for(let key in this.state.orderForm) {
            customerInfo[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: customerInfo
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
                console.info(error);
            });
    }

    isValid = (value, rules) => {
        if(!rules) {
            return true;
        }

        let isValid = true;
        if(rules.required){
            isValid = (value.trim() !== '') && isValid;
        }
        if(rules.minLength){
            isValid = (value.length >= rules.minLength) && isValid;
        }
        if(rules.maxLength){
            isValid = (value.length <= rules.maxLength) && isValid;
        }        
        return isValid;
    }

    inputChanged = (event, key) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        updatedOrderForm[key].touched = true;
        updatedOrderForm[key].value = event.target.value;
        updatedOrderForm[key].valid = this.isValid(event.target.value, updatedOrderForm[key].validation);

        let formIsValid = true;
        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        let form = null;
        if (this.state.loading) {
            form = <Spinner />
        } else {
            let formElementsArr = [];
            for(let key in this.state.orderForm){
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
                                changed={(event) => this.inputChanged(event, formElement.key)}/>
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
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(CheckoutContactData);