import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../actions/index';

class Dashboard extends Component {
  render () {
    return (
      <h2>This is Dashboard Page.</h2>
    )
  }
}

function mapStateToProps({ companies }) {  
  return { companies };
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(null, mapDispatchToProps)(Dashboard));