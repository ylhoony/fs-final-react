import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, List, Segment } from 'semantic-ui-react';

import { actions } from '../../actions/index';

class SignUp extends Component {
  constructor(props) {
    super(props);

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

  handleFormSubmit = async e => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }

    await this.props.actions.signUp(this.state);
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <React.Fragment>
        <section className="container-auth flex flex-center flex-middle vh-100">
          <Segment padded>
            <Form onSubmit={(event) => this.handleFormSubmit(event)}>
            <header className="padding-bottom-lg">
                <Header as='h2'>Sign up</Header>
              </header>
              <main className="padding-all-sm">
                <Form.Field>
                  <label htmlFor='first_name'>First Name</label>
                  <input 
                    id='first_name'
                    name='first_name'
                    required
                    type='text'
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor='last_name'>Last Name</label>
                  <input
                    id='last_name'
                    name='last_name'
                    required
                    type='text'
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    name='email'
                    required
                    type='email'
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
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor='password_confirmation'>Password Confirmation</label>
                  <input
                    id='password_confirmation'
                    name='password_confirmation'
                    required
                    type='password'
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </Form.Field>
              </main>
              <footer className="flex flex-between flex-middle padding-all-md">
                <List.Item href="/signin">Sign in</List.Item>
                <Button type="submit" color="green" size="small">Sign up</Button>
              </footer>
            </Form>
          </Segment>
        </section>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(null, mapDispatchToProps)(SignUp));