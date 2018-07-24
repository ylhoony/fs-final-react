import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal, Form, Select, Button, Table } from "semantic-ui-react";

import { actions } from '../../actions/index';

class PaymentTermShow extends Component {
  render() {
    const { 
      active, 
      days, 
      id, 
      name, 
      paymentOption,
      paymentOptions,
      trade_credit_days, 
      trade_credit_rate } = this.props;

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
        <Table.Row data-id={id}>
          <Table.Cell onClick={this.props.openModal} >
            { name }
          </Table.Cell>
          <Table.Cell onClick={this.handleClickTableRow} >
            { days }
          </Table.Cell>
          <Table.Cell onClick={this.handleClickTableRow} >
            { paymentOption.name }
          </Table.Cell>
          <Table.Cell onClick={this.handleClickTableRow} >
            { trade_credit_rate || 0 }
          </Table.Cell>
          <Table.Cell onClick={this.handleClickTableRow}>
            { trade_credit_days || 0  }
          </Table.Cell>
          <Table.Cell onClick={this.handleClickTableRow}>
            { active ? 'Active' : 'Inactive' }
          </Table.Cell>
        </Table.Row>
      </React.Fragment>

      // <React.Fragment>
      //   <Modal
      //     closeIcon
      //     closeOnDimmerClick
      //     onClose={this.props.closeModal}
      //     open={this.props.showModal}
      //     trigger={
      //       <Table.Row data-id={id}>
      //         <Table.Cell>
      //           { name }
      //         </Table.Cell>
      //         <Table.Cell>
      //           { days }
      //         </Table.Cell>
      //         <Table.Cell>
      //           { paymentOption.name }
      //         </Table.Cell>
      //         <Table.Cell>
      //           { trade_credit_rate || 0 }
      //         </Table.Cell>
      //         <Table.Cell>
      //           { trade_credit_days || 0  }
      //         </Table.Cell>
      //         <Table.Cell>
      //           { active ? 'Active' : 'Inactive' }
      //         </Table.Cell>
      //       </Table.Row>}
      //   >
      //   <Modal.Header>New Payment Term</Modal.Header>
      //   <Modal.Content image>
      //   <Modal.Description>
      //     <Form onSubmit={this.props.handleFormSubmit}>
      //       <Form.Input
      //         fluid
      //         label="Name"
      //         name="name"
      //         placeholder="Payment Term Name"
      //         onChange={this.props.handleFormInput}
      //       />
      //       <Form.Input
      //         fluid
      //         label="Days/Date"
      //         name="days"
      //         placeholder="Days or Date"
      //         onChange={this.props.handleFormInput}
      //       />
      //       <Form.Field
      //         control={Select}
      //         label="Payment Option"
      //         name="payment_option_id"
      //         options={paymentOptionsList}
      //         placeholder="Select payment option"
      //         // text={this.props.payment_option && this.state.payment_option.name}
      //         onChange={this.props.handleFormInput}
      //       />
      //       <Form.Input
      //         label="Trade Credit Rate (%)"
      //         name="trade_credit_rate"
      //         placeholder="Trade Credit Rate"
      //         onChange={this.props.handleFormInput}
      //       />
      //       <Form.Input
      //         label="Trade Credit Days"
      //         name="trade_credit_days"
      //         placeholder="Trade Credit Rate"
      //         onChange={this.props.handleFormInput}
      //       />
      //       <Button color="teal" floated="right" type="submit">
      //         Save
      //       </Button>
      //     </Form>
      //   </Modal.Description>
      //   </Modal.Content>
      //   </Modal>

      // </React.Fragment>
    );
  };
}

const mapStateToProps = ({ paymentOptions, user }) => {
  return {
    paymentOptions: paymentOptions.paymentOptions,
    currentAccount: user.currentAccount,
  };
};

const mapDispatchToProps = (dispatch) => {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentTermShow));


