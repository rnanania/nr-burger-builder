import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BackDrop from '../../UI/BackDrop/BackDrop';
import './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
    return (
        <Fragment>
            <BackDrop show={props.showSideDrawer} clicked={props.closeSideDrawer} />
            <div className={"SideDrawer " + (props.showSideDrawer ? "Open" : "Close")}
                onClick={props.closeSideDrawer}>
                <FontAwesomeIcon icon="hamburger" size="4x" title="Home" />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;