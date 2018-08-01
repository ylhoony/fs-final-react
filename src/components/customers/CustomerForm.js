import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Header, Input, Menu, Segment } from "semantic-ui-react";

import BreadcrumbDisplay from "../BreadcrumbDisplay";
import Loading from "../Loading";
import AddressesTab from "../companyDetails/AddressesTab";
import ContactsTab from "../companyDetails/ContactsTab";

import { authToken } from "../../helpers/auth";
import { actions } from "../../actions/index";
import {
  buildCurrenciesOptions,
  buildPaymentTermsOptions,
  buildWarehousesOptions
} from "../../helpers/optionsBuilder";

class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Addresses",
      customer: {
        id: null,
        account_id: props.currentAccount.id,
        name: "",
        tax_id: "",
        comment: "",
        warehouse_id: null,
        payment_term_id: null,
        currency_id: null,
        addresses: [],
        contacts: []
      }
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getPaymentTerms(params);
      this.props.actions.getWarehouses(params);

      if (this.props.match.url === "/customers/new") {
        return;
      } else {
        const customerId = this.props.match.params.customerId;

        axios
          .get(`/api/v1/customers/${customerId}`, {
            headers: {
              Authorization: authToken,
              "Content-Type": "application/json"
            },
            params: params
          })
          .then(res => {
            const selectedCustomer = res.data;

            this.setState({
              ...this.state,
              customer: {
                id: selectedCustomer.id || null,
                account_id:
                  selectedCustomer.account_id || this.props.currentAccount.id,
                name: selectedCustomer.name || "",
                tax_id: selectedCustomer.tax_id || "",
                comment: selectedCustomer.comment || "",
                warehouse_id: selectedCustomer.warehouse.id || null,
                payment_term_id: selectedCustomer.payment_term.id || null,
                currency_id: selectedCustomer.currency.id || null
              }
            });
          });
      }
    }
  }

  handleFormInputChange = (e, { value }) => {
    console.log("change form data!");
    const key =
      e.target.name ||
      e.target.dataset.name ||
      e.target.previousSibling.name ||
      e.target.getAttribute("name") ||
      e.target.parentElement.dataset.name ||
      e.target.parentElement.getAttribute("name");

    let newValue;
    if (key === "active") {
      this.state.customer.active ? (newValue = false) : (newValue = true);
    } else {
      newValue = value;
    }

    this.setState({
      ...this.state,
      customer: Object.assign({}, this.state.customer, {
        [key]: newValue
      })
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const params = {
      current_account_id: this.props.currentAccount.id
    };

    if (!!this.state.customer.id) {
      await this.props.actions.updateCustomer(
        this.state.customer.id,
        this.state,
        params
      );
      this.props.history.push(`/customers/${this.state.customer.id}`);
    } else {
      axios({
        method: "POST",
        url: "/api/v1/customers",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json"
        },
        data: this.state,
        params: params
      }).then(res => {
        this.props.history.push(`/customers/${res.data.id}`);
      });
      await this.props.actions.getCustomers(params);
    }
  };

  handleClickTab = e => {
    this.setState({
      ...this.state,
      activeTab: e.target.text
    });
  };

  handleAddAddress = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      customer: {
        ...this.state.customer,
        addresses: this.state.customer.addresses.concat({
          id: null,
          company_name: "",
          contact: "",
          street1: "",
          street2: "",
          city: "",
          state: "",
          country_id: null,
          postal_code: "",
          email: "",
          phone: "",
          fax: "",
          active: true
        })
      }
    });
  };

  handleRemoveAddress = (e, index) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      customer: {
        ...this.state.customer,
        addresses: this.state.customer.addresses.filter(
          (address, stateIndex) => index !== stateIndex
        )
      }
    });
  };

  handleAddressChange = (e, index) => {
    const key = e.target.name || e.target.dataset.name || e.target.previousSibling.name;
    let newValue;
    if (key === "active") {
      this.state.customer.addresses.find(
        (address, stateIndex) => stateIndex === index
      ).active
        ? (newValue = false)
        : (newValue = true);
    } else {
      newValue = e.target.value || e.target.dataset.value;
    }
    const newAddresses = this.state.customer.addresses.map(
      (address, stateIndex) => {
        if (stateIndex !== index) return address;
        return Object.assign({}, address, { [key]: newValue });
      }
    );
    this.setState({
      ...this.state,
      customer: {
        ...this.state.customer,
        addresses: newAddresses
      }
    });
  };

  render() {
    const {
      currentAccountLoading,
      currencies,
      currenciesLoading,
      paymentTerms,
      paymentTermsLoading,
      warehouses,
      warehousesLoading,
      match
    } = this.props;

    const currenciesOptions = buildCurrenciesOptions(currencies);
    const paymentTermsOptions = buildPaymentTermsOptions(paymentTerms);
    const warehousesOptions = buildWarehousesOptions(warehouses);

    if (
      currentAccountLoading ||
      currenciesLoading ||
      paymentTermsLoading ||
      warehousesLoading
    ) {
      return <Loading />;
    }

    console.log(this.state);
    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[
                { name: "Demand", url: "/demand" },
                { name: "Customers", url: "/customers" },
                { name: "Customers:Info", url: `${match.url}` }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h3"
                content="Customer Information"
                subheader="Create new customer"
              />
            </Segment>

            <Segment>
              <Form size="tiny" onSubmit={this.handleFormSubmit}>
                <Form.Input
                  fluid
                  label="Customer Name"
                  name="name"
                  placeholder="Customer Name"
                  value={this.state.customer.name}
                  onChange={this.handleFormInputChange}
                />

                <Form.Input
                  fluid
                  label="Tax ID"
                  name="tax_id"
                  placeholder="Tax registration number"
                  value={this.state.customer.tax_id}
                  onChange={this.handleFormInputChange}
                />

                <Form.Select
                  label="Default Currency"
                  name="currency_id"
                  options={currenciesOptions}
                  text={
                    this.state.customer.currency_id
                      ? currenciesOptions.filter(
                          currency =>
                            currency.key === this.state.customer.currency_id
                        )[0].text
                      : "Select currency"
                  }
                  onChange={this.handleFormInputChange}
                />

                <Form.Select
                  label="Payment Term"
                  name="payment_term_id"
                  options={paymentTermsOptions}
                  text={
                    this.state.customer.payment_term_id
                      ? paymentTermsOptions.filter(
                          term =>
                            term.key === this.state.customer.payment_term_id
                        )[0].text
                      : "Select payment term"
                  }
                  onChange={this.handleFormInputChange}
                />

                <Form.Select
                  label="Default Warehouse"
                  name="warehouse_id"
                  options={warehousesOptions}
                  text={
                    this.state.customer.warehouse_id
                      ? warehousesOptions.filter(
                          warehouse =>
                            warehouse.key === this.state.customer.warehouse_id
                        )[0].text
                      : "Select warehouse"
                  }
                  onChange={this.handleFormInputChange}
                />

                {/* tab  start */}
                <Menu attached="top" tabular size="tiny">
                  <Menu.Item
                    name="Addresses"
                    active={this.state.activeTab === "Addresses"}
                    onClick={this.handleClickTab}
                  />
                  <Menu.Item
                    name="Contacts"
                    active={this.state.activeTab === "Contacts"}
                    onClick={this.handleClickTab}
                  />
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <Input
                        transparent
                        icon={{ name: "search", link: true }}
                        placeholder="Search users..."
                      />
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
                <Segment attached="bottom" size="tiny">
                  {this.state.activeTab === "Addresses" && (
                    <AddressesTab
                      addresses={this.state.customer.addresses}
                      handleAddAddress={e => this.handleAddAddress(e)}
                      handleRemoveAddress={this.handleRemoveAddress}
                      handleAddressChange={this.handleAddressChange}
                    />
                  )}
                  {this.state.activeTab === "Contacts" && (
                    <ContactsTab
                      handleFormInputChange={() => this.handleFormInputChange()}
                    />
                  )}
                </Segment>

                <Form.Button content="save" />
              </Form>
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ currencies, paymentTerms, user, warehouses }) => {
  return {
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    currencies: currencies.currencies,
    currenciesLoading: currencies.currenciesLoading,
    currenciesError: currencies.currenciesError,

    paymentTerms: paymentTerms.paymentTerms,
    paymentTermsLoading: paymentTerms.paymentTermsLoading,
    paymentTermsError: paymentTerms.paymentTermsError,

    warehouses: warehouses.warehouses,
    warehousesLoading: warehouses.warehousesLoading,
    warehousesError: warehouses.warehousesError
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
  )(CustomerForm)
);
