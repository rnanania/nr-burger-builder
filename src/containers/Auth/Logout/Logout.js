import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

// Properties coming from Store Dispatch
interface DispatchProps {
    logout: () => void
}

type Props = DispatchProps;

class Logout extends Component<Props> {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.authLogout())
    }
};

export default connect(null, mapDispatchToProps)(Logout);