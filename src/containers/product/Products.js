import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProductsList from "../../components/products/ProductsList";
import ProductForm from "../../components/products/ProductForm";

class Products extends Component {
  render() {
    const { match } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path={`${match.url}`}
            component={() => <ProductsList />}
          />
          <Route
            exact
            path={`${match.url}/new`}
            component={() => <ProductForm />}
          />
          <Route
            exact
            path={`${match.url}/:productId`}
            component={() => <ProductForm />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(Products));


