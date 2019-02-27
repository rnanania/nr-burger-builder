import React from 'react';
import './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="build" classes="active">Builder</NavigationItem>
            <NavigationItem link="checkout" classes="">Checkout</NavigationItem>
        </ul>
    );
};

export default navigationItems;