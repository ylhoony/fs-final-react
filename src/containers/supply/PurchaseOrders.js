import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import PurchaseOrdersList from "../../components/purchaseOrders/PurchaseOrdersList";
import PurchaseOrderForm from "../../components/purchaseOrders/PurchaseOrderForm";

const PurchaseOrders = ({ match }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={() => <PurchaseOrdersList />}
        />
        <Route
          exact
          path={`${match.url}/new`}
          component={() => <PurchaseOrderForm />}
        />
        <Route
          exact
          path={`${match.url}/:purchaseOrderId`}
          component={() => <PurchaseOrderForm />}
        />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(PurchaseOrders);
