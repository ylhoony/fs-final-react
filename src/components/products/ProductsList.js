import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import {
  Button,
  Divider,
  Form,
  Header,
  Icon,
  Segment,
  Table
} from "semantic-ui-react";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../BreadcrumbDisplay";
import Loading from "../Loading";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: []
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getProducts(params);
    }
  }

  handleTableCellClick = e => {
    const productId = e.target.parentNode.dataset.id;
    this.props.history.push(`/products/${productId}`);
  };

  render() {
    const { currentAccountLoading, products, productsLoading } = this.props;

    let productsRows;
    if (!products.length) {
      productsRows = (
        <Table.Row>
          <Table.Cell colSpan="5">Create new product</Table.Cell>
        </Table.Row>
      );
    } else {
      productsRows = products.map(product => {
        return (
          <Table.Row key={product.id} data-id={product.id}>
            <Table.Cell onClick={this.handleTableCellClick}>
              {product.sku}
            </Table.Cell>
            <Table.Cell onClick={this.handleTableCellClick}>
              {product.name}
            </Table.Cell>
            <Table.Cell onClick={this.handleTableCellClick}>
              {product.product_category && product.product_category.name}
            </Table.Cell>
            <Table.Cell onClick={this.handleTableCellClick}>
              {product.product_brand && product.product_brand.name}
            </Table.Cell>
            <Table.Cell onClick={this.handleTableCellClick}>
              {_.toNumber(product.base_price).toFixed(2)}
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    if (currentAccountLoading || productsLoading) {
      return <Loading />;
    }

    console.log(this.props.products);
    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[
                { name: "Product", url: "/product" },
                { name: "Products", url: "/products" }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h3"
                content="Products"
                subheader="Manage your products"
              />

              <Button
                as={Link}
                basic
                color="teal"
                compact
                icon
                labelPosition="left"
                size="tiny"
                to="/products/new"
              >
                <Icon name="plus" /> Add Product
              </Button>
            </Segment>

            <Segment>
              <Segment>
                <Form size="tiny">
                  <header className="flex flex-between flex-middle">
                    <Header as="h4" content="Filter" />
                    <Button
                      basic
                      color="blue"
                      compact
                      icon
                      labelPosition="left"
                      size="tiny"
                    >
                      <Icon name="search" /> Search
                    </Button>
                  </header>
                  <Divider />

                  <Form.Group widths="equal">
                    <Form.Input
                      inline
                      name="sku"
                      label="SKU"
                      placeholder="SKU"
                      // width={4}
                    />
                    <Form.Input
                      inline
                      name="name"
                      label="Product name"
                      placeholder="product name"
                      // width={4}
                    />
                    <Form.Input
                      inline
                      name="sku"
                      label="sku"
                      placeholder="sku"
                      // width={4}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Segment>

            <Segment>
              <Table
                celled
                selectable
                color="grey"
                size="small"
                textAlign="center"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>SKU</Table.HeaderCell>
                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Brand</Table.HeaderCell>
                    <Table.HeaderCell>Base Price</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>{productsRows}</Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="5">
                      <p> table footer</p>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ products, user }) => {
  return {
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    products: products.products,
    productsLoading: products.productsLoading
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
  )(ProductsList)
);
