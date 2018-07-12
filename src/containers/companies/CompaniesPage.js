import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../actions/index';

class CompaniesPage extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <p>Companies Page</p>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompaniesPage));