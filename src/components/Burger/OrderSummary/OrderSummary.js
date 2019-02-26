import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={'order' + igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]}
                </li>
            );
        });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Ingredients:</p>
            <ul>
                {ingSummary}
            </ul>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={props.cancelPurchase}>Cancel</Button>
            <Button btnType="Success" clicked={props.continuePurchase}>Continue</Button>
        </Fragment>
    );
};

export default orderSummary;