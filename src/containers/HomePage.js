import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <main>
        <h1>Home Page!!!</h1>
        <section>
          <p><Link to='/signin'>Sign in</Link></p>
          <p><Link to='/signup'>Sign up</Link></p>
        </section>
      </main>
    )
  }
}

export default HomePage;