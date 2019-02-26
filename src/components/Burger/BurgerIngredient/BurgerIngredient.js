import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BurgerIngredient.css';

interface Props {
    type: string,
}

class BurgerIngredient extends Component<Props> {
    static propTypes = {
        type: PropTypes.string.isRequired
    }

    render() {
        let ingredient = null;
        // Swicth case for Ingredient.
        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = <div className="BreadBottom"></div>;
                break;
            case 'bread-top':
                ingredient = (
                    <div className="BreadTop">
                        <div className="Seeds1"></div>
                        <div className="Seeds2"></div>
                    </div>
                );
                break;
            case 'meat':
                ingredient = <div className="Meat"></div>;
                break;
            case 'cheese':
                ingredient = <div className="Cheese"></div>;
                break;
            case 'salad':
                ingredient = <div className="Salad"></div>;
                break;
            case 'bacon':
                ingredient = <div className="Bacon"></div>;
                break;
            default:
                break;
        }
        return ingredient;
    }
};

export default BurgerIngredient;