import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>Incredible impossibe Burger</h1>
            <Button btnType="Danger" clicked={props.cancelCheckout}>Cancel</Button>
            <Button btnType="Success" clicked={props.continueCheckout}>Continue</Button>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
        </div>
    );
};

export default checkoutSummary;