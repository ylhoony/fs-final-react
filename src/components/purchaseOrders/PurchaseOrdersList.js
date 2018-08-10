import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import moment from "moment";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../BreadcrumbDisplay";
import Loading from "../Loading";

class PurchaseOrdersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchase_order: {
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
        order_date: moment().format("YYYY-MM-DD 12:00:00")
      }
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      // this.props.actions.getSuppliers(params);
      // this.props.actions.getPaymentTerms(params);
      // this.props.actions.getWarehouses(params);
      this.props.actions.getPurchaseOrders(params);
    }
  }

  render() {
    const {
      currentAccountLoading,
      // currenciesLoading,
      // suppliersLoading,
      // paymentTermsLoading,
      purchaseOrdersLoading,
      purchaseOrders,
      match
    } = this.props;

    let poRows;
    if (!purchaseOrders.length) {
      poRows = (
        <Table.Row>
          <Table.Cell colSpan="4">Create new purchase order</Table.Cell>
        </Table.Row>
      );
    } else {
      poRows = purchaseOrders.map(po => {
        return (
          <Table.Row key={po.id} data-id={po.id}>
            {/* <Table.Cell onClick={this.handleClickTableCell}>
              {po.name}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {po.currency.alpha}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {po.warehouse ? po.warehouse.name : ""}
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableCell}>
              {po.payment_term.name}
            </Table.Cell> */}

            <Table.Cell>{po.id}</Table.Cell>
            <Table.Cell>{po.order_reference}</Table.Cell>
            <Table.Cell>{po.supplier.name}</Table.Cell>
            <Table.Cell>{po.shipping_address.name}</Table.Cell>
            <Table.Cell>{po.warehouse.name}</Table.Cell>
            <Table.Cell>Amount</Table.Cell>
            <Table.Cell>Status</Table.Cell>
          </Table.Row>
        );
      });
    }

    if (
      currentAccountLoading ||
      // currenciesLoading ||
      // suppliersLoading ||
      // paymentTermsLoading ||
      purchaseOrdersLoading
    ) {
      return <Loading />;
    }

    console.log(this.props);

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[
                { name: "Supply", url: "/supply" },
                { name: "Purchases", url: `${match.url}` }
              ]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h3"
                content="Purchase Order"
                subheader="Manage Purchase Orders"
              />

              <Button
                as={Link}
                basic
                color="teal"
                compact
                icon
                labelPosition="left"
                size="tiny"
                to="/purchases/new"
              >
                <Icon name="plus" /> Purchase
              </Button>
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
                    <Table.HeaderCell>Order Number</Table.HeaderCell>
                    <Table.HeaderCell>Order Reference</Table.HeaderCell>
                    <Table.HeaderCell>Supplier</Table.HeaderCell>
                    <Table.HeaderCell>Ship From</Table.HeaderCell>
                    <Table.HeaderCell>Ship To</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>{poRows}</Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="7">
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

const mapStateToProps = ({
  currencies,
  paymentTerms,
  purchaseOrders,
  suppliers,
  user
}) => {
  return {
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    currencies: currencies.currencies,
    currenciesLoading: currencies.currenciesLoading,

    purchaseOrders: purchaseOrders.purchaseOrders,
    purchaseOrdersLoading: purchaseOrders.purchaseOrdersLoading,

    suppliers: suppliers.suppliers,
    suppliersLoading: suppliers.suppliersLoading,

    paymentTerms: paymentTerms.paymentTerms,
    paymentTermsLoading: paymentTerms.paymentTermsLoading
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
  )(PurchaseOrdersList)
);
