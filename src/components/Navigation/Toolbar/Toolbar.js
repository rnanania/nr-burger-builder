import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className="Toolbar">
            <div className="MobileOnly" onClick={props.toggleSideDrawer}>
                <FontAwesomeIcon icon="bars" size="2x" title="Menu" />
            </div>
            <FontAwesomeIcon icon="hamburger" size="2x" title="Home"/>
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
            
        </header>
    );
};

export default toolbar;