import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import './Layout.css';

// Properties coming from Store Dispatch
interface StateProps {
    isAuthenticated: string
}

type Props = StateProps;

class Layout extends Component<Props> {
    state = {
        showSideDrawer: false
    };

    closeSideDrawer = () => {
        this.setState({ showSideDrawer: false });
    };

    toggleSideDrawer = () => {
        const showSideDrawer = this.state.showSideDrawer;
        this.setState({ showSideDrawer: !showSideDrawer });
    };

    render() {
        return (
            <Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawer} isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer
                    showSideDrawer={this.state.showSideDrawer}
                    closeSideDrawer={this.closeSideDrawer}
                    isAuthenticated={this.props.isAuthenticated} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token
    }
};

export default connect(mapStateToProps)(Layout);