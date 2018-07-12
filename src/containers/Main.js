import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from '../actions/index';

import SignUp from './users/SignUp';
import SignIn from './users/SignIn';
import Dashboard from './navs/Dashboard';
import Demand from './navs/Demand';
import Supply from './navs/Supply';
import Product from './navs/Product';
import Logistics from './navs/Logistics';
import Warehouse from './navs/Warehouse';
import Setting from './navs/Setting';

import AuthenticatedRoutes from './AuthenticatedRoutes';

class Main extends Component {
  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signin' component={SignIn} />
          <AuthenticatedRoutes>
            <Route exact path='/' component={Dashboard}/>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/demand' component={Demand} />
            <Route exact path='/supply' component={Supply} />
            <Route exact path='/product' component={Product} />
            <Route exact path='/logistics' component={Logistics} />
            <Route exact path='/warehouse' component={Warehouse} />
            <Route exact path='/setting' component={Setting} />
          </AuthenticatedRoutes>
        </Switch>
      </main>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));