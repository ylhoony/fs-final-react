import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import PurchaseOrdersList from "../../components/purchaseOrders/PurchaseOrdersList";
import PurchaseOrderForm from "../../components/purchaseOrders/PurchaseOrderForm";

class PurchaseOrders extends Component {
  render() {
    const { match } = this.props;
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
            path={`${match.url}/:customerId`}
            component={() => <PurchaseOrderForm />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(PurchaseOrders);

// type,
// account_id,
// account_address_id,
// account_contact_id,
// customer_id,
// supplier_id,
// company_address_id,
// company_contact_id,
// warehouse_id,
// currency_id,
// order_reference,
// comment,
// order_date,
