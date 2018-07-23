import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions } from "./actions/index";

// import logo from "./logo.svg";
import "./App.css";

// import Loading from "./components/Loading";
import Header from "./containers/Header";
import Footer from "./containers/Footer";

import SignUp from "./containers/users/SignUp";
import SignIn from "./containers/users/SignIn";

import AuthenticatedRoutes from "./containers/AuthenticatedRoutes";
// Navigation Containers
import Dashboard from "./containers/navs/Dashboard";
import Demand from "./containers/navs/Demand";
import Supply from "./containers/navs/Supply";
import Product from "./containers/navs/Product";
import Logistics from "./containers/navs/Logistics";
import Warehouse from "./containers/navs/Warehouse";
import Setting from "./containers/navs/Setting";
import PaymentTerms from "./containers/setting/PaymentTerms";

// Menu Containers
import AccountsPage from "./containers/accounts/AccountsPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <AuthenticatedRoutes>
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/demand" component={Demand} />
            <Route exact path="/supply" component={Supply} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/logistics" component={Logistics} />
            <Route exact path="/warehouse" component={Warehouse} />
            <Route exact path="/setting" component={Setting} />
              <Route path="/payment-terms" component={PaymentTerms} />

            <Route path="/accounts" component={AccountsPage} />
            {/* <Route path="/accounts" component={AccountsPage} /> */}
            <Footer />
          </AuthenticatedRoutes>
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    currentAccount: user.currentAccount,
    currentUser: user.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
