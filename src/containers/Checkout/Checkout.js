import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutContactData from '../Checkout/CheckoutContactData/CheckoutContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }
    cancelCheckout = () => {
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/checkout-contact');
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of queryParams.entries()) {
            if (param[0] === 'price') {
                price = +param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, price: price });
    }

    render() {
        let checkout = null;
        if (this.state.ingredients) {
            checkout = (
                <Fragment>
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        cancelCheckout={this.cancelCheckout}
                        continueCheckout={this.continueCheckout}
                    />
                    <Route path={this.props.match.path + '/checkout-contact'}
                        render={(props) => (
                            <CheckoutContactData {...props}
                                ingredients={this.state.ingredients}
                                price={this.state.price} />)} />
                </Fragment>
            );
        } else {
            checkout = <Spinner />
        }

        return (
            <div>
                {checkout}
            </div>
        );
    }
}

export default Checkout;