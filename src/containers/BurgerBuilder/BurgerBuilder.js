import React, { Component, Fragment } from 'react';
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

import { History } from 'history';

// Properties coming from Parent
interface OwnProps {
    history: History
}

// Properties coming from Store State
interface StateProps {
    ingredients: object,
    totalPrice: number,
    error: boolean,
    isAuthenticated: string
}

// Properties coming from Store Dispatch
interface DispatchProps {
    initIngredients: () => void,
    addIngredient: (type:string) => void,
    removeIngredient: (type:string) => void,
    initPurchase: () => void
}

type Props = StateProps & DispatchProps & OwnProps;

// Component Own State properties.
interface State {
    minPrice: number,
    purchasing: boolean,
    purchaseInProgress: boolean
}

class BurgerBuilder extends Component<Props, State> {
    state = {
        minPrice: 4,
        purchasing: false,
        purchaseInProgress: false
    }

    updatePurchasable = (totalPrice: number) => {
        return (totalPrice > this.state.minPrice);
    };

    purchase = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.history.push('/login');
        }
    };

    cancelPurchase = () => {
        this.setState({ purchasing: false });
    };

    continuePurchase = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout');
    };

    componentDidMount() {
        if (!this.props.ingredients) {
            this.props.initIngredients();
        }
    }

    render() {
        let burger = null;
        let orderSummary = null;

        // Spinner until ingredients fetched.    
        if (!this.props.ingredients) {
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
                        isAuthenticated={this.props.isAuthenticated}
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
        if (this.props.error) {
            burger = (
                <p>
                    <FontAwesomeIcon icon="exclamation-circle" size="lg" title="Error" />
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
        addIngredient: (type: string) => dispatch(actions.addIngredient(type)),
        removeIngredient: (type: string) => dispatch(actions.removeIngredient(type)),
        initPurchase: () => { dispatch(actions.purchaseBurgerInit()) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));