import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Header, Segment, Select } from "semantic-ui-react";

import { actions } from "../../actions/index";
import {
  buildCountriesOptions,
  buildCurrenciesOptions
} from "../../helpers/optionsBuilder";

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

    console.log(this.state);
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.actions.createAccount(this.state);
    // TODO: trigger to change the currentAccount
    this.props.actions.getAccounts();
  };

  render() {
    const { countries, currencies, match } = this.props;
    const countriesOptions = buildCountriesOptions(countries);
    const currenciesOptions = buildCurrenciesOptions(currencies);

    return (
      <React.Fragment>
        <BreadcrumbDisplay
          breadcrumbList={[
            { name: "Accounts", url: "/accounts" },
            { name: "Accounts:Info", url: `${match.url}` }
          ]}
        />

        <Segment className="flex flex-between flex-middle">
          <Header
            as="h2"
            content="Create New Company Accounts"
            subheader="Manage your account settings and set email preferences"
          />
        </Segment>

        <Segment className="border-top-remove">
          <Form onSubmit={this.handleFormSubmit}>
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
              options={countriesOptions}
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
              options={currenciesOptions}
              onChange={this.handleFormInput}
            />
            <Form.Button>Create New Account</Form.Button>
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ accounts, countries, currencies }) => {
  return {
    countries: countries.countries,
    currencies: currencies.currencies,
    currentAccount: accounts.currentAccount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountNew)
);
