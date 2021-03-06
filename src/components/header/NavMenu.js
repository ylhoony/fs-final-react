import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const NavMenu = ({ list }) => {
  return list.map((menu, index) => {
    return (
      <Menu.Item as={Link} key={index} to={menu.endpoint} name={menu.name} />
    );
  });
};

export default NavMenu;
