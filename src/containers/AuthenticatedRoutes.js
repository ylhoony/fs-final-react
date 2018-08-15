import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions } from "../actions/index";

import Loading from "../components/Loading";

class AuthenticatedRoutes extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/signin");
    }

    try {
      this.props.actions.authUser();
      this.props.actions.getCurrentAccount();
      this.props.actions.getAccounts();
      this.props.actions.getCountries();
      this.props.actions.getCurrencies();
      this.props.actions.getPaymentOptions();
    } catch (err) {
      localStorage.removeItem("token");
      this.props.history.push("/signin");
    }
  }

  render() {
    const {
      accountsLoading,
      countriesLoading,
      currenciesLoading,
      currentAccountLoading,
      currentUserLoading,
      paymentOptionsLoading
    } = this.props;

    if (
      accountsLoading ||
      countriesLoading ||
      currenciesLoading ||
      currentAccountLoading ||
      currentUserLoading ||
      paymentOptionsLoading
    ) {
      return <Loading />;
    }

    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

const mapStateToProps = ({
  accounts,
  countries,
  currencies,
  paymentOptions,
  user
}) => {
  return {
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    currentUser: user.currentUser,
    currentUserLoading: user.currentUserLoading,

    accounts: accounts.accounts,
    accountsLoading: accounts.accountsLoading,
    accountsError: accounts.accountsError,

    countries: countries,
    countriesLoading: countries.countriesLoading,
    countriesError: countries.countriesError,

    currencies: currencies,
    currenciesLoading: currencies.currenciesLoading,
    currenciesError: currencies.currenciesError,

    paymentOptions: paymentOptions.paymentOptions,
    paymentOptionsLoading: paymentOptions.paymentOptionsLoading,
    paymentOptionsError: paymentOptions.paymentOptionsError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticatedRoutes)
);
