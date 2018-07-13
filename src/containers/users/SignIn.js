import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, List, Segment } from 'semantic-ui-react'

import { actions } from '../../actions/index';

class SignIn extends Component {
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
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
  
    const res = await this.props.actions.signIn(this.state);
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      
      <React.Fragment>
        {/* <section className="sign-in flex flex-center flex-center-vertical vh-100"> */}
        <div className="sign-in flex flex-center flex-center-vertical vh-100">
        <Segment padded>
          <Form onSubmit={(event) => this.handleSignIn(event)}>
            <header className="padding-bottom-lg">
              <Header as='h2'>Sign in</Header>
            </header>
            <main className="padding-all-sm">
              <Form.Field>
                <label htmlFor="email">Email</label>
                <input
                  id='email'
                  name='email'
                  required
                  type='email'
                  value={this.state.email}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  name='password'
                  required
                  type='password'
                  value={this.state.password}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Field>
            </main>
            <footer className="flex flex-space-between flex-center-vertical padding-all-md">
              <List.Item href="/signup">Sign up</List.Item>
              <Button type="submit" color="green" size="small">Sign in</Button>
            </footer>
          </Form>
        </Segment>
        </div>
        {/* </section> */}
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(null, mapDispatchToProps)(SignIn));