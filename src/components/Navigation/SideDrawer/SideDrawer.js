import React, {Fragment} from 'react';
import './SideDrawer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';

const sideDrawer = (props) => {
    return (
        <Fragment>
            <BackDrop show={props.showSideDrawer} clicked={props.closeSideDrawer}/>
            <div className={"SideDrawer " + (props.showSideDrawer ? "Open" : "Close")}>
                <FontAwesomeIcon icon="hamburger" size="4x" title="Home" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;