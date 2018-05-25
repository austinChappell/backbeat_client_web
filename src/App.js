import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// page components
import ErrorPage from './components/pages/ErrorPage';
import LandingPage from './components/pages/LandingPage';
import RecoverPasswordPage from './components/pages/RecoverPasswordPage';

import store from './redux/store/';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/recover_password" component={RecoverPasswordPage} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
