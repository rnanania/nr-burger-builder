import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from './logo.svg';
import './App.css';

// Font awesome icons addition to app.
library.add(faHome);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <FontAwesomeIcon icon="home" size="lg" title="Home"/>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
