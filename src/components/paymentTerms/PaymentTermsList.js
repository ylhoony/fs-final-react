import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

// import PaymentTermShow from "./PaymentTermShow";
import PaymentTermNew from "./PaymentTermNew";
import axios from "../../../node_modules/axios";

class PaymentTermsList extends Component {
  handleClickTableRow = async e => {
    console.log("hello!!!");

    const paymentTermId = e.target.parentElement.dataset.id;
    const params = {
      current_account_id: this.props.currentAccount.id
    }

    const res = await axios.get(`/api/v1/payment_terms/${paymentTermId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })

    console.log(res.data);

  }

  render() {
    const { paymentTerms } = this.props;

    let paymentTermRows;
    if (!!paymentTerms.length) {
      paymentTermRows = paymentTerms.map(term => {
        // return (
        //   <PaymentTermShow
        //     active={term.active}
        //     days={term.days}
        //     id={term.id}
        //     key={term.id}
        //     name={term.name}
        //     paymentOption={term.payment_option}
        //     trade_credit_days={term.trade_credit_days}
        //     trade_credit_rate={term.trade_credit_rate}
        //     handleClickTableRow={e => this.handleClickTableRow(e)}
        //     openModal={this.props.openModal}
        //   />
        // );
        return (
          <Table.Row data-id={term.id} key={term.id} >
            <Table.Cell onClick={this.props.openModal} >
              { term.name }
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableRow} >
              { term.days }
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableRow} >
              { term.payment_option.name }
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableRow} >
              { term.trade_credit_rate || 0 }
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableRow}>
              { term.trade_credit_days || 0  }
            </Table.Cell>
            <Table.Cell onClick={this.handleClickTableRow}>
              { term.active ? 'Active' : 'Inactive' }
            </Table.Cell>
          </Table.Row>
        )


      });
    } else {
      paymentTermRows = 
        <Table.Row>
          <Table.HeaderCell colSpan="7">Please add payment terms.</Table.HeaderCell>
        </Table.Row>;
    }

    return (
      <React.Fragment>
        <Table celled selectable color="grey" size="small" textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Days/Date</Table.HeaderCell>
              <Table.HeaderCell>Payment Option</Table.HeaderCell>
              <Table.HeaderCell>Trade Credit Rate</Table.HeaderCell>
              <Table.HeaderCell>Trade Credit Days</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{paymentTermRows}</Table.Body>
          
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <PaymentTermNew floated="left" />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ paymentTerms, user }) => {
  return {
    paymentTerms: paymentTerms.paymentTerms,
    currentAccount: user.currentAccount,
  };
};

export default withRouter(connect(mapStateToProps)(PaymentTermsList));
