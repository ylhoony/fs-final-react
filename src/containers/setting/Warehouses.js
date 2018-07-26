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

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";
import Loading from "../../components/Loading";
import WarehousesList from "../../components/warehouses/WarehousesList";

class Warehouses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayModal: false,
      warehouse: {
        id: null,
        account_id: props.currentAccount.id,
        name: "",
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
      }
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getWarehouses(params);
    }
  }

  openModalNew = () => {
    this.setState({
      ...this.state,
      warehouse: Object.assign({}, this.state.warehouse, {
        id: null,
        name: "",
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
    const warehouseId = e.target.parentElement.dataset.id;

    const params = {
      current_account_id: this.props.currentAccount.id
    };

    axios
      .get(`/api/v1/warehouses/${warehouseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        params: params
      })
      .then(res => {
        const selectedWarehouse = res.data;

        this.setState({
          ...this.state,
          warehouse: Object.assign({}, this.state.warehouse, {
            id: selectedWarehouse.id,
            name: selectedWarehouse.name,
            contact: selectedWarehouse.contact,
            street1: selectedWarehouse.street1,
            street2: selectedWarehouse.street2,
            city: selectedWarehouse.city,
            state: selectedWarehouse.state,
            country_id: selectedWarehouse.country.id,
            postal_code: selectedWarehouse.postal_code,
            email: selectedWarehouse.email,
            phone: selectedWarehouse.phone,
            fax: selectedWarehouse.fax,
            active: true,
            country: selectedWarehouse.country
          })
        });
        this.openModal();
      });
  };

  handleFormInputChange = (e, { value }) => {
    const key =
      e.target.name || e.target.dataset.name || e.target.previousSibling.name;

    let newValue;
    if (key === "active") {
      this.state.warehouse.active ? (newValue = false) : (newValue = true);
    } else {
      newValue = value;
    }

    this.setState({
      ...this.state,
      warehouse: Object.assign({}, this.state.warehouse, {
        [key]: newValue
      })
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    const params = {
      current_account_id: this.props.currentAccount.id
    };
    if (!!this.state.warehouse.id) {
      await this.props.actions.updateWarehouse(
        this.state.warehouse.id,
        this.state,
        params
      );
    } else {
      await this.props.actions.createWarehouse(this.state, params);
    }
    this.closeModal();
    await this.props.actions.getWarehouses(params);
    this.props.history.push("/warehouses");
  };

  render() {
    const {
      countries,
      currentAccountLoading,
      createWarehouseLoading,
      warehousesLoading
    } = this.props;

    const countriesOptions = countries.map(country => {
      return {
        "data-name": "country_id",
        "data-value": country.id,
        key: country.id,
        text: country.name,
        value: country.id
      };
    });

    if (currentAccountLoading || createWarehouseLoading || warehousesLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[
                { name: "Setting", url: "/setting" },
                { name: "Warehouse Locations", url: "/warehouses" }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h2"
                content="Warehouse Locations"
                subheader="Manage your warehouse locations"
              />

              <Button
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => this.openModalNew()}
              >
                <Icon name="plus" /> Add Warehouse
              </Button>
            </Segment>

            <Segment className="border-top-remove">
              <WarehousesList
                handleClickTableCell={event => this.handleClickTableCell(event)}
              />
            </Segment>
          </Segment.Group>
        </main>

        {/* Modal Start */}

        <Modal open={this.state.displayModal} onClose={this.closeModal}>
          <Modal.Header>New Warehouse</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Input
                fluid
                label="Name"
                name="name"
                placeholder="Warehouse name"
                value={this.state.warehouse.name}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Contact"
                name="contact"
                placeholder="Contact name"
                value={this.state.warehouse.contact}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Street 1"
                name="street1"
                placeholder="Street 1"
                value={this.state.warehouse.street1}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Street 2"
                name="street2"
                placeholder="Street 2"
                value={this.state.warehouse.street2}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="City"
                name="city"
                placeholder="City"
                value={this.state.warehouse.city}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="State"
                name="state"
                placeholder="State"
                value={this.state.warehouse.state}
                onChange={this.handleFormInputChange}
              />

              <Form.Select
                label="Country"
                name="country_id"
                options={countriesOptions}
                text={
                  this.state.warehouse.country_id
                    ? countriesOptions.filter(
                        country =>
                          country.key === this.state.warehouse.country_id
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
                value={this.state.warehouse.postal_code}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Email"
                name="email"
                placeholder="email"
                value={this.state.warehouse.email}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Phone"
                name="phone"
                placeholder="phone"
                value={this.state.warehouse.phone}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                fluid
                label="Fax"
                name="fax"
                placeholder="fax"
                value={this.state.warehouse.fax}
                onChange={this.handleFormInputChange}
              />

              <Form.Input
                control={Radio}
                toggle
                label="Status"
                name="active"
                placeholder="active"
                checked={this.state.warehouse.active === true}
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

function mapStateToProps({ countries, user, warehouses }) {
  return {
    countries: countries.countries,

    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    warehouses: warehouses.warehouses,
    warehousesLoading: warehouses.warehousesLoading,
    warehousesError: warehouses.warehousesError,

    createWarehouseLoading: warehouses.createWarehouseLoading,
    updateWarehouseLoading: warehouses.updateWarehouseLoading
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
  )(Warehouses)
);
