import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Card, Header, Icon, Segment } from "semantic-ui-react";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";

class Demand extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay breadcrumbList={["Demand"]} />

            <Segment>
              
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

export default Demand;
