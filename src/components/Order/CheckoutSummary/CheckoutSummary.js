import React from 'react';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h4>Incredible impossibe Burger</h4>
            <Button btnType="Danger" clicked={props.cancelCheckout}>Cancel</Button>
            <Button btnType="Success" clicked={props.continueCheckout}>Continue</Button>
            <Burger ingredients={props.ingredients} />
        </div>
    );
};

export default checkoutSummary;