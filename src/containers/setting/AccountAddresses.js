import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Form,
  Header,
  Icon,
  Modal,
  Radio,
  Segment
} from "semantic-ui-react";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";
import Loading from "../../components/Loading";

class AccountAddresses extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={["Setting", "Account Address"]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h2"
                content="Account Addresses"
                subheader="Manage your warehouse locations"
              />

              <Button
                icon
                labelPosition="left"
                primary
                size="small"
                // onClick={() => this.openModalNew()}
              >
                <Icon name="plus" /> Add Warehouse
              </Button>
            </Segment>

            <Segment className="border-top-remove">
              {/* <WarehousesList
                handleClickTableCell={event => this.handleClickTableCell(event)}
              /> */}
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

export default AccountAddresses;
