import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutContactData from '../Checkout/CheckoutContactData/CheckoutContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
    cancelCheckout = () => {
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/checkout-contact');
    }

    render() {
        let checkout = null;
        if (this.props.ingredients) {
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
            checkout = <Spinner />
        }

        return (
            <div>
                {checkout}
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

export default connect(mapStateToProps)(Checkout);