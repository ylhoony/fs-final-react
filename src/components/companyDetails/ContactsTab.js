import React, { Component } from "react";
import { Button, Form, Icon, Table } from "semantic-ui-react";

class ContactsTab extends Component {
  render() {
    const { contacts } = this.props;

    return (
      <React.Fragment>
        <Table size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>First name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Job Title</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Fax</Table.HeaderCell>
              <Table.HeaderCell>Comment</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {contacts.map((contact, index) => {
              if (!contact._destroy) {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="first_name"
                        placeholder="first name"
                        value={contact.first_name}
                        onChange={e => this.props.handleContactChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="last_name"
                        placeholder="last name"
                        value={contact.last_name}
                        onChange={e => this.props.handleContactChange(e, index)}
                      />
                    </Table.Cell>

                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="job_title"
                        placeholder="Job Title"
                        value={contact.job_title}
                        onChange={e => this.props.handleContactChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="email"
                        placeholder="email"
                        value={contact.email}
                        onChange={e => this.props.handleContactChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="phone"
                        placeholder="phone"
                        value={contact.phone}
                        onChange={e => this.props.handleContactChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="fax"
                        placeholder="fax"
                        value={contact.fax}
                        onChange={e => this.props.handleContactChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="comment"
                        placeholder="comment"
                        value={contact.comment}
                        onChange={e => this.props.handleContactChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Checkbox
                        toggle
                        name="active"
                        placeholder="active"
                        checked={contact.active}
                        onChange={e => this.props.handleContactChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        basic
                        color="red"
                        compact
                        icon="minus"
                        size="mini"
                        onClick={e => this.props.handleRemoveContact(e, index)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              }
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan="9">
                <Button
                  basic
                  color="teal"
                  compact
                  size="mini"
                  onClick={this.props.handleAddContact}
                >
                  <Icon name="plus" />Add contact
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    );
  }
}

export default ContactsTab;
