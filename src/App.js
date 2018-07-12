import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from './actions/index';

import Header from './containers/Header';
import Main from './containers/Main';
import Footer from './containers/Footer';

// import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            { this.props.user && <Header /> }
            <Main />
            <Footer />
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
