import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../BreadcrumbDisplay";
import Loading from "../Loading";

class CustomersList extends Component {
  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getCustomers(params);
    }
  }

  handleClickTableCell = e => {
    const customerId = e.target.parentElement.dataset.id;
    this.props.history.push(`/customers/${customerId}`);
  };

  render() {
    const { currentAccountLoading, customers, customersLoading } = this.props;

    let customersRows;
    if (!customers.length) {
      customersRows = (
        <Table.Row>
          <Table.Cell colSpan="4">Create new customer</Table.Cell>
        </Table.Row>
      );
    } else {
      customersRows = customers.map(customer => {
        return (
          <Table.Row key={customer.id} data-id={customer.id}>
            <Table.Cell onClick={this.handleClickTableCell}>
              {customer.name}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {customer.currency.alpha}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {customer.warehouse ? customer.warehouse.name : ""}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {customer.payment_term.name}
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    if (currentAccountLoading || customersLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[
                { name: "Demand", url: "/demand" },
                { name: "Customers", url: "/customers" }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h2"
                content="Customers"
                subheader="Manage your customers"
              />

              <Button
                as={Link}
                icon
                labelPosition="left"
                primary
                size="small"
                to="/customers/new"
              >
                <Icon name="plus" /> Add Customer
              </Button>
            </Segment>

            <Segment>
              <Table
                celled
                selectable
                color="grey"
                size="small"
                textAlign="center"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                    <Table.HeaderCell>Default Currency</Table.HeaderCell>
                    <Table.HeaderCell>Default Warehouse</Table.HeaderCell>
                    <Table.HeaderCell>Payment Terms</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>{customersRows}</Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="4">
                      <p> table footer</p>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ currencies, user, customers }) {
  return {
    currencies: currencies.currencies,

    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    customers: customers.customers,
    customersLoading: customers.customersLoading,
    customersError: customers.customersError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomersList)
);
