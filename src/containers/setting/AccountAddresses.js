import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Form,
  Header,
  Icon,
  Modal,
  Radio,
  Segment
} from "semantic-ui-react";

import { actions } from "../../actions/index";
import { buildCountriesOptions } from "../../helpers/optionsBuilder";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";
import Loading from "../../components/Loading";
import AccountAddressesList from "../../components/accountAddresses/AccountAddressesList";

class AccountAddresses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayModal: false,
      address: {
        id: null,
        account_id: props.currentAccount.id,
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
      }
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getAccountAddresses(params);
    }
  }

  openModalNew = () => {
    this.setState({
      ...this.state,
      address: Object.assign({}, this.state.address, {
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
        active: true,
        country: null
      })
    });
    this.openModal();
  };

  openModal = () => {
    this.setState({
      displayModal: true
    });
  };

  closeModal = () => {
    this.setState({
      displayModal: false
    });
  };

  handleClickTableCell = async e => {
    const accountAddressId = e.target.parentElement.dataset.id;

    const params = {
      current_account_id: this.props.currentAccount.id
    };

    axios
      .get(`/api/v1/account_addresses/${accountAddressId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        params: params
      })
      .then(res => {
        const selectedAccountAddress = res.data;

        this.setState({
          ...this.state,
          address: Object.assign({}, this.state.address, {
            id: selectedAccountAddress.id,
            company_name: selectedAccountAddress.company_name || "",
            contact: selectedAccountAddress.contact || "",
            street1: selectedAccountAddress.street1 || "",
            street2: selectedAccountAddress.street2 || "",
            city: selectedAccountAddress.city || "",
            state: selectedAccountAddress.state || "",
            country_id: selectedAccountAddress.country_id,
            postal_code: selectedAccountAddress.postal_code || "",
            email: selectedAccountAddress.email || "",
            phone: selectedAccountAddress.phone || "",
            fax: selectedAccountAddress.fax || "",
            active: true,
            country: selectedAccountAddress.country
          })
        });
        this.openModal();
      });
  };

  handleFormInputChange = (e, { value }) => {
    const key =
      e.target.name ||
      e.target.dataset.name ||
      e.target.previousSibling.name ||
      e.target.getAttribute("name");

    let newValue;
    if (key === "active") {
      this.state.address.active ? (newValue = false) : (newValue = true);
    } else {
      newValue = value;
    }

    this.setState({
      ...this.state,
      address: Object.assign({}, this.state.address, {
        [key]: newValue
      })
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    const params = {
      current_account_id: this.props.currentAccount.id
    };
    if (!!this.state.address.id) {
      await this.props.actions.updateAccountAddress(
        this.state.address.id,
        this.state,
        params
      );
    } else {
      await this.props.actions.createAccountAddress(this.state, params);
    }
    this.closeModal();
    await this.props.actions.getAccountAddresses(params);
    this.props.history.push("/account-addresses");
  };

  render() {
    const {
      countries,
      accountAddressesLoading,
      currentAccountLoading,
      createAccountAddressLoading,
      updateAccountAddressLoading
    } = this.props;

    // use helper to build countries options
    const countriesOptions = buildCountriesOptions(countries);

    if (
      accountAddressesLoading ||
      currentAccountLoading ||
      createAccountAddressLoading ||
      updateAccountAddressLoading
    ) {
      return <Loading />;
    }

    console.log("account addresses", this.props);

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[
                { name: "Setting", url: "/setting" },
                { name: "Account Addresses", url: "/account-addresses" }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h3"
                content="Account Addresses"
                subheader="Manage your warehouse locations"
              />

              <Button
                basic
                icon
                color="teal"
                labelPosition="left"
                size="tiny"
                onClick={() => this.openModalNew()}
              >
                <Icon name="plus" /> Add Address
              </Button>
            </Segment>

            <Segment className="border-top-remove">
              <AccountAddressesList
                handleClickTableCell={event => this.handleClickTableCell(event)}
              />
            </Segment>
          </Segment.Group>
        </main>

        {/* Modal Start */}
        <Modal size="tiny" open={this.state.displayModal} onClose={this.closeModal}>
          <Modal.Header>New Account Address</Modal.Header>
          <Modal.Content>
            <Form size="tiny" onSubmit={this.handleFormSubmit}>
              <Form.Input
                fluid
                label="Name"
                name="company_name"
                placeholder="Company name"
                value={this.state.address.company_name}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Contact"
                name="contact"
                placeholder="Contact name"
                value={this.state.address.contact}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Street 1"
                name="street1"
                placeholder="Street 1"
                value={this.state.address.street1}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Street 2"
                name="street2"
                placeholder="Street 2"
                value={this.state.address.street2}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="City"
                name="city"
                placeholder="City"
                value={this.state.address.city}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="State"
                name="state"
                placeholder="State"
                value={this.state.address.state}
                onChange={this.handleFormInputChange}
              />

              <Form.Select
                label="Country"
                name="country_id"
                options={countriesOptions}
                text={
                  this.state.address.country_id
                    ? countriesOptions.filter(
                        country => country.key === this.state.address.country_id
                      )[0].text
                    : "Select country"
                }
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Postal Code"
                name="postal_code"
                placeholder="Postal Code"
                value={this.state.address.postal_code}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Email"
                name="email"
                placeholder="email"
                value={this.state.address.email}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Phone"
                name="phone"
                placeholder="phone"
                value={this.state.address.phone}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Fax"
                name="fax"
                placeholder="fax"
                value={this.state.address.fax}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                control={Radio}
                toggle
                label="Status"
                name="active"
                placeholder="active"
                checked={this.state.address.active === true}
                onChange={this.handleFormInputChange}
              />

              <Button type="submit">save</Button>
            </Form>
          </Modal.Content>
        </Modal>
        {/* Modal End */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ accountAddresses, countries, user }) => {
  return {
    countries: countries.countries,

    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    accountAddresses: accountAddresses.accountAddresses,
    accountAddressesLoading: accountAddresses.accountAddressesLoading,
    accountAddressesError: accountAddresses.accountAddressesError,

    createAccountAddressLoading: accountAddresses.createAccountAddressLoading,
    updateAccountAddressLoading: accountAddresses.updateAccountAddressLoading
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
  )(AccountAddresses)
);
