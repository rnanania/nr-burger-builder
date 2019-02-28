import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// Require imports for font awesome icons to use in react app.
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHamburger, faBars, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

// Font awesome icons addition to app.
library.add(faBars, faHamburger, faSpinner, faExclamationCircle);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/builder" component={BurgerBuilder} />
            <Route path="/orders" component={Orders} />
            <Redirect from="/" to="/builder" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
