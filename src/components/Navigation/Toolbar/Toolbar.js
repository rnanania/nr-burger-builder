import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className="Toolbar">
            <div>Menu</div>
            <div>
                <FontAwesomeIcon icon="hamburger" size="lg" title="Home"/>
            </div>
            <NavigationItems />
        </header>
    );
};

export default toolbar;