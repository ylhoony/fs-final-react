import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Checkbox, Form, Header, Segment } from "semantic-ui-react";

import { actions } from "../../actions/index";
import { authToken } from "../../helpers/auth";
import {
  buildProductCategoriesOptions,
  buildProductBrandsOptions
} from "../../helpers/optionsBuilder";

import BreadcrumbDisplay from "../BreadcrumbDisplay";
import Loading from "../Loading";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      product: {
        id: null,
        account_id: null,
        product_brand_id: null,
        product_category_id: null,
        sku: "",
        name: "",
        description: "",
        base_price: 0,
        active: true
      }
    };
  }

  account_id;
  product_category_id;
  product_brand_id;
  sku;
  name;
  description;
  active;

  componentDidMount() {
    const params = {
      current_account_id: this.props.currentAccount.id
    };

    if (!this.props.currentAccountLoading) {
      this.props.actions.getProductBrands(params);
      this.props.actions.getProductCategories(params);
    }

    if (this.props.match.url === "/products/new") {
      return;
    } else {
      const productId = this.props.match.params.productId;

      axios
        .get(`/api/v1/products/${productId}`, {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json"
          },
          params: params
        })
        .then(res => {
          const product = res.data;
          this.setState({
            ...this.state,
            product: {
              id: product.id || null,
              account_id: product.account_id || this.props.currentAccount.id,
              product_brand_id: product.product_brand.id || null,
              product_category_id: product.product_category.id || null,
              sku: product.sku,
              name: product.name,
              description: product.description || "",
              base_price: product.base_price || 0,
              active: product.active
            }
          });
        });
    }
  }

  handleFormInputChange = e => {
    const key =
      e.target.name ||
      e.target.dataset.name ||
      (e.target.previousSibling && e.target.previousSibling.name);
    let value;
    if (key === "active") {
      value = this.state.product.active ? false : true;
    } else {
      value = e.target.value || e.target.dataset.value;
    }

    this.setState({
      ...this.state,
      product: {
        ...this.state.product,
        [key]: value
      }
    });
  };

  handleFormSubmit = async e => {
    const params = {
      current_account_id: this.props.currentAccount.id
    };

    if (!!this.state.product.id) {
      const productId = this.state.product.id;

      axios({
        method: "PUT",
        url: `/api/v1/products/${productId}`,
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json"
        },
        data: this.state,
        params: params
      }).then(res => {
        this.props.history.push(`/products/${res.data.id}`);
      });
      await this.props.actions.getProducts(params);
    } else {
      axios({
        method: "POST",
        url: "/api/v1/products",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json"
        },
        data: this.state,
        params: params
      }).then(res => {
        this.props.history.push(`/products/${res.data.id}`);
      });
      await this.props.actions.getProducts(params);
    }
  };

  render() {
    const {
      currentAccountLoading,
      productBrands,
      productBrandsLoading,
      productCategories,
      productCategoriesLoading,
      match
    } = this.props;

    const productCategoriesOptions = buildProductCategoriesOptions(
      productCategories
    );

    const productBrandsOptions = buildProductBrandsOptions(productBrands);

    if (
      currentAccountLoading ||
      productBrandsLoading ||
      productCategoriesLoading
    ) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[
                { name: "Product", url: "/product" },
                { name: "Products", url: "/products" },
                { name: "Products:Info", url: `${match.url}` }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h3"
                content="Products"
                subheader="Manage your products"
              />
            </Segment>
            <Segment>
              <Form size="tiny" onSubmit={this.handleFormSubmit}>
                <Form.Input
                  label="SKU"
                  name="sku"
                  placeholder="Product SKU"
                  value={this.state.product.sku}
                  onChange={this.handleFormInputChange}
                />

                <Form.Input
                  label="Product Name"
                  name="name"
                  placeholder="Product name"
                  value={this.state.product.name}
                  onChange={this.handleFormInputChange}
                />

                <Form.Select
                  label="Product Category"
                  name="product_category_id"
                  options={productCategoriesOptions}
                  text={
                    !!this.state.product.product_category_id
                      ? productCategoriesOptions.find(
                          category =>
                            category.key ===
                            _.toNumber(this.state.product.product_category_id)
                        ).text
                      : "Select category"
                  }
                  onChange={this.handleFormInputChange}
                />

                <Form.Select
                  label="Product Brand"
                  name="product_brand_id"
                  options={productBrandsOptions}
                  text={
                    this.state.product.product_brand_id
                      ? productBrandsOptions.find(
                          brand =>
                            brand.key ===
                            _.toNumber(this.state.product.product_brand_id)
                        ).text
                      : "Select brand"
                  }
                  onChange={this.handleFormInputChange}
                />

                <Form.Input
                  label="Base Price"
                  name="base_price"
                  placeholder="price"
                  type="number"
                  step="0.01"
                  value={this.state.product.base_price}
                  onChange={this.handleFormInputChange}
                />

                <Form.TextArea
                  label="Product Description"
                  name="description"
                  placeholder="Tax registration number"
                  value={this.state.product.description}
                  onChange={this.handleFormInputChange}
                />

                <Form.Field>
                  <label>Status</label>
                  <Checkbox
                    toggle
                    name="active"
                    checked={this.state.product.active}
                    onChange={this.handleFormInputChange}
                  />
                </Form.Field>

                <Form.Button content="save" />
              </Form>
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  productBrands,
  productCategories,
  products,
  user
}) => {
  return {
    productBrands: productBrands.productBrands,
    productBrandsLoading: productBrands.productBrandsLoading,

    productCategories: productCategories.productCategories,
    productCategoriesLoading: productCategories.productCategoriesLoading,

    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading
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
  )(ProductForm)
);
