import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutContactData from '../Checkout/CheckoutContactData/CheckoutContactData';

import { History } from 'history';

// Properties coming from Parent
interface OwnProps {
    history: History,
    // TODO: Find appropriate type for this.
    match: any
}

// Properties coming from Store Dispatch
interface StateProps {
    ingredients: object,
    totalPrice: number,
    purchased: boolean
}

type Props = StateProps & OwnProps;

const checkout = (props: Props) => {
    const cancelCheckout = () => {
        props.history.goBack();
    }

    const continueCheckout = () => {
        props.history.replace('/checkout/checkout-contact');
    }

    let checkoutDom = null;
    // TODO: set initialPrice to store.
    if (props.ingredients && !props.purchased && props.totalPrice > 4) {
        checkoutDom = (
            <Fragment>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    cancelCheckout={cancelCheckout}
                    continueCheckout={continueCheckout}
                />
                <Route path={props.match.path + '/checkout-contact'}
                    component={CheckoutContactData} />
            </Fragment>
        );
    } else {
        checkoutDom = <Redirect to="/" />
    }
    return checkoutDom;
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);