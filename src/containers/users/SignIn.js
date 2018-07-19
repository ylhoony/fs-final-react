import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, List, Segment } from 'semantic-ui-react'

import { actions } from '../../actions/index';

import Loading from '../../components/Loading';

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
  
    await this.props.actions.signIn(this.state);
    this.props.history.push('/dashboard');
  }

  render() {
    const { currentUserLoading } = this.props;

    if (currentUserLoading) {
      return <Loading />
    }

    return (
      <React.Fragment>
        <section className="container-auth flex flex-center flex-middle vh-100">
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
              <footer className="flex flex-between flex-middle padding-all-md">
                <List.Item href="/signup">Sign up</List.Item>
                <Button type="submit" color="green" size="small">Sign in</Button>
              </footer>
            </Form>
          </Segment>
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
    currentUserLoading: user.currentUserLoading,
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));