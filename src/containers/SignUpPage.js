import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpPage extends Component {
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
    fetch('/api/v1/sign_up', {
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
        <p>Sign up</p>

        <form onSubmit={(event) => this.handleFormSubmit(event)}>
          <div>
            <label htmlFor='first_name'>First Name</label>
            <input 
              id='first_name'
              name='first_name'
              required
              type='text'
              onChange={(event) => this.handleInputChange(event)}
            />
          </div>
          <div>
            <label htmlFor='last_name'>Last Name</label>
            <input
              id='last_name'
              name='last_name'
              required
              type='text'
              onChange={(event) => this.handleInputChange(event)}
            />
          </div>
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
          <div>
            <label htmlFor='password_confirmation'>Password Confirmation</label>
            <input
              id='password_confirmation'
              name='password_confirmation'
              required
              type='password'
              onChange={(event) => this.handleInputChange(event)}
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <p><Link to='/signin'>Sign in</Link></p>
      </React.Fragment>
    )
  }
}

export default SignUpPage;