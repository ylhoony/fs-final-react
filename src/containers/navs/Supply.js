import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Card, Segment } from "semantic-ui-react";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";

class Supply extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[{ name: "Supply", url: "/supply" }]}
            />

            <Segment>
              <Card.Group className="">
                <Card>
                  <Card.Content as={Link} to="/suppliers" header="Suppliers" />
                  <Card.Content description="Manage Suppliers" />
                </Card>

                <Card>
                  <Card.Content
                    as={Link}
                    to="/suppliers"
                    header="Purchase Orders"
                    />
                  <Card.Content description="purchase orders" />
                </Card>
              </Card.Group>
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(Supply));