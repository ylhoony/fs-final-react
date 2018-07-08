import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../actions/index';

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
    this.props.actions.signUp(this.state);
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <React.Fragment>
      <main className='uk-height-viewport uk-flex uk-flex-center uk-flex-middle'>
        <section>
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
        </section>
      </main>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(null, mapDispatchToProps)(SignUpPage));