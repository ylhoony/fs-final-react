import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";
import Loading from "../../components/Loading";
import PaymentTermsList from "../../components/paymentTerms/PaymentTermsList";
import PaymentTermNew from "../../components/paymentTerms/PaymentTermNew";

class PaymentTerms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      payment_term: {
        account_id: props.currentAccount.id,
        payment_option_id: "",
        name: "",
        days: "",
        trade_credit_rate: "",
        trade_credit_days: "",
        active: true
      }
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getPaymentTerms(params);
    }
  }

  openModal = () => {
    this.setState({
      ...this.state,
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false
    });
  };

  handleFormInput = (e, { value }) => {
    const key =
      e.target.name || e.target.getAttribute("name") || e.target.dataset.name;

    this.setState({
      payment_term: Object.assign({}, this.state.payment_term, { [key]: value })
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const params = {
      current_account_id: this.props.currentAccount.id
    };
    await this.props.actions.createPaymentTerm(this.state, params);
    this.closeModal();
    await this.props.actions.getPaymentTerms(params);
    this.props.history.push("/payment-terms");
  };

  handleUpdate = e => {
    console.log("handleUpdate: ", e.target);
  };

  render() {
    const {
      currentAccountLoading,
      paymentTerms,
      paymentTermsLoading
    } = this.props;

    if (currentAccountLoading || paymentTermsLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay breadcrumbList={["Setting", "Payment Terms"]} />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h2"
                content="Payment Terms"
                subheader="Manage your account settings and set email preferences"
              />

              <Button
                // floated={this.props.floated}
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={this.openModal}
              >
                <Icon name="plus" /> Add Payment Term
              </Button>
            </Segment>

            <Segment className="border-top-remove">
              <PaymentTermsList openModal={this.openModal} />
            </Segment>
          </Segment.Group>

          <PaymentTermNew
            showModal={this.state.showModal}
            account_id={this.state.payment_term.account_id}
            payment_option_id={this.state.payment_term.payment_option_id}
            name={this.state.payment_term.name}
            days={this.state.payment_term.days}
            trade_credit_rate={this.state.payment_term.trade_credit_rate}
            trade_credit_days={this.state.payment_term.trade_credit_days}
            active={this.state.payment_term.active}
            openModal={this.openModal}
            closeModal={this.closeModal}
            handleFormInput={this.handleFormInput}
            handleFormSubmit={this.handleFormSubmit}
          />
        </main>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ paymentTerms, user }) {
  return {
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    paymentTerms: paymentTerms.paymentTerms,
    paymentTermsLoading: paymentTerms.paymentTermsLoading,
    paymentTermsError: paymentTerms.paymentTermsError
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
  )(PaymentTerms)
);
