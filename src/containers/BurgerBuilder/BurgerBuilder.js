import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actionTypes from '../../store/actions';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        minPrice: 4,
        purchasing: false,
        purchaseInProgress: false,
        error: false
    }

    updatePurchasable = (totalPrice) => {
        return (totalPrice > this.state.minPrice);
    };

    purchase = () => {
        this.setState({ purchasing: true });
    };

    cancelPurchase = () => {
        this.setState({ purchasing: false });
    };

    continuePurchase = () => {
        this.props.history.push('/checkout');
    };

    render() {
        let burger = null;
        let orderSummary = null;

        // Spinner until ingredients fetched.    
        if(!this.props.ingredients){
            burger = <Spinner />
        } else {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients}></Burger>
                    <BuildControls
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchasable(this.props.totalPrice)}
                        ingredientAdded={(type) => this.props.addIngredient(type)}
                        ingredientRemoved={(type) => this.props.removeIngredient(type)}
                        purchase={this.purchase}
                    ></BuildControls>
                </Fragment>
            );
        }

        // Spinner in case of purchase is in progress.
        if (this.state.purchaseInProgress || !this.props.ingredients) {
            orderSummary = <Spinner />
        } else {
            orderSummary = (<OrderSummary
                ingredients={this.props.ingredients}
                cancelPurchase={this.cancelPurchase}
                continuePurchase={this.continuePurchase}
                price={this.props.totalPrice} />)
        }

        // Error Handling
        if(this.state.error) {
            burger = (                
                <p>
                    <FontAwesomeIcon icon="exclamation-circle" size="lg" title="Error"/>
                    <strong> Ingredients can't be loaded at this moment.</strong>
                </p>
            )
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state =>  {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (type) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingName: type}),
        removeIngredient: (type) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingName: type})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));