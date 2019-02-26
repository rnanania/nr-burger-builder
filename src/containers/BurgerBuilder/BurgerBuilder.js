import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// Ingredient price global.
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        minPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredient = (type) => {
        const ingCount = this.state.ingredients[type];
        let totalPrice = this.state.totalPrice;
        const ingredients = {
            ...this.state.ingredients
        };

        ingredients[type] = ingCount + 1;
        totalPrice += (INGREDIENT_PRICES[type]);
        this.setState({ 
            totalPrice: totalPrice,
            ingredients: ingredients
        });
        this.updatePurchasable(totalPrice);
    };

    removeIngredient = (type) => {
        const ingCount = this.state.ingredients[type];
        if(ingCount <= 0) {
            return;
        }
        let totalPrice = this.state.totalPrice;
        const ingredients = {
            ...this.state.ingredients
        };

        ingredients[type] =  ingCount - 1;
        totalPrice -=   (INGREDIENT_PRICES[type]);
        this.setState({ 
            totalPrice: totalPrice,
            ingredients: ingredients
        });
        this.updatePurchasable(totalPrice);
    };

    updatePurchasable = (totalPrice) => {
        this.setState({ purchasable: (totalPrice > this.state.minPrice) });
    };

    purchase = () => {
        this.setState({ purchasing: true });
    };

    cancelPurchase = () => {
        this.setState({ purchasing: false });
    };

    continuePurchase = () => {
        alert('Purchase in continue...');
    };

    render () {
        return (
            <Fragment>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchase}>
                    <OrderSummary ingredients={this.state.ingredients} cancelPurchase={this.cancelPurchase} continuePurchase={this.continuePurchase}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    purchase={this.purchase}
                ></BuildControls>
            </Fragment>
        );
    }
}

export default BurgerBuilder;