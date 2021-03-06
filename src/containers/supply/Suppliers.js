import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SuppliersList from "../../components/suppliers/SuppliersList";
import SupplierForm from "../../components/suppliers/SupplierForm";

const Suppliers = ({ match }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={() => <SuppliersList />}
        />
        <Route
          exact
          path={`${match.url}/new`}
          component={() => <SupplierForm />}
        />
        <Route
          exact
          path={`${match.url}/:supplierId`}
          component={() => <SupplierForm />}
        />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(connect()(Suppliers));
