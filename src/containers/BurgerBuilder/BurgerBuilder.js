import React, { Component, Fragment } from 'react';
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
        totalPrice: 4
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
    };

    render () {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    ingredients={this.state.ingredients}
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                ></BuildControls>
            </Fragment>
        );
    }
}

export default BurgerBuilder;