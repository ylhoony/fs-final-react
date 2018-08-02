import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

class AccountAddressesList extends Component {
  render() {
    const { accountAddresses, countries } = this.props;

    let accountAddressesRows;
    if (!accountAddresses.length) {
      accountAddressesRows = (
        <Table.Row>
          <Table.Cell colSpan="11">Create new address</Table.Cell>
        </Table.Row>
      );
    } else {
      accountAddressesRows = accountAddresses.map(accountAddress => {
        return (
          <Table.Row key={accountAddress.id} data-id={accountAddress.id}>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.company_name}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.contact}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.street1}
              <br />
              {accountAddress.street2}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.city}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.state}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {
                countries.find(
                  country => country.id === accountAddress.country_id
                ).name
              }
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.postal_code}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.email}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.phone}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.fax}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountAddress.active ? "Active" : "Inactive"}
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <React.Fragment>
        <Table celled selectable color="grey" size="small" textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
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

          <Table.Body>{accountAddressesRows}</Table.Body>

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

const mapStateToProps = ({ accountAddresses, countries, user }) => {
  return {
    accountAddresses: accountAddresses.accountAddresses,
    currentAccount: user.currentAccount,

    countries: countries.countries
  };
};

export default withRouter(connect(mapStateToProps)(AccountAddressesList));
