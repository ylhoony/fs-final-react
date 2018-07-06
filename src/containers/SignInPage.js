import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignInPage extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  }

  handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      user: Object.assign({}, this.state.user, { [key]: value })
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/v1/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(authToken => {
        console.log(authToken);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <main className="uk-card">
          <p>Sign in</p>

          <form onSubmit={(event) => this.handleFormSubmit(event)}>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                name='email'
                required
                type='email'
                onChange={(event) => this.handleInputChange(event)}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                name='password'
                required
                type='password'
                onChange={(event) => this.handleInputChange(event)}
              />
            </div>
            <button type="submit">Sign in</button>
          </form>
          <p><Link to='/signup'>Sign up</Link></p>
        </main>
      </React.Fragment>
    )
  }
}

export default SignInPage;