import React from "react";
import { Table } from "semantic-ui-react"

const PurchaseOrdersListRows = ({ purchaseOrders }) => {
  if (!purchaseOrders.length) {
    return (
      <Table.Row>
        <Table.Cell colSpan="4">Create new purchase order</Table.Cell>
      </Table.Row>
    );
  } else {
    return purchaseOrders.map(po => {
      return (
        <Table.Row key={po.id} data-id={po.id}>
          <Table.Cell onClick={this.handleTableCellClick}>{po.id}</Table.Cell>
          <Table.Cell onClick={this.handleTableCellClick}>
            {po.order_reference}
          </Table.Cell>
          <Table.Cell onClick={this.handleTableCellClick}>
            {po.supplier.name}
          </Table.Cell>
          <Table.Cell onClick={this.handleTableCellClick}>
            {po.shipping_address.name}
          </Table.Cell>
          <Table.Cell onClick={this.handleTableCellClick}>
            {po.warehouse.name}
          </Table.Cell>
          <Table.Cell onClick={this.handleTableCellClick}>Amount</Table.Cell>
          <Table.Cell>Status</Table.Cell>
        </Table.Row>
      );
    });
  }
};

export default PurchaseOrdersListRows;
