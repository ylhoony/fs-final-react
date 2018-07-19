import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../actions/index';

class Dashboard extends Component {
  render () {
    console.log("dashboard page", this.props.currentAccount)
    return (
      <h2>This is Dashboard Page.</h2>
    )
  }
}

const mapStateToProps = ({ accounts }) => {
  return {
    currentAccount: accounts.currentAccount
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));