import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Header, Segment, Tab } from "semantic-ui-react";

import BreadcrumbDisplay from "../BreadcrumbDisplay";
import Loading from "../Loading";
import AddressesTab from "../companyAddresses/AddressesTab";

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

    const panes = [
      {
        menuItem: "Addresses",
        render: () => (
          <Tab.Pane attached={false}>
            <AddressesTab />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Contacts",
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
      },
      {
        menuItem: "Tab 3",
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
      }
    ];

    if (
      currentAccountLoading ||
      currenciesLoading ||
      paymentTermsLoading ||
      warehousesLoading
    ) {
      return <Loading />;
    }

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
                as="h2"
                content="Customer Information"
                subheader="Create new customer"
              />
            </Segment>

            <Segment>
              <Form onSubmit={this.handleFormSubmit}>
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

                <Tab
                  className="field"
                  menu={{ pointing: true }}
                  panes={panes}
                />

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
