import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

class WarehousesList extends Component {

  render() {

    const { warehouses } = this.props;

    const warehousesRows = warehouses.map(warehouse => {
      return (
        <Table.Row key={warehouse.id}>
          <Table.Cell>{warehouse.name}</Table.Cell>
          <Table.Cell>{warehouse.contact}</Table.Cell>
          <Table.Cell>{warehouse.street1}\n{warehouse.street1}</Table.Cell>
          <Table.Cell>{warehouse.city}</Table.Cell>
          <Table.Cell>{warehouse.state}</Table.Cell>
          <Table.Cell>{warehouse.country.name}</Table.Cell>
          <Table.Cell>{warehouse.postal_code}</Table.Cell>
          <Table.Cell>{warehouse.email}</Table.Cell>
          <Table.Cell>{warehouse.phone}</Table.Cell>
          <Table.Cell>{warehouse.fax}</Table.Cell>
          <Table.Cell>{warehouse.active ? "Active" : "Inactive"}</Table.Cell>
        </Table.Row>
      )
    })

    return (
      <React.Fragment>
        <Table celled selectable color="grey" size="small" textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Warehouse Name</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>State/Province</Table.HeaderCell>
              <Table.HeaderCell>Country</Table.HeaderCell>
              <Table.HeaderCell>Postal Code</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Fax</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{warehousesRows}</Table.Body>
          
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="11">
                {/* <PaymentTermNew floated="left" /> */}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ warehouses, user }) => {
  return {
    warehouses: warehouses.warehouses,
    currentAccount: user.currentAccount,
  };
};

export default withRouter(connect(mapStateToProps)(WarehousesList));
