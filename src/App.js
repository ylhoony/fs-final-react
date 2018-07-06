import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './containers/Header';
import SignUpPage from './containers/SignUpPage';
import SignInPage from './containers/SignInPage';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/signin" component={SignInPage} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
