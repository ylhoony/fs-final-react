import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Form, Header, Item, Segment, Table } from "semantic-ui-react";
import _ from "lodash";
import moment from "moment";

import { authToken } from "../../helpers/auth";
import { actions } from "../../actions/index";
import {
  buildSuppliersOptions,
  buildAddressesOptions,
  buildContactsOptions,
  buildWarehousesOptions,
  buildCurrenciesOptions,
  buildPaymentTermsOptions,
  buildProductOptions
} from "../../helpers/optionsBuilder";

import BreadcrumbDisplay from "../BreadcrumbDisplay";
import Loading from "../Loading";
import PurchaseOrderFormLine from "./PurchaseOrderFormLine";

class PurchaseOrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchase_order: {
        id: null,
        type: "PurchaseOrder",
        account_id: props.currentAccount.id,
        account_address_id: null,
        account_contact_id: null,
        supplier_id: null,
        billing_address_id: null,
        shipping_address_id: null,
        warehouse_id: null,
        currency_id: null,
        payment_term_id: null,
        order_reference: "",
        comment: "",
        order_date: moment().format("YYYY-MM-DD"),
        order_lines_attributes: []
      }
    };
  }

  componentDidMount() {
    const params = {
      current_account_id: this.props.currentAccount.id
    };

    if (!this.props.currentAccountLoading) {
      const {
        getSuppliers,
        getPaymentTerms,
        getWarehouses,
        getProducts
      } = this.props.actions;

      Promise.all([
        getSuppliers(params),
        getPaymentTerms(params),
        getWarehouses(params),
        getProducts(params)
      ]).then(res => {
        if (this.props.match.url === "/purchases/new") {
          return;
        } else {
          const poId = this.props.match.params.purchaseOrderId;
          this.props.actions.getPurchaseOrder(poId, params).then(res => {
            const po = res.payload;
            this.setState({
              ...this.state,
              purchase_order: {
                ...this.state.purchase_order,
                id: po.id || null,
                account_id: po.account.id || null,
                account_address_id: po.account_address.id || null,
                account_contact_id: po.account_contact.id || null,
                supplier_id: po.supplier.id || null,
                billing_address_id: po.billing_address.id || null,
                shipping_address_id: po.shipping_address.id || null,
                warehouse_id: po.warehouse.id || null,
                currency_id: po.currency.id || null,
                payment_term_id: po.payment_term.id || null,
                order_reference: po.order_reference,
                comment: !!po.comment ? po.comment : "",
                order_date: po.order_date,
                order_lines_attributes: po.order_lines || []
              }
            });
          });
        }
      });
    }
  }

  handleFormInputChange = e => {
    const key =
      e.target.name ||
      (e.target.dataset && e.target.dataset.name) ||
      (e.target.parentNode && e.target.parentNode.dataset.name) ||
      e.target.querySelector(".selected").dataset.name;

    let value;
    if (
      _.isEqual(e.target.type, "text") ||
      _.isEqual(e.target.type, "textarea")
    ) {
      value = e.target.value;
    } else {
      value =
        e.target.value ||
        (e.target.dataset && e.target.dataset.value) ||
        (e.target.parentNode && e.target.parentNode.dataset.value) ||
        e.target.querySelector(".selected").dataset.value;
    }

    if (
      key === "supplier_id" &&
      this.state.purchase_order.supplier_id !== value
    ) {
      this.setState({
        ...this.state,
        purchase_order: {
          ...this.state.purchase_order,
          [key]: value,
          billing_address_id: null,
          shipping_address_id: null
        }
      });
    } else {
      this.setState({
        ...this.state,
        purchase_order: {
          ...this.state.purchase_order,
          [key]: value
        }
      });
    }
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    const params = {
      current_account_id: this.props.currentAccount.id
    };

    if (!!this.state.purchase_order.id) {
      const poId = this.state.purchase_order.id;
      this.props.actions
        .updatePurchaseOrder(poId, this.state, params)
        .then(res => {
          this.props.history.push(`/purchases/${res.payload.id}`);
        });
      await this.props.actions.getPurchaseOrders(params);
    } else {
      this.props.actions.createPurchaseOrder(this.state, params).then(res => {
        this.props.history.push(`/purchases/${res.payload.id}`);
      });
      await this.props.actions.getPurchaseOrders(params);
    }
  };

  handleAddOrderLine = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      purchase_order: {
        ...this.state.purchase_order,
        order_lines_attributes: this.state.purchase_order.order_lines_attributes.concat(
          {
            id: null,
            order_id: null,
            product_id: "",
            comment: "",
            quantity: 1,
            unit_price: 0,
            // line_total: 0,
            _destroy: false
          }
        )
      }
    });
  };

  handleRemoveOrderLine = (e, index) => {
    e.preventDefault();
    const stateOrderLines = this.state.purchase_order.order_lines_attributes;

    if (!!stateOrderLines[index].id) {
      const newOrderLines = stateOrderLines.map((line, stateIndex) => {
        if (stateIndex !== index) return line;
        return Object.assign({}, line, { _destroy: true });
      });

      this.setState({
        ...this.state,
        purchase_order: {
          ...this.state.purchase_order,
          order_lines_attributes: newOrderLines
        }
      });
    } else {
      this.setState({
        ...this.state,
        purchase_order: {
          ...this.state.purchase_order,
          order_lines_attributes: stateOrderLines.filter(
            (line, stateIndex) => index !== stateIndex
          )
        }
      });
    }
  };

  handleOrderLineChange = (e, index) => {
    const key =
      e.target.name ||
      (e.target.parentNode.dataset && e.target.parentNode.dataset.name) ||
      (e.target.closest(".selected") &&
        e.target.closest(".selected").dataset.name);

    const value =
      e.target.value ||
      (e.target.parentNode.dataset && e.target.parentNode.dataset.value) ||
      (e.target.closest(".selected") &&
        e.target.closest(".selected").dataset.value);

    const newOrderLines = this.state.purchase_order.order_lines_attributes.map(
      (line, stateIndex) => {
        if (stateIndex !== index) return line;
        return Object.assign({}, line, { [key]: value });
      }
    );

    this.setState({
      ...this.state,
      purchase_order: {
        ...this.state.purchase_order,
        order_lines_attributes: newOrderLines
      }
    });
  };

  findItem = (list, id) => {
    return list.find(e => _.toNumber(e.id) === _.toNumber(id));
  };

  render() {
    const {
      match,
      currentAccount,
      currentAccountLoading,
      currencies,
      currenciesLoading,
      suppliers,
      suppliersLoading,
      paymentTerms,
      paymentTermsLoading,
      products,
      productsLoading,
      warehouses,
      warehousesLoading
    } = this.props;

    const accountAddressesOptions = buildAddressesOptions(
      currentAccount.addresses,
      "account_address_id"
    );

    let supplierBillingAddressesOptions;
    if (!!this.state.purchase_order.supplier_id) {
      const addresses = suppliers.find(
        supplier =>
          supplier.id === _.toNumber(this.state.purchase_order.supplier_id)
      ).addresses;
      supplierBillingAddressesOptions = buildAddressesOptions(
        addresses,
        "billing_address_id"
      );
    }

    let supplierShippingAddressesOptions;
    if (!!this.state.purchase_order.supplier_id) {
      const addresses = suppliers.find(
        supplier =>
          supplier.id === _.toNumber(this.state.purchase_order.supplier_id)
      ).addresses;
      supplierShippingAddressesOptions = buildAddressesOptions(
        addresses,
        "shipping_address_id"
      );
    }

    const accountContactsOptions = buildContactsOptions(
      currentAccount.contacts,
      "account_contact_id"
    );

    const warehousesOptions = buildWarehousesOptions(warehouses);
    const currenciesOptions = buildCurrenciesOptions(currencies);
    const paymentTermsOptions = buildPaymentTermsOptions(paymentTerms);
    const suppliersOptions = buildSuppliersOptions(suppliers);
    const productOptions = buildProductOptions(products);

    if (
      currentAccountLoading ||
      currenciesLoading ||
      suppliersLoading ||
      paymentTermsLoading ||
      productsLoading ||
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
                { name: "Supply", url: "/supply" },
                { name: "Purchases", url: "/purchases" },
                { name: "Purchases:Info", url: `${match.url}` }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h3"
                content="New Purchase"
                subheader="Create new purchase order"
              />
            </Segment>

            <Segment>
              <Form size="tiny" onSubmit={this.handleFormSubmit}>
                <Form.Group widths="equal">
                  <Form.Select
                    label="Ordering Account"
                    name="account_address_id"
                    options={accountAddressesOptions}
                    text={
                      !!this.state.purchase_order.account_address_id
                        ? accountAddressesOptions.find(
                            address =>
                              address.key ===
                              _.toNumber(
                                this.state.purchase_order.account_address_id
                              )
                          ).text
                        : "Select address"
                    }
                    onChange={this.handleFormInputChange}
                  />

                  <Form.Select
                    label="Purchase Representative"
                    name="account_contact_id"
                    options={accountContactsOptions}
                    text={
                      !!this.state.purchase_order.account_contact_id
                        ? accountContactsOptions.find(
                            contact =>
                              contact.key ===
                              _.toNumber(
                                this.state.purchase_order.account_contact_id
                              )
                          ).text
                        : "Select purchase rep"
                    }
                    onChange={this.handleFormInputChange}
                  />

                  <Form.Select
                    label="Receipt Warehouse"
                    name="warehouse_id"
                    options={warehousesOptions}
                    text={
                      !!this.state.purchase_order.warehouse_id
                        ? warehousesOptions.find(
                            warehouse =>
                              warehouse.key ===
                              _.toNumber(this.state.purchase_order.warehouse_id)
                          ).text
                        : "Select warehouse"
                    }
                    onChange={this.handleFormInputChange}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Item className="field">
                    {!!this.state.purchase_order.account_address_id && (
                      <Item.Content>
                        <Item.Header>
                          {
                            this.findItem(
                              currentAccount.addresses,
                              this.state.purchase_order.account_address_id
                            ).company_name
                          }
                        </Item.Header>
                        <Item.Description>
                          <p>
                            {
                              this.findItem(
                                currentAccount.addresses,
                                this.state.purchase_order.account_address_id
                              ).street1
                            }
                            <br />
                            {
                              this.findItem(
                                currentAccount.addresses,
                                this.state.purchase_order.account_address_id
                              ).street2
                            }
                          </p>
                        </Item.Description>
                      </Item.Content>
                    )}
                  </Item>

                  <Item className="field">
                    {!!this.state.purchase_order.account_contact_id && (
                      <Item.Content>
                        <Item.Description />
                      </Item.Content>
                    )}
                  </Item>

                  <Item className="field">
                    {!!this.state.purchase_order.warehouse_id && (
                      <Item.Content>
                        <Item.Description />
                      </Item.Content>
                    )}
                  </Item>
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Select
                    label="Supplier Account"
                    name="supplier_id"
                    options={suppliersOptions}
                    text={
                      !!this.state.purchase_order.supplier_id
                        ? suppliersOptions.find(
                            supplier =>
                              supplier.key ===
                              _.toNumber(this.state.purchase_order.supplier_id)
                          ).text
                        : "Select supplier"
                    }
                    onChange={this.handleFormInputChange}
                  />

                  <Form.Select
                    label="Supplier Billing Address"
                    name="billing_address_id"
                    options={
                      !!supplierBillingAddressesOptions
                        ? supplierBillingAddressesOptions
                        : []
                    }
                    text={
                      this.state.purchase_order.billing_address_id
                        ? supplierBillingAddressesOptions.find(
                            address =>
                              address.key ===
                              _.toNumber(
                                this.state.purchase_order.billing_address_id
                              )
                          ).text
                        : "Select address"
                    }
                    onChange={this.handleFormInputChange}
                  />

                  <Form.Select
                    label="Supplier Shipping Address"
                    name="shipping_address_id"
                    options={
                      !!supplierShippingAddressesOptions
                        ? supplierShippingAddressesOptions
                        : []
                    }
                    text={
                      this.state.purchase_order.shipping_address_id
                        ? supplierShippingAddressesOptions.find(
                            address =>
                              address.key ===
                              _.toNumber(
                                this.state.purchase_order.shipping_address_id
                              )
                          ).text
                        : "Select address"
                    }
                    onChange={this.handleFormInputChange}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Order Reference"
                    name="order_reference"
                    placeholder="Order reference"
                    value={this.state.purchase_order.order_reference}
                    onChange={this.handleFormInputChange}
                  />

                  <Form.Select
                    label="Transaction Currency"
                    name="currency_id"
                    options={currenciesOptions}
                    text={
                      !!this.state.purchase_order.currency_id
                        ? currenciesOptions.find(
                            currency =>
                              currency.key ===
                              _.toNumber(this.state.purchase_order.currency_id)
                          ).text
                        : "Select currency"
                    }
                    onChange={this.handleFormInputChange}
                  />

                  <Form.Select
                    label="Payment Terms"
                    name="payment_term_id"
                    options={paymentTermsOptions}
                    text={
                      !!this.state.purchase_order.payment_term_id
                        ? paymentTermsOptions.find(
                            term =>
                              term.key ===
                              _.toNumber(
                                this.state.purchase_order.payment_term_id
                              )
                          ).text
                        : "Select term"
                    }
                    onChange={this.handleFormInputChange}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Order Date"
                    name="order_date"
                    // placeholder="Order reference"
                    type="date"
                    value={moment(this.state.purchase_order.order_date).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={this.handleFormInputChange}
                  />
                  <Item className="field" />
                  <Item className="field" />
                </Form.Group>

                <Form.TextArea
                  label="Comment"
                  name="comment"
                  placeholder="Comment"
                  value={this.state.purchase_order.comment}
                  onChange={this.handleFormInputChange}
                />

                {/* order_lines */}

                <Table size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>SKU</Table.HeaderCell>
                      <Table.HeaderCell>Product Name</Table.HeaderCell>
                      <Table.HeaderCell>Comment</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Unit Price</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <PurchaseOrderFormLine
                      poLines={this.state.purchase_order.order_lines_attributes}
                      products={products}
                      productOptions={productOptions}
                      handleOrderLineChange={this.handleOrderLineChange}
                      handleRemoveOrderLine={this.handleRemoveOrderLine}
                    />
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.Cell colSpan={6}>
                        <Button
                          basic
                          color="teal"
                          compact
                          size="tiny"
                          onClick={this.handleAddOrderLine}
                        >
                          add order line
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Footer>
                </Table>

                <Form.Button compact content="save" />
              </Form>
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  currencies,
  paymentTerms,
  products,
  suppliers,
  user,
  warehouses
}) => {
  return {
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    currencies: currencies.currencies,
    currenciesLoading: currencies.currenciesLoading,

    suppliers: suppliers.suppliers,
    suppliersLoading: suppliers.suppliersLoading,

    paymentTerms: paymentTerms.paymentTerms,
    paymentTermsLoading: paymentTerms.paymentTermsLoading,

    products: products.products,
    productsLoading: products.productsLoading,

    warehouses: warehouses.warehouses,
    warehousesLoading: warehouses.warehousesLoading
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
  )(PurchaseOrderForm)
);
