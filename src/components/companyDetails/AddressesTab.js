import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, Icon, Table } from "semantic-ui-react";

import { buildCountriesOptions } from "../../helpers/optionsBuilder";

class AddressesTab extends Component {
  render() {
    const { addresses, countries } = this.props;
    const countriesOptions = buildCountriesOptions(countries);

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
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {addresses.map((address, index) => {
              if (!address._destroy) {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="company_name"
                        placeholder="company name"
                        value={address.company_name}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="contact"
                        placeholder="contact"
                        value={address.contact}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="street1"
                        placeholder="street 1"
                        value={address.street1}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="street2"
                        placeholder="street2"
                        value={address.street2}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="city"
                        placeholder="city"
                        value={address.city}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="state"
                        placeholder="state"
                        value={address.state}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Select
                        name="country_id"
                        options={countriesOptions}
                        text={
                          address.country_id
                            ? countriesOptions.find(
                                country =>
                                  country.key ===
                                  parseInt(address.country_id, 10)
                              ).text
                            : "Select country"
                        }
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="postal_code"
                        placeholder="postal_code"
                        value={address.postal_code}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="email"
                        placeholder="email"
                        value={address.email}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="phone"
                        placeholder="phone"
                        value={address.phone}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name="fax"
                        placeholder="fax"
                        value={address.fax}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Checkbox
                        toggle
                        name="active"
                        placeholder="active"
                        checked={address.active}
                        onChange={e => this.props.handleAddressChange(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        basic
                        color="red"
                        compact
                        icon="minus"
                        size="mini"
                        onClick={e => this.props.handleRemoveAddress(e, index)}
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

const mapStateToProps = ({ countries }) => {
  return { countries: countries.countries };
};

export default withRouter(connect(mapStateToProps)(AddressesTab));
