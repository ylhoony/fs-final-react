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
import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";
import Loading from "../../components/Loading";

class ProductCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySidebar: false,
      product_category: {
        id: null,
        name: "",
        active: true,
        likecount: 0
      }
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getProductCategories(params);
    }
  }

  clearState = () => {
    this.setState({
      displaySidebar: false,
      product_category: {
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
      value = this.state.product_category.active ? false : true;
    } else {
      value = e.target.value;
    }

    this.setState({
      ...this.state,
      product_category: {
        ...this.state.product_category,
        [key]: value
      }
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const params = {
      current_account_id: this.props.currentAccount.id
    };

    if (!!this.state.product_category.id) {
      await this.props.actions.updateProductCategory(
        this.state.product_category.id,
        this.state,
        params
      );
    } else {
      await this.props.actions.createProductCategory(this.state, params);
    }
    this.handleSidebarHide();
  };

  handleTableCellClick = e => {
    const categoryId = e.target.parentNode.dataset.id;
    const selectedCategory = this.props.productCategories.find(
      category => category.id === parseInt(categoryId, 10)
    );

    this.setState(
      {
        ...this.state,
        product_category: selectedCategory
      },
      () => this.handleSidebarShow()
    );
  };

  handleDelete = async e => {
    e.preventDefault();
    const params = {
      current_account_id: this.props.currentAccount.id
    };
    const categoryId = this.state.product_category.id;
    await this.props.actions.deleteProductCategory(categoryId, params);
    this.handleSidebarHide();
  };

  increaseLikeCount = async e => {
    const categoryId = e.target.closest("tr").dataset.id;
    const params = {
      current_account_id: this.props.currentAccount.id
    };
    const data = this.props.productCategories.find(
      category => category.id === parseInt(categoryId, 10)
    );
    data.likecount++;
    await this.props.actions.updateProductCategory(categoryId, data, params);
  };

  decreaseLikeCount = async e => {
    const categoryId = e.target.closest("tr").dataset.id;
    const params = {
      current_account_id: this.props.currentAccount.id
    };
    const data = this.props.productCategories.find(
      category => category.id === parseInt(categoryId, 10)
    );
    data.likecount--;
    await this.props.actions.updateProductCategory(categoryId, data, params);
  };

  render() {
    const productCategories = this.props.productCategories.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    const { currentAccountLoading, productCategoriesLoading } = this.props;

    if (currentAccountLoading || productCategoriesLoading) {
      return <Loading />;
    }

    let productCategoriesTableRows;
    if (!productCategories.length) {
      productCategoriesTableRows = (
        <Table.Row colSpan={2}>
          <Table.Cell>Create new product category</Table.Cell>
        </Table.Row>
      );
    } else {
      productCategoriesTableRows = productCategories.map(category => {
        return (
          <Table.Row key={category.id} data-id={category.id}>
            <Table.Cell onClick={this.handleTableCellClick}>
              {category.name}
            </Table.Cell>
            <Table.Cell onClick={this.handleTableCellClick}>
              {category.active ? "active" : "inactive"}
            </Table.Cell>
            <Table.Cell>{category.likecount}</Table.Cell>
            <Table.Cell>
              <Button
                basic
                color="teal"
                icon
                size="tiny"
                onClick={this.increaseLikeCount}
              >
                <Icon name="thumbs up outline" />
              </Button>
              <Button
                basic
                color="teal"
                icon
                size="tiny"
                onClick={this.decreaseLikeCount}
              >
                <Icon name="thumbs down outline" />
              </Button>
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
                    { name: "Product Categories", url: "/product-categories" }
                  ]}
                />

                <Segment className="flex flex-between flex-middle">
                  <Header
                    as="h3"
                    content="Product Categories"
                    subheader="Manage your product categories"
                  />

                  <Button
                    basic
                    color="teal"
                    icon
                    labelPosition="left"
                    size="tiny"
                    onClick={this.handleSidebarShow}
                  >
                    <Icon name="plus" /> Add Product Category
                  </Button>
                </Segment>

                <Segment>
                  <Table size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Like Count</Table.HeaderCell>
                        <Table.HeaderCell />
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>{productCategoriesTableRows}</Table.Body>
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
                <Header size="medium" content="New Product Category" />
                <Form.Input
                  label="Product CategoryName"
                  placeholder="Category name"
                  name="name"
                  value={this.state.product_category.name}
                  onChange={this.handleFormInputChagne}
                />
                <Form.Field>
                  <label>Status</label>
                  <Checkbox
                    toggle
                    name="active"
                    checked={this.state.product_category.active}
                    onChange={this.handleFormInputChagne}
                  />
                </Form.Field>

                {this.state.product_category.id && (
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

const mapStateToProps = ({ productCategories, user }) => {
  return {
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    productCategories: productCategories.productCategories,
    productCategoriesLoading: productCategories.productCategoriesLoading,
    productCategoriesError: productCategories.productCategoriesError,

    selectedProductCategory: productCategories.selectedProductCategory,
    selectedProductCategoryLoading:
      productCategories.selectedProductCategoryLoading,

    updateProductCategoryLoading:
      productCategories.updateProductCategoryLoading,
    updateProductCategoryError: productCategories.updateProductCategoryError,

    deleteProductCategoryLoading:
      productCategories.deleteProductCategoryLoading,
    deleteProductCategoryError: productCategories.deleteProductCategoryError
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
  )(ProductCategories)
);
