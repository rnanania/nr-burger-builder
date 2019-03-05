import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as actions from '../../store/actions/index';

export const burgerBuilder = (props) => {
    const minPrice = 4;
    const [purcahsing, setPurchasing] = useState(false);
    const [purchaseInProgress] = useState(false);

    useEffect(() => {
        if (!props.ingredients) {
            props.initIngredients();    
        }
    }, []);

    const updatePurchasable = (totalPrice) => {
        return (totalPrice > minPrice);
    };

    const purchase = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.history.push('/login');
        }
    };

    const cancelPurchase = () => {
        setPurchasing(false);
    };

    const continuePurchase = () => {
        props.initPurchase();
        props.history.push('/checkout');
    };

    let burger = null;
    let orderSummary = null;

    // Spinner until ingredients fetched.    
    if (!props.ingredients) {
        burger = <Spinner />
    } else {
        burger = (
            <Fragment>
                <Burger ingredients={props.ingredients}></Burger>
                <BuildControls
                    ingredients={props.ingredients}
                    price={props.totalPrice}
                    purchasable={updatePurchasable(props.totalPrice)}
                    ingredientAdded={(type) => props.addIngredient(type)}
                    ingredientRemoved={(type) => props.removeIngredient(type)}
                    isAuthenticated={props.isAuthenticated}
                    purchase={purchase}
                ></BuildControls>
            </Fragment>
        );
    }

    // Spinner in case of purchase is in progress.
    if (purchaseInProgress || !props.ingredients) {
        orderSummary = <Spinner />
    } else {
        orderSummary = (<OrderSummary
            ingredients={props.ingredients}
            cancelPurchase={cancelPurchase}
            continuePurchase={continuePurchase}
            price={props.totalPrice} />)
    }

    // Error Handling
    if (props.error) {
        burger = (
            <p>
                <FontAwesomeIcon icon="exclamation-circle" size="lg" title="Error" />
                <strong> Ingredients can't be loaded at this moment.</strong>
            </p>
        )
    }

    return (
        <Fragment>
            <Modal show={purcahsing} closeModal={cancelPurchase}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initIngredients: () => dispatch(actions.initIngredients()),
        addIngredient: (type) => dispatch(actions.addIngredient(type)),
        removeIngredient: (type) => dispatch(actions.removeIngredient(type)),
        initPurchase: () => { dispatch(actions.purchaseBurgerInit()) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));