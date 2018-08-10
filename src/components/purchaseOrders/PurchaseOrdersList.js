import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Header, Segment, Table } from "semantic-ui-react";
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
      match
    } = this.props;

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

            <Segment>
              hello
              
              
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ currencies, paymentTerms, purchaseOrders, suppliers, user }) => {
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
