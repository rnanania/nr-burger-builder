import React, { Component } from 'react';

// Require imports for font awesome icons to use in react app.
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHamburger, faBars, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

// Font awesome icons addition to app.
library.add(faBars, faHamburger, faSpinner, faExclamationCircle);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
