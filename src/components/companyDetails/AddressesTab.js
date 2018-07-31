import React, { Component } from "react";
import { Button, Header, Icon, Image, Item, Table } from "semantic-ui-react";

class AddressesTab extends Component {
  render() {
    console.log(this.props);

    return (
      <React.Fragment>
        <Table size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>Company</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
              <Table.HeaderCell>Street 1</Table.HeaderCell>
              <Table.HeaderCell>Street 2</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
              <Table.HeaderCell>Country</Table.HeaderCell>
              <Table.HeaderCell>Postal Code</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Fax</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.addresses.map((address, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{address.company_name}</Table.Cell>
                  <Table.Cell>{address.contact}</Table.Cell>
                  <Table.Cell>{address.street1}</Table.Cell>
                  <Table.Cell>{address.street2}</Table.Cell>
                  <Table.Cell>{address.city}</Table.Cell>
                  <Table.Cell>{address.state}</Table.Cell>
                  <Table.Cell>{address.country}</Table.Cell>
                  <Table.Cell>{address.postal_code}</Table.Cell>
                  <Table.Cell>{address.email}</Table.Cell>
                  <Table.Cell>{address.phone}</Table.Cell>
                  <Table.Cell>{address.fax}</Table.Cell>
                  <Table.Cell>
                    {address.active ? "active" : "inactive"}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan="8">
                <Button
                  basic
                  color="teal"
                  compact
                  size="mini"
                  onClick={this.props.handleAddAddress}
                >
                  <Icon name="plus" />Add address
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    );
  }
}

export default AddressesTab;
