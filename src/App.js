import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions } from "./actions/index";

import logo from "./logo.svg";
import "./App.css";

import Loading from "./components/Loading";
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
// Menu Containers
import AccountsPage from "./containers/accounts/AccountsPage";

class App extends Component {
  componentDidMount() {
    if (
      !window.location.pathname.includes("signin") &&
      !window.location.pathname.includes("signup")
    ) {
      this.props.actions.getAccounts();
      this.props.actions.getCountries();
      this.props.actions.getCurrencies();
    }
  }

  render() {
    const {
      accounts,
      accountsLoading,
      countries,
      countriesLoading,
      currencies,
      currenciesLoading
    } = this.props;

    if (accountsLoading || countriesLoading || currenciesLoading) {
      return <Loading />;
    }

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

            <Route
              path="/accounts"
              component={() => <AccountsPage accounts={accounts} />}
            />
            <Footer />
          </AuthenticatedRoutes>
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ accounts, countries, currencies, user }) {
  return {
    accounts: accounts.accounts,
    accountsLoading: accounts.accountsLoading,
    accountsError: accounts.accountsError,

    countries: countries,
    countriesLoading: countries.countriesLoading,
    countriesError: countries.countriesError,

    currencies: currencies,
    currenciesLoading: currencies.currenciesLoading,
    currenciesError: currencies.currenciesError,

    user: user
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
