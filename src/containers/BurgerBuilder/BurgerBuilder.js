import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Ingredient price global.
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        minPrice: 4,
        purchasable: false,
        purchasing: false,
        purchaseInProgress: false,
        error: false
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
        if (ingCount <= 0) {
            return;
        }
        let totalPrice = this.state.totalPrice;
        const ingredients = {
            ...this.state.ingredients
        };

        ingredients[type] = ingCount - 1;
        totalPrice -= (INGREDIENT_PRICES[type]);
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
        const queryParams = [];
        for(let ingredient in this.state.ingredients) {
            const param = encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]);
            queryParams.push(param);
        }
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
         });
    };

    componentDidMount () {
        axios.get('/ingredients.json').then(response => {
            this.setState({ ingredients: response.data});
        }).catch(error => {
            this.setState({ error: true });
        });
    }

    render() {
        let burger = null;
        let orderSummary = null;

        // Spinner until ingredients fetched.    
        if(!this.state.ingredients){
            burger = <Spinner />
        } else {
            burger = (
                <Fragment>
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

        // Spinner in case of purchase is in progress.
        if (this.state.purchaseInProgress || !this.state.ingredients) {
            orderSummary = <Spinner />
        } else {
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                cancelPurchase={this.cancelPurchase}
                continuePurchase={this.continuePurchase}
                price={this.state.totalPrice} />)
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

export default withErrorHandler(BurgerBuilder, axios);