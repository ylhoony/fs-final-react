import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Container,
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

  render() {
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
                      label="Product ame"
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
                  </Table.Row>
                </Table.Header>

                {/* <Table.Body>{customersRows}</Table.Body> */}

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="4">
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

export default ProductsList;
