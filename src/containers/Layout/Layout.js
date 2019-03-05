import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import './Layout.css';

// Properties coming from parent Component
interface OwnProps {
    children: any
}

// Properties coming from Store Dispatch
interface StateProps {
    isAuthenticated: string
}

type Props = OwnProps & StateProps;

const layout = (props: Props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const closeSideDrawer = () => {
        setShowSideDrawer(false);
    };

    const toggleSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <Fragment>
            <Toolbar toggleSideDrawer={toggleSideDrawer} isAuthenticated={props.isAuthenticated} />
            <SideDrawer
                showSideDrawer={showSideDrawer}
                closeSideDrawer={closeSideDrawer}
                isAuthenticated={props.isAuthenticated} />
            <main className="Content">
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token
    }
};

export default connect(mapStateToProps)(layout);