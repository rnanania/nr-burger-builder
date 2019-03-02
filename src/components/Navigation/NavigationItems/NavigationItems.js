import React, { Fragment } from 'react';
import './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/builder">Builder</NavigationItem>
            {props.isAuthenticated ?
                (
                    <Fragment>
                        <NavigationItem link="/checkout">Checkout</NavigationItem>
                        <NavigationItem link="/orders">Orders</NavigationItem>
                        <NavigationItem link="/logout">Logout</NavigationItem>
                    </Fragment>
                ) :
                <NavigationItem link="/login">Login</NavigationItem>
            }
        </ul>
    );
};

export default navigationItems;