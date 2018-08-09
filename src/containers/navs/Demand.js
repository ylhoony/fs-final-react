import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Card, Segment } from "semantic-ui-react";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";

class Demand extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[{ name: "Demand", url: "/demand" }]}
            />

            <Segment>
              <Card.Group className="">
                <Card>
                  <Card.Content
                    as={Link}
                    to="/customers"
                    header="Customers"
                  />
                  <Card.Content description="Manage Customers" />
                </Card>


                <Card>
                  <Card.Content
                    as={Link}
                    to="/sales"
                    header="Sales Orders"
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

export default withRouter(connect()(Demand));
