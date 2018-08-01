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
        account_id: props.currentAccount.id,
        name: "",
        tax_id: "",
        comment: "",
        warehouse_id: null,
        payment_term_id: null,
        currency_id: null,
        addresses_attributes: [],
        contacts_attributes: []
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
            const customer = res.data;
            this.setState({
              ...this.state,
              customer: {
                id: customer.id || null,
                account_id: customer.account_id || this.props.currentAccount.id,
                name: customer.name || "",
                tax_id: customer.tax_id || "",
                comment: customer.comment || "",
                warehouse_id: customer.warehouse.id || null,
                payment_term_id: customer.payment_term.id || null,
                currency_id: customer.currency.id || null,
                addresses_attributes: customer.addresses,
                contacts_attributes: customer.contacts
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
      const customerId = this.state.customer.id;

      axios({
        method: "PUT",
        url: `/api/v1/customers/${customerId}`,
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
        addresses_attributes: this.state.customer.addresses_attributes.concat({
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
          comment: "",
          active: true,
          _destroy: false
        })
      }
    });
  };

  handleRemoveAddress = (e, index) => {
    e.preventDefault();
    const stateAddresses = this.state.customer.addresses_attributes;

    if (!!stateAddresses[index].id) {
      const newAddresses = stateAddresses.map((address, stateIndex) => {
        if (stateIndex !== index) return address;
        return Object.assign({}, address, { _destroy: true });
      });

      this.setState({
        ...this.state,
        customer: {
          ...this.state.customer,
          addresses_attributes: newAddresses
        }
      });
    } else {
      this.setState({
        ...this.state,
        customer: {
          ...this.state.customer,
          addresses_attributes: this.state.customer.addresses_attributes.filter(
            (address, stateIndex) => index !== stateIndex
          )
        }
      });
    }
  };

  handleAddressChange = (e, index) => {
    const key =
      e.target.name ||
      e.target.dataset.name ||
      e.target.parentElement.dataset.name ||
      (e.target.previousSibling && e.target.previousSibling.name);
    let newValue;
    if (key === "active") {
      this.state.customer.addresses_attributes.find(
        (address, stateIndex) => stateIndex === index
      ).active
        ? (newValue = false)
        : (newValue = true);
    } else {
      newValue =
        e.target.value ||
        e.target.dataset.value ||
        e.target.parentElement.dataset.value;
    }
    const newAddresses = this.state.customer.addresses_attributes.map(
      (address, stateIndex) => {
        if (stateIndex !== index) return address;
        return Object.assign({}, address, { [key]: newValue });
      }
    );
    this.setState({
      ...this.state,
      customer: {
        ...this.state.customer,
        addresses_attributes: newAddresses
      }
    });
  };

  handleAddContact = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      customer: {
        ...this.state.customer,
        contacts_attributes: this.state.customer.contacts_attributes.concat({
          id: null,
          first_name: "",
          last_name: "",
          job_title: "",
          email: "",
          phone: "",
          mobile: "",
          fax: "",
          comment: "",
          active: true,
          _destroy: false
        })
      }
    });
  };

  handleRemoveContact = (e, index) => {
    e.preventDefault();

    const stateContacts = this.state.customer.contacts_attributes;

    if (!!stateContacts[index].id) {
      const newContacts = stateContacts.map((address, stateIndex) => {
        if (stateIndex !== index) return address;
        return Object.assign({}, address, { _destroy: true });
      });

      this.setState({
        ...this.state,
        customer: {
          ...this.state.customer,
          contacts_attributes: newContacts
        }
      });
    } else {
      this.setState({
        ...this.state,
        customer: {
          ...this.state.customer,
          contacts_attributes: this.state.customer.contacts_attributes.filter(
            (address, stateIndex) => index !== stateIndex
          )
        }
      });
    }
  };

  handleContactChange = (e, index) => {
    console.log("change contact info");
    const key =
      e.target.name ||
      e.target.dataset.name ||
      e.target.parentElement.dataset.name ||
      (e.target.previousSibling && e.target.previousSibling.name);
    let newValue;
    if (key === "active") {
      this.state.customer.contacts_attributes.find(
        (contact, stateIndex) => stateIndex === index
      ).active
        ? (newValue = false)
        : (newValue = true);
    } else {
      newValue =
        e.target.value ||
        e.target.dataset.value ||
        e.target.parentElement.dataset.value;
    }
    const newContacts = this.state.customer.contacts_attributes.map(
      (contact, stateIndex) => {
        if (stateIndex !== index) return contact;
        return Object.assign({}, contact, { [key]: newValue });
      }
    );
    this.setState({
      ...this.state,
      customer: {
        ...this.state.customer,
        contacts_attributes: newContacts
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
                      addresses={this.state.customer.addresses_attributes}
                      handleAddAddress={e => this.handleAddAddress(e)}
                      handleRemoveAddress={this.handleRemoveAddress}
                      handleAddressChange={this.handleAddressChange}
                    />
                  )}
                  {this.state.activeTab === "Contacts" && (
                    <ContactsTab
                      contacts={this.state.customer.contacts_attributes}
                      handleAddContact={e => this.handleAddContact(e)}
                      handleRemoveContact={this.handleRemoveContact}
                      handleContactChange={this.handleContactChange}
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
