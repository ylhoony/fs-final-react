import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Form, Icon, Modal, Select } from "semantic-ui-react";

import { actions } from "../../actions/index";

class PaymentTermEdit extends Component {
  render() {
    const { paymentOptions, value } = this.props;

    const paymentOptionsList = paymentOptions.map(option => {
      return {
        "data-name": "payment_option_id",
        key: option.id,
        text: option.name,
        value: option.id
      };
    });

    return (
      <React.Fragment>
        <Modal
          closeIcon
          closeOnDimmerClick
          onClose={this.closeModal}
          open={this.state.showModal}
          trigger={
            <Button
              floated={this.props.floated}
              icon
              labelPosition="left"
              primary
              size="small"
              onClick={this.openModal}
            >
              <Icon name="plus" /> Add Payment Term
            </Button>
          }
        >
          <Modal.Header>Edit Payment Term</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Form onSubmit={e => this.handleFormSubmit(e)}>
                <Form.Input
                  fluid
                  label="Name"
                  name="name"
                  placeholder="Payment Term Name"
                  onChange={this.handleFormInput}
                />
                <Form.Input
                  fluid
                  label="Days/Date"
                  name="days"
                  placeholder="Days or Date"
                  onChange={this.handleFormInput}
                />
                <Form.Field
                  control={Select}
                  label="Payment Option"
                  name="payment_option_id"
                  options={paymentOptionsList}
                  placeholder="Select payment option"
                  // text={this.props.payment_option && this.state.payment_option.name}
                  onChange={this.handleFormInput}
                />
                <Form.Input
                  label="Trade Credit Rate (%)"
                  name="trade_credit_rate"
                  placeholder="Trade Credit Rate"
                  onChange={this.handleFormInput}
                />
                <Form.Input
                  label="Trade Credit Days"
                  name="trade_credit_days"
                  placeholder="Trade Credit Rate"
                  onChange={this.handleFormInput}
                  
                />
                <Button color="teal" floated="right" type="submit">
                  Save
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ paymentOptions, user }) {
  return {
    currentAccount: user.currentAccount,
    paymentOptions: paymentOptions.paymentOptions
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
  )(PaymentTermEdit)
);
