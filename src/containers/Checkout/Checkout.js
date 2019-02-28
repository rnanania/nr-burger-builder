import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutContactData from '../Checkout/CheckoutContactData/CheckoutContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
    state = {
        ingredients: null
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
        for (let param of queryParams.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    render() {
        let checkout = null;
        if(this.state.ingredients){
            checkout = (
                <Fragment>
                    <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelCheckout}
                    continueCheckout={this.continueCheckout}
                    />
                    <Route path={this.props.match.path + '/checkout-contact'} 
                        render={(props) => (<CheckoutContactData {...props} ingredients={this.state.ingredients}/>)}/>
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