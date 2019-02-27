import React, { Component, Fragment } from "react";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    closeSideDrawer = () => {
        this.setState({showSideDrawer : false});
    };

    toggleSideDrawer = () => {
        const showSideDrawer  = this.state.showSideDrawer;
        this.setState({showSideDrawer : !showSideDrawer });
    };

    render () {
        return (
            <Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
                <SideDrawer 
                    showSideDrawer={this.state.showSideDrawer} 
                    closeSideDrawer={this.closeSideDrawer}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;