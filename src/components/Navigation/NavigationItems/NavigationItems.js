import React from 'react';
import './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/build">Builder</NavigationItem>
            <NavigationItem link="/checkout">Checkout</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    );
};

export default navigationItems;