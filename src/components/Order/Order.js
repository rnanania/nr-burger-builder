import React from 'react';
import './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredient in props.ingredients) {
        ingredients.push({ 
            name: ingredient, 
            amount: props.ingredients[ingredient]
        });
    }

    const ingString = ingredients.map(ing => {
        return <span className="ingredient" key={ing.name}>{ing.name}: ({ing.amount})</span>;
    })

    return (
        <div className="Order">
            <p>Ingredients: {ingString}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;