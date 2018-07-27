import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CustomersList from "../../components/customers/CustomersList";
import CustomerForm from "../../components/customers/CustomerForm";

class Customers extends Component {
  render() {
    const { match } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path={`${match.url}`}
            component={() => <CustomersList />}
          />
          <Route
            exact
            path={`${match.url}/new`}
            component={() => <CustomerForm />}
          />
          <Route
            exact
            path={`${match.url}/:customerId`}
            component={() => <CustomerForm />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(Customers));
