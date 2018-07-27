import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

class WarehousesList extends Component {
  render() {
    const { warehouses } = this.props;

    let warehousesRows;
    if (!warehouses.length) {
      warehousesRows = (
        <Table.Row>
          <Table.Cell colSpan="11">Create new warehouse</Table.Cell>
        </Table.Row>
      );
    } else {
      warehousesRows = warehouses.map(warehouse => {
        return (
          <Table.Row key={warehouse.id} data-id={warehouse.id}>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.name}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.contact}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.street1}
              <br />
              {warehouse.street2}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.city}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.state}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.country.name}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.postal_code}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.email}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.phone}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.fax}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {warehouse.active ? "Active" : "Inactive"}
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <React.Fragment>
        <Table celled selectable color="grey" size="small" sortable textAlign="center">
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
                <p> table footer</p>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ warehouses, user }) => {
  return {
    warehouses: warehouses.warehouses,
    currentAccount: user.currentAccount
  };
};

export default withRouter(connect(mapStateToProps)(WarehousesList));
