import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from './actions/index';

import Header from './containers/Header';
import SignUpPage from './containers/users/SignUpPage';
import SignInPage from './containers/users/SignInPage';
import DashboardPage from './containers/DashboardPage';

// import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.actions.authUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            { this.props.user && <Header /> }
            
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/signin' component={SignInPage} />
            <Route exact path='/dashboard' component={DashboardPage} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

function mapStateToProps({ user }) {  
  return { user };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
