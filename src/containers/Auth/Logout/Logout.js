import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const logout = (props) => {
    useEffect(() => {
        props.logout();
    }, [])
    return (
        <Redirect to="/login" />
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.authLogout())
    }
};

export default connect(null, mapDispatchToProps)(logout);