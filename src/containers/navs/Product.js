import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Card, Segment } from "semantic-ui-react";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";

class Product extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[{ name: "Product", url: "/product" }]}
            />

            <Segment>
              <Card.Group className="">
                <Card>
                  <Card.Content as={Link} to="/products" header="Products" />
                  <Card.Content description="Manage Products" />
                </Card>

                <Card>
                  <Card.Content
                    as={Link}
                    to="/products"
                    header="Product Family"
                  />
                  <Card.Content description="sales orders" />
                </Card>
              </Card.Group>
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(Product));
