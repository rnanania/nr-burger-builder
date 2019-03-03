import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutContactData from '../Checkout/CheckoutContactData/CheckoutContactData';

class Checkout extends Component {
    cancelCheckout = () => {
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/checkout-contact');
    }

    render() {
        let checkout = null;
        // TODO: set initialPrice to store.
        if (this.props.ingredients && !this.props.purchased && this.props.totalPrice > 4) {
            checkout = (
                <Fragment>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancelCheckout={this.cancelCheckout}
                        continueCheckout={this.continueCheckout}
                    />
                    <Route path={this.props.match.path + '/checkout-contact'}
                        component={CheckoutContactData} />
                </Fragment>
            );
        } else {
            checkout = <Redirect to="/" />
        }
        return checkout;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);