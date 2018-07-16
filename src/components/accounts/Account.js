import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const Account = ({ id, name }) => {
  return (
    <Table.Row>
      <Table.Cell><Link to={`/accounts/${id}`}>{name}</Link></Table.Cell>
      <Table.Cell>No Action</Table.Cell>
      <Table.Cell>None</Table.Cell>
    </Table.Row>
  )}

export default Account;