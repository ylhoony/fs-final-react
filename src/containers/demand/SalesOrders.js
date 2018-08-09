import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import SalesOrdersList from "../../components/salesOrders/SalesOrdersList";
import SalesOrderForm from "../../components/salesOrders/SalesOrderForm";

class SalesOrders extends Component {
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path={`${match.url}`}
            component={() => <SalesOrdersList />}
          />
          <Route
            exact
            path={`${match.url}/new`}
            component={() => <SalesOrderForm />}
          />
          <Route
            exact
            path={`${match.url}/:customerId`}
            component={() => <SalesOrderForm />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(SalesOrders);
