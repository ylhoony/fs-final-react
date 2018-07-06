import React, { Component } from 'react';
import Header from './containers/Header';
import SignUpPage from './containers/SignUpPage';

// import logo from './logo.svg';
import './App.css';



class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SignUpPage />
      </div>
    )
  }
}

export default App;
