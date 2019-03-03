import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Require imports for font awesome icons to use in react app.
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHamburger, faBars, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import * as actions from './store/actions/index';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

// Font awesome icons addition to app.
library.add(faBars, faHamburger, faSpinner, faExclamationCircle);

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            {this.props.isAuthenticated ? <Route path="/checkout" component={Checkout} /> : null}
            <Route path="/builder" component={BurgerBuilder} />
            {this.props.isAuthenticated ? <Route path="/orders" component={Orders} /> : null}
            <Route path="/login" component={Auth} />
            {this.props.isAuthenticated ? <Route path="/logout" component={Logout} /> : null}
            <Redirect from="/" to="/builder" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoLogin: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
