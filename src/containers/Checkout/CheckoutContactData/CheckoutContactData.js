import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

import './CheckoutContactData.css';

class CheckoutContactData extends Component {
    state = {
        name: '',
        address: {
            street: '',
            zip: '',
            country: 'USA'
        },
        email: '',
        loading: false
    }

    submitOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: 0,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false});
                console.info(error);
            });        
    }

    render() {
        let form = null;
        if(this.state.loading) {
            form = <Spinner />
        } else {
            form = (
                <form>
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="email" placeholder="Email"/>
                    <input type="text" name="street" placeholder="Street Address"/>
                    <input type="text" name="zip" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.submitOrder}>Submit</Button>
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

export default CheckoutContactData;