import React from "react";
import _ from "lodash";
import { Button, Form, Table } from "semantic-ui-react";

const PurchaseOrderFormLine = ({
  poLines,
  products,
  productOptions,
  handleOrderLineChange,
  handleRemoveOrderLine
}) => {
  if (!poLines.length) {
    return (
      <Table.Row>
        <Table.Cell colSpan={6} content="there are no order lines" />
      </Table.Row>
    );
  } else {
    return poLines.map((orderLine, index) => {
      if (!orderLine._destroy) {
        return (
          <Table.Row key={index}>
            <Table.Cell>
              <Form.Dropdown
                fluid
                search
                selection
                name="product_id"
                options={productOptions}
                text={
                  !!orderLine.product_id
                    ? productOptions.find(
                        product =>
                          _.toNumber(product.key) ===
                          _.toNumber(orderLine.product_id)
                      ).text
                    : "Select Product"
                }
                placeholder="Select Product"
                onChange={e => handleOrderLineChange(e, index)}
              />
            </Table.Cell>
            <Table.Cell>
              {!!orderLine.product_id
                ? products.find(
                    product =>
                      _.toNumber(product.id) ===
                      _.toNumber(orderLine.product_id)
                  ).name
                : ""}
            </Table.Cell>
            <Table.Cell>
              <Form.TextArea
                name="comment"
                value={orderLine.comment}
                onChange={e => handleOrderLineChange(e, index)}
              />
            </Table.Cell>
            <Table.Cell>
              <Form.Input
                fluid
                min="1"
                name="quantity"
                placeholder="qty"
                step="1"
                type="number"
                value={orderLine.quantity}
                onChange={e => handleOrderLineChange(e, index)}
              />
            </Table.Cell>
            <Table.Cell>
              <Form.Input
                fluid
                min="0"
                name="unit_price"
                placeholder="price"
                type="number"
                step="0.01"
                value={orderLine.unit_price}
                onChange={e => handleOrderLineChange(e, index)}
              />
            </Table.Cell>
            <Table.Cell>
              {(
                Math.round(
                  (Math.round(
                    orderLine.quantity * orderLine.unit_price * 1000
                  ) /
                    1000) *
                    100
                ) / 100
              ).toFixed(2) || 0}
            </Table.Cell>
            <Table.Cell>
              <Button
                basic
                color="red"
                compact
                icon="minus"
                size="mini"
                onClick={e => handleRemoveOrderLine(e, index)}
              />
            </Table.Cell>
          </Table.Row>
        );
      }
    });
  }
};

export default PurchaseOrderFormLine;
