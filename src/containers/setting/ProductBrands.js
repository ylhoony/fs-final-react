import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Checkbox,
  Form,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Table
} from "semantic-ui-react";

import { actions } from "../../actions/index";
import { authToken } from "../../helpers/auth";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";
// import Loading from "../../components/Loading";

class ProductBrands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySidebar: false,
      product_brand: {
        id: null,
        name: "",
        active: true
      }
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getProductBrands(params);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const diffSidebar = this.state.displaySidebar !== nextState.displaySidebar;
    const diffBrands =
      this.props.productBrands !== nextProps.productBrands;
    const diffBrand =
      this.state.product_brand !== nextState.product_brand;

    return (
      diffBrands ||
      diffBrand ||
      diffSidebar
    );
  }

  clearState = () => {
    this.setState({
      displaySidebar: false,
      product_brand: {
        id: null,
        name: "",
        active: true
      }
    });
  };

  handleSidebarShow = () => {
    this.setState({
      ...this.state,
      displaySidebar: true
    });
  };

  handleSidebarHide = () => {
    this.clearState();
    this.setState({
      ...this.state,
      displaySidebar: false
    });
  };

  handleFormInputChagne = e => {
    const key = e.target.name || e.target.previousSibling.name;
    let value;
    if (key === "active") {
      value = this.state.product_brand.active ? false : true;
    } else {
      value = e.target.value;
    }

    this.setState({
      ...this.state,
      product_brand: {
        ...this.state.product_brand,
        [key]: value
      }
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const params = {
      current_account_id: this.props.currentAccount.id
    };

    if (!!this.state.product_brand.id) {
      console.log("update");
      await this.props.actions.updateProductBrand(
        this.state.product_brand.id,
        this.state,
        params
      );
    } else {
      await this.props.actions.createProductBrand(this.state, params);
    }
    this.props.actions.getProductBrands(params);
    this.handleSidebarHide();
  };

  handleTableCellClick = e => {
    const brandId = e.target.parentNode.dataset.id;

    const params = {
      current_account_id: this.props.currentAccount.id
    };

    axios
      .get(`/api/v1/product_brands/${brandId}`, {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json"
        },
        params: params
      })
      .then(res => {
        const brand = res.data;

        this.setState({
          ...this.state,
          product_brand: {
            id: brand.id,
            name: brand.name,
            active: brand.active
          }
        });
        this.handleSidebarShow();
      });
  };

  handleDelete = async e => {
    e.preventDefault();
    console.log("delete");
    const params = {
      current_account_id: this.props.currentAccount.id
    };
    const brandId = this.state.product_brand.id;
    await this.props.actions.deleteProductBrand(brandId, params);
    this.props.actions.getProductBrands(params);
    this.handleSidebarHide();
  };

  render() {
    const {
      productBrands,
    } = this.props;

    let productBrandsTableRows;
    if (!productBrands.length) {
      productBrandsTableRows = (
        <Table.Row colSpan={2}>
          <Table.Cell>Create new product brand</Table.Cell>
        </Table.Row>
      );
    } else {
      productBrandsTableRows = productBrands.map(brand => {
        return (
          <Table.Row key={brand.id} data-id={brand.id}>
            <Table.Cell onClick={this.handleTableCellClick}>
              {brand.name}
            </Table.Cell>
            <Table.Cell onClick={this.handleTableCellClick}>
              {brand.active ? "active" : "inactive"}
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <React.Fragment>
        <main>
          <Sidebar.Pushable as={Segment}>
            <Sidebar.Pusher dimmed={this.state.displaySidebar}>
              <Segment.Group>
                <BreadcrumbDisplay
                  breadcrumbList={[
                    { name: "Setting", url: "/setting" },
                    { name: "Product Brands", url: "/product-brands" }
                  ]}
                />

                <Segment className="flex flex-between flex-middle">
                  <Header
                    as="h3"
                    content="Product Brands"
                    subheader="Manage your product brands"
                  />

                  <Button
                    basic
                    color="teal"
                    icon
                    labelPosition="left"
                    size="tiny"
                    onClick={this.handleSidebarShow}
                  >
                    <Icon name="plus" /> Add Product Brand
                  </Button>
                </Segment>

                <Segment>
                  <Table size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>{productBrandsTableRows}</Table.Body>
                  </Table>
                </Segment>
              </Segment.Group>
            </Sidebar.Pusher>

            {/* Sidebar with Dimmer */}
            <Sidebar
              as={Menu}
              animation="overlay"
              className="padding-all-md"
              direction="right"
              onHide={this.handleSidebarHide}
              vertical
              visible={this.state.displaySidebar}
              width="wide"
            >
              <Form size="mini" onSubmit={this.handleFormSubmit}>
                <Header size="medium" content="New Product Brand" />
                <Form.Input
                  label="Product Brand Name"
                  placeholder="Brand name"
                  name="name"
                  value={this.state.product_brand.name}
                  onChange={this.handleFormInputChagne}
                />
                <Form.Field>
                  <label>Status</label>
                  <Checkbox
                    toggle
                    name="active"
                    checked={this.state.product_brand.active}
                    onChange={this.handleFormInputChagne}
                  />
                </Form.Field>

                {this.state.product_brand.id && (
                  <Button
                    basic
                    color="red"
                    compact
                    floated="left"
                    size="tiny"
                    content="Delete"
                    onClick={this.handleDelete}
                  />
                )}
                <Button
                  basic
                  color="teal"
                  compact
                  floated="right"
                  size="tiny"
                  content="Save"
                />
              </Form>
            </Sidebar>
          </Sidebar.Pushable>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ productBrands, user }) => {
  return {
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    productBrands: productBrands.productBrands,
    productBrandsLoading: productBrands.productBrandsLoading,
    productBrandsError: productBrands.productBrandsError,

    updateProductBrandLoading:
      productBrands.updateProductBrandLoading,
    updateProductBrandError: productBrands.updateProductBrandError,

    deleteProductBrandLoading:
      productBrands.deleteProductBrandLoading,
    deleteProductBrandError: productBrands.deleteProductBrandError
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
  )(ProductBrands)
);
