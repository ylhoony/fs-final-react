import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from '../actions/index';

class AuthenticatedRoutes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/signin');
    }

    try {
      this.props.actions.authUser()
    } catch(err) {
        localStorage.removeItem('token');
        this.props.history.push('/signin');
    }
  }

  render() {

    if (!this.props.user) {
      <h1>Loading...</h1>
    }

    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}

function mapStateToProps({ user }) {  
  return { user };
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoutes));