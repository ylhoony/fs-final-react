import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

class AccountContactsList extends Component {
  render() {
    const { accountContacts } = this.props;

    let accountContactsRows;
    if (!accountContacts.length) {
      accountContactsRows = (
        <Table.Row>
          <Table.Cell colSpan="6">
            Create new contact
          </Table.Cell>
        </Table.Row>
      );
    } else {
      accountContactsRows = accountContacts.map(accountContact => {
        return (
          <Table.Row key={accountContact.id} data-id={accountContact.id}>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountContact.first_name} {accountContact.last_name}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountContact.email}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountContact.phone}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountContact.mobile}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountContact.fax}
            </Table.Cell>
            <Table.Cell onClick={this.props.handleClickTableCell}>
              {accountContact.active ? "Active" : "Inactive"}
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
              <Table.HeaderCell>Contact Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Mobile</Table.HeaderCell>
              <Table.HeaderCell>Fax</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{accountContactsRows}</Table.Body>

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

const mapStateToProps = ({ accountContacts, user }) => {
  return {
    accountContacts: accountContacts.accountContacts,
    currentAccount: user.currentAccount
  };
};

export default withRouter(connect(mapStateToProps)(AccountContactsList));
