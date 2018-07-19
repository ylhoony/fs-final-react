import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Header, Segment, Select } from "semantic-ui-react";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../BreadcrumbDisplay";

class AccountNew extends Component {
  constructor() {
    super();

    this.state = {
      account: {
        name: "",
        dba: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        country_id: "",
        postal_code: "",
        currency_id: ""
      }
    };
  }

  handleFormInput = e => {
    const key = e.target.name || e.target.dataset.name;
    const value = e.target.value || e.target.dataset.value;

    this.setState({
      account: Object.assign({}, this.state.account, { [key]: value })
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.actions.createAccount(this.state);
    // TODO: trigger to change the currentAccount
    this.props.history.push('/dashboard');
  };

  render() {
    const { countries, currencies } = this.props;

    const countryOptions = countries.map(country => {
      return {
        "data-name": "country_id",
        "data-value": country.id,
        key: country.alpha2,
        text: country.name,
        value: country.id,
      };
    });
    const currencyOptions = currencies.map(currency => {
      return {
        "data-name": "currency_id",
        "data-value": currency.id,
        key: currency.alpha,
        text: currency.name,
        value: currency.id,
      };
    });

    return (
      <React.Fragment>
        <BreadcrumbDisplay breadcrumbList={["Accounts", "New"]} />

        <Segment className="flex flex-between flex-middle">
          <Header
            as="h2"
            content="Create New Company Accounts"
            subheader="Manage your account settings and set email preferences"
          />
        </Segment>

        <Segment className="border-top-remove">
          <Form onSubmit={e => this.handleFormSubmit(e)}>
            <Form.Field
              control="input"
              label="Company Name"
              name="name"
              placeholder="Company Name"
              onChange={this.handleFormInput}
            />
            <Form.Field
              control="input"
              label="Doing Buisiness As"
              name="dba"
              placeholder="D.B.A"
              onChange={this.handleFormInput}
            />
            <Form.Field
              control="input"
              label="Street 1"
              name="street1"
              placeholder="Street 1"
              onChange={this.handleFormInput}
            />
            <Form.Field
              control="input"
              label="Street 2"
              name="street2"
              placeholder="Street 1"
              onChange={this.handleFormInput}
            />
            <Form.Field
              control="input"
              label="City"
              name="city"
              placeholder="City"
              onChange={this.handleFormInput}
            />
            <Form.Field
              control="input"
              label="State/Province"
              name="state"
              placeholder="State/Province"
              onChange={this.handleFormInput}
            />
            <Form.Field
              control={Select}
              label="Country"
              name="country_id"
              options={countryOptions}
              onChange={this.handleFormInput}
            />
            <Form.Field
              control="input"
              label="Postal Code"
              name="postal_code"
              placeholder="Postal Code"
              onChange={this.handleFormInput}
            />
            <Form.Field
              control={Select}
              label="Primary Currency"
              name="currency_id"
              options={currencyOptions}
              onChange={this.handleFormInput}
            />
            <Form.Button>Create New Account</Form.Button>
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ accounts, countries, currencies }) {
  return {
    countries: countries.countries,
    currencies: currencies.currencies,
    currentAccount: accounts.currentAccount
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
  )(AccountNew)
);
