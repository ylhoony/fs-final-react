import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../BreadcrumbDisplay";
import Loading from "../Loading";

class SupplierList extends Component {
  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getSuppliers(params);
    }
  }

  handleClickTableCell = e => {
    const supplierId = e.target.parentElement.dataset.id;
    this.props.history.push(`/suppliers/${supplierId}`);
  };

  render() {
    const { currentAccountLoading, suppliers, suppliersLoading } = this.props;

    let suppliersRows;
    if (!suppliers.length) {
      suppliersRows = (
        <Table.Row>
          <Table.Cell colSpan="4">Create new supplier</Table.Cell>
        </Table.Row>
      );
    } else {
      suppliersRows = suppliers.map(supplier => {
        return (
          <Table.Row key={supplier.id} data-id={supplier.id}>
            <Table.Cell onClick={this.handleClickTableCell}>
              {supplier.name}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {supplier.currency.alpha}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {supplier.warehouse ? supplier.warehouse.name : ""}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {supplier.payment_term.name}
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    if (currentAccountLoading || suppliersLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[
                { name: "Supply", url: "/supply" },
                { name: "Supplier", url: "/suppliers" }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h3"
                content="Supplier"
                subheader="Manage your suppliers"
              />

              <Button
                as={Link}
                basic
                color="teal"
                compact
                icon
                labelPosition="left"
                size="tiny"
                to="/suppliers/new"
              >
                <Icon name="plus" /> Add Supplier
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

                <Table.Body>{suppliersRows}</Table.Body>

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

function mapStateToProps({ currencies, user, suppliers }) {
  return {
    currencies: currencies.currencies,

    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    suppliers: suppliers.suppliers,
    suppliersLoading: suppliers.suppliersLoading,
    suppliersError: suppliers.suppliersError
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
  )(SupplierList)
);
