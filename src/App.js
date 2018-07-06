import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './containers/Header';
import HomePage from './containers/HomePage';
import SignUpPage from './containers/SignUpPage';
import SignInPage from './containers/SignInPage';
import DashboardPage from './containers/DashboardPage';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signup' component={SignUpPage} />
          <Route exact path='/signin' component={SignInPage} />
          <Route exact path='/dashboard' component={DashboardPage} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
