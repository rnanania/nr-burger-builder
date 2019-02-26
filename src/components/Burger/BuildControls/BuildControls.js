import React from 'react';
import PropTypes from 'prop-types';

import './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
    return (
        <div className="BuildControls">
            <p> Total Price: <strong>${props.price.toFixed(2)}</strong></p>
            {
                controls.map(ctrl => (<BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabled={props.ingredients[ctrl.type]}/>
                ))
            }
            <button className="OrderButton" disabled={!props.purchasable} onClick={props.purchase}>Order Now</button>
        </div>
    );
};

buildControls.propTypes = {
    ingredients: PropTypes.object,
    price: PropTypes.number,
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    purchase: PropTypes.func,
    purchasable: PropTypes.bool
}

export default buildControls;