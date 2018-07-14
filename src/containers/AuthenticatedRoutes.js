import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from '../actions/index';

import Loading from '../components/Loading';

class AuthenticatedRoutes extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/signin');
    }

    try {
      this.props.actions.authUser();
    } catch(err) {
        localStorage.removeItem('token');
        this.props.history.push('/signin');
    }
  }

  render() {
    if (!this.props.user) {
      return <Loading />
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