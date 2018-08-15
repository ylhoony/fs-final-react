import React from "react";
import { Dropdown } from "semantic-ui-react";

const AccountDropdownList = ({ accounts }) => {
  return accounts.map(account => {
    return (
      <Dropdown.Item
        data-id={account.id}
        key={account.id}
        text={account.name}
        value={account.id}
        onClick={this.handleAccountClick}
      />
    );
  });
};

export default AccountDropdownList;
