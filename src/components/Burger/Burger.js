import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import './Burger.css';
const burger = (props) => {
    let ingredientCollection = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey+i} type={igKey} />
        })
    }).reduce((arr, el) => { 
        return arr.concat(el)
    }, []);

    if(!ingredientCollection.length) {
        ingredientCollection.push(<p key="build-warning"> Please add ingredients to build a yummy burger. </p>);
    }
    
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {ingredientCollection}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;