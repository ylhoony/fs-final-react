import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../actions/index';

class SignInPage extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        email: '',
        password: '',
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

  handleSignIn = async e => {
    e.preventDefault();
    await this.props.actions.signIn(this.state)
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <React.Fragment>
        <main className="uk-card">
          <p>Sign in</p>

          <form onSubmit={(event) => this.handleSignIn(event)}>
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

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));